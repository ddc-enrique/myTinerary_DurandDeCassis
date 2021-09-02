import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import itinerariesActions from '../redux/actions/itinerariesActions';

const Comments = ({itineraryId, userId, comments, addOrDeleteComment, editComment, token, profilePic, firstName, lastName}) => {
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [stagingComments, setStagingComments] = useState(comments);
    const editCommentText = useRef("");
    const commentText = useRef("");

    useEffect(() => {
        
    }, [stagingComments])

    const updateComment = async(commentId, index) => {
        let response, newCommentText;
        try {
            newCommentText = editCommentText.current.value;
            response = await editComment(commentId, token, newCommentText);
        } catch (error) {
            
        } finally {
            if(response){
                let commentsAux = stagingComments.map((comment, i) => {
                    if( i === index ) {
                        comment.commentText = newCommentText;
                        return comment;
                    };
                    return comment;
                });
                setStagingComments(commentsAux);
                setEdit(false);
            };
        };
    };
    
    const deleteComment = async(commentId) => {
        let response;
        try {
            response = await addOrDeleteComment(itineraryId, token, null, null, commentId);
        } catch (error) {
            
        } finally {
            if(response.success){
                let commentsAux = stagingComments.filter( comment => comment._id !== commentId);
                setStagingComments(commentsAux);
                setRemove(false);
            }
        };
    };

    const addComment = async() => {
        let response, newCommentText;
        try {
            newCommentText = commentText.current.value;
            response = await addOrDeleteComment(itineraryId, token, userId, newCommentText);
        } catch (error) {
            
        } finally {
            if(response.success){
                let commentToShow = {...response.response, userId:{ _id: userId, profilePic, firstName, lastName }}
                setStagingComments([...stagingComments, commentToShow]);
                commentText.current.value = null;
            }
        };
    };

    return (
        <div
            className="comments"
        >
            <h4>Comments</h4>
            <div
                className="commentsContainer"
                style={{height: edit ? "32vh" : "20vh"}}
            >
                { stagingComments.map( (comment, index) => {
                    let flagUserID = userId === comment.userId._id;
                    return (<div 
                        className="eachComment"
                        key={comment._id}
                    >
                        {(!flagUserID || (!remove && flagUserID)) &&
                        <div
                            className="userPic"
                            style={{ backgroundImage: `url(${comment.userId.profilePic})`}}
                        >
                        </div>}
                        {(!flagUserID || (!remove && flagUserID)) &&
                        <div className="commentWithoutPic">
                            <div className="nameAndEdit">
                                <p className="userName">{comment.userId.firstName + " " + comment.userId.lastName}</p>
                                {flagUserID &&
                                <div className="editDelete">
                                    <PencilSquare onClick={() => setEdit(!edit)} />
                                    <Trash onClick={() => setRemove(!remove)} />
                                </div>
                                }
                            </div>
                            <div 
                                className="commentText"
                                style={{backgroundColor: (!edit && flagUserID) ? "#4b4264bd" : "inherit"}}
                            >
                                {(!flagUserID || (!edit && flagUserID)) && 
                                <p className="commentText">
                                    {comment.commentText}
                                </p>}
                                {(edit && flagUserID) && 
                                <textarea
                                    name="commentText"
                                    id="commentText"
                                    defaultValue={comment.commentText}
                                    ref={editCommentText}
                                >
                                </textarea>}
                                {(edit && flagUserID) && 
                                <div 
                                    className="cancelConfirm"
                                >
                                    <button
                                        onClick={() => updateComment(comment._id, index)}
                                    >
                                        Confirm
                                    </button>
                                    
                                    <button
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>}
                            </div>
                        </div>}
                        {(remove && flagUserID) && 
                        <div 
                            className="removeComment"
                            // style={{display: comment._id === "talCOsa" ? "flex" : "none"}}
                        >
                            <p className="removeMessage">
                                Are you sure? It cannot be reversed after confirming.
                            </p>
                            <div 
                                    className="cancelConfirm"
                                >
                                    <button
                                        onClick={() => deleteComment(comment._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setRemove(false)}
                                    >
                                        Leave
                                    </button>
                            </div>
                        </div>}
                    </div>
                )})}
            </div>
            <div className="newComment">
                <textarea
                    type="text"
                    placeholder={userId ? "Enter a new comment" : "Please Sign In to enter a new comment"}
                    style={{cursor:userId ? "auto" : "no-drop"}}
                    disabled={userId ? false : true}
                    ref={commentText}
                >
                </textarea>
                {userId &&
                    <button
                        onClick={() => addComment()}
                    >
                        Confirm
                    </button>
                }
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    addOrDeleteComment: itinerariesActions.addOrDeleteComment,
    editComment: itinerariesActions.editComment,
};

const mapStateToProps = (state) => {
    return{
        token: state.users.token,
        userId: state.users.userId,
        firstName: state.users.firstName,
        lastName: state.users.lastName,
        profilePic: state.users.profilePic,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);