import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const EachComment = (props) => {
    const {comment, index, stagingComments, setStagingComments, userId, token, editComment, addOrDeleteComment, itineraryId, showError} = props;
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const editCommentText = useRef("");
    let flagUserID = userId === comment.userId._id;

    useEffect(() => {
        return () => {
            setRemove(false);
        }
    }, [])

    const updateComment = async(commentId, index) => {
        let response, newCommentText;
        try {
            newCommentText = editCommentText.current.value;
            response = await editComment(commentId, token, newCommentText);
        } catch (error) {
            showError();
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
            showError();
        } finally {
            if(response.success){
                let commentsAux = stagingComments.filter( comment => comment._id !== commentId);
                setStagingComments(commentsAux);
                setRemove(false);
            }
        };
    };
    
    return (
        <div 
            className="eachComment"
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
                    // style={{backgroundColor: (!edit && flagUserID) ? "#4b4264bd" : "inherit"}}
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
    )
};

const mapDispatchToProps = {
    editComment: itinerariesActions.editComment
};

export default connect(null, mapDispatchToProps)(EachComment);
