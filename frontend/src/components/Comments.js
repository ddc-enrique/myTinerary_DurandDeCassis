import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import EachComment from './EachComment';

const Comments = (props) => {
    const {itineraryId, userId, comments, addOrDeleteComment, token, profilePic, firstName, lastName} = props;
    const [stagingComments, setStagingComments] = useState(comments);
    const commentText = useRef("");

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
            >
                { stagingComments.map( (comment, index) => (
                    <EachComment
                        key={comment._id}
                        {...props}
                        comment={comment} index={index} 
                        stagingComments={stagingComments} setStagingComments={setStagingComments}
                    />
                ))}
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