import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import EachComment from './EachComment';
import { store } from 'react-notifications-component';


const Comments = (props) => {
    const {itineraryId, userId, comments, addOrDeleteComment, token, profilePic, firstName, lastName} = props;
    const [stagingComments, setStagingComments] = useState(comments);
    const commentText = useRef("");
    const commentsContainer = useRef({});


    useEffect(() => {
        if (Object.keys(commentsContainer.current).length) {
            // let scrollNumber = Math.round(commentsContainer.current.scrollWidth);
            commentsContainer.current.scrollTop = commentsContainer.current.scrollHeight;
            // activitiesContainer.current.scrollBy(scrollNumber,0);
        }
    }, [stagingComments]);

    const showError = () => {
        store.addNotification({
            title: "Sorry, we are having connection errors",
            message: "Please come back later",
            type: "danger",
            insert: "top",
            container: "center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: { 
                duration: 3000, 
                pauseOnHover: true, 
                showIcon: true 
            },
        });
    };

    const addComment = async() => {
        let response, newCommentText;
        try {
            newCommentText = commentText.current.value;
            response = await addOrDeleteComment(itineraryId, token, userId, newCommentText);
        } catch (error) {
            showError();
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
                ref={commentsContainer}
            >
                { stagingComments.map( (comment, index) => (
                    <EachComment
                        key={comment._id}
                        {...props}
                        comment={comment} index={index} 
                        stagingComments={stagingComments} setStagingComments={setStagingComments}
                        showError={showError}
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