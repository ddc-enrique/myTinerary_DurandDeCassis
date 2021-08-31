import React, { useEffect, useState } from 'react';
import { Cash, Heart, HeartFill, PencilSquare, Stopwatch, Trash } from 'react-bootstrap-icons';
import Aos from 'aos';
import { connect } from "react-redux";
import itinerariesActions from '../redux/actions/itinerariesActions';

const Itinerary = ({itinerary, getActivities, userId}) => {
    const [ extraContent, setExtraContent] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        Aos.init({ duration: 500 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const showCommentActivities = async () => {
        try{
            let response = await getActivities(itinerary._id);
            setActivities(response);
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    let cash = [];
    for (let i = 1; i <= itinerary.price; i++) {
        cash.push(<Cash key={itinerary._id + "P" + i.toString() }/>)
    };
    return (
        <div 
            className="itinerary"
            data-aos="zoom-out-up"
            style={{boxShadow: (extraContent || hovered) ? "-1px 2px 5px 5px #3a3a5a"
                                            : "-1px 2px 5px 5px rgba(245, 245, 245, 0.342)"}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div 
                className="headerItinerary"
                style={{backgroundImage: `url("/assets/${itinerary.src}.jpg")`}}
            >
                <h3>{itinerary.title}</h3>
            </div>
            
            <div className="author">
                <div
                    className="authorPic"
                    style={{backgroundImage: `url("/assets/${itinerary.author.profilePic}.jpg")`}}
                >
                </div>
                <p>{itinerary.author.name}</p>
            </div>

            <div className="bodyItinerary">
                <div className="details">
                    <p>
                        Price: {(cash.map( moneyBill => moneyBill))}
                    </p>
                    <p><Stopwatch /> Duration: {itinerary.duration} {itinerary.duration === 1 ? "hour" : "hours"}</p>
                </div>
                <div className="description">
                    <p>{itinerary.description}</p>
                </div>
                <div className="social">
                    <p className="likes">
                            {(itinerary.likes.length ? <HeartFill /> : <Heart />)} {itinerary.likes.length.toString()}
                    </p>
                    <div className="hashtags">
                        {itinerary.hashtags.map((hashtag, index)=> (
                            <p className="hastag" key={itinerary._id + "H" + index.toString() }>
                                #{hashtag}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            
            <div 
                className="commentsActivities"
                style={{ display: extraContent ? "flex" : "none"}}
            >
                <div
                    className="activities"
                >
                    <h4>Activities</h4>
                    <div
                        className="activitiesContainer"
                    >
                    { activities.map(activity => (
                        <div 
                            className="activityPic"
                            key={activity._id}
                            style={{ backgroundImage: `url(${activity.src})`}}
                        >
                            <p className="title">{activity.title}</p>
                        </div>
                    ))}
                    </div>
                </div>
                <div
                    className="comments"
                >
                    <h4>Comments</h4>
                    <div
                        className="commentsContainer"
                    >
                    { itinerary.comments.map( comment => (
                        <div 
                            className="eachComment"
                            key={comment._id}
                        >
                            <div
                                className="userPic"
                                style={{ backgroundImage: `url(${comment.userId.profilePic})`}}
                            >
                            </div>
                            <div className="commentWithoutPic">
                                <div className="nameAndEdit">
                                    <p className="userName">{comment.userId.firstName + " " + comment.userId.lastName}</p>
                                    {
                                    (userId === comment.userId._id) &&
                                    <div className="editDelete">
                                        <PencilSquare />
                                        <Trash />
                                    </div>
                                    }
                                </div>
                                <div
                                    className="textComment"
                                >
                                {comment.commentText}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            <button
                className="buttonView"
                onClick={() => {setExtraContent(!extraContent); showCommentActivities()}}
            >
                View {extraContent ? " Less" : " More"} 
            </button>
        </div>
    )
};

const mapDispatchToProps = {
    getActivities: itinerariesActions.getActivities,
}

const mapStateToProps = (state) => {
    return{
        userId: state.users.userId,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
