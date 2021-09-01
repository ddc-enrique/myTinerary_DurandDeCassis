import React, { useState } from 'react'
import { connect } from 'react-redux';
import { PencilSquare, PlusSquare, Trash } from 'react-bootstrap-icons';

const Comments = ({userId, comments}) => {
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);


    return (
        <div
            className="comments"
        >
            <h4>Comments</h4>
            <div
                className="commentsContainer"
                style={{height: edit ? "32vh" : "20vh"}}
            >
                { comments.map( comment => {
                    let flagID = userId === comment.userId._id;
                    return (<div 
                        className="eachComment"
                        key={comment._id}
                    >
                        {(!flagID || (!remove && flagID)) &&
                        <div
                            className="userPic"
                            style={{ backgroundImage: `url(${comment.userId.profilePic})`}}
                        >
                        </div>}
                        {(!flagID || (!remove && flagID)) &&
                        <div className="commentWithoutPic">
                            <div className="nameAndEdit">
                                <p className="userName">{comment.userId.firstName + " " + comment.userId.lastName}</p>
                                {flagID &&
                                <div className="editDelete">
                                    <PencilSquare />
                                    <Trash />
                                </div>
                                }
                            </div>
                            <div 
                                className="commentText"
                                style={{backgroundColor: (!edit && flagID) ? "#4b4264bd" : "inherit"}}
                            >
                                {(!flagID || (!edit && flagID)) && 
                                <p className="commentText">
                                    {comment.commentText}
                                </p>}
                                {(edit && flagID) && 
                                <textarea
                                    name="commentText"
                                    id="commentText"
                                >
                                    {comment.commentText}
                                </textarea>}
                                {(edit && flagID) && 
                                <div 
                                    className="cancelConfirm"
                                >
                                    <button>Confirm</button>
                                    <button>Cancel</button>
                                </div>}
                            </div>
                        </div>}
                        {(remove && flagID) && 
                        <div 
                            className="removeComment"
                        >
                            <p className="removeMessage">
                                Are you sure? It cannot be reversed after confirming.
                            </p>
                            <div 
                                    className="cancelConfirm"
                                >
                                    <button>Delete</button>
                                    <button>Leave</button>
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
                >
                </textarea>
                <button
                    disabled={userId ? false : true}
                    style={{cursor:userId ? "auto" : "no-drop"}}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return{
        userId: state.users.userId,
    }
};

export default connect(mapStateToProps)(Comments);