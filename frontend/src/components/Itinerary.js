import React, { useEffect, useRef, useState } from 'react';
import { Cash, Heart, HeartFill, Stopwatch } from 'react-bootstrap-icons';
import Aos from 'aos';
import { connect } from "react-redux";
import itinerariesActions from '../redux/actions/itinerariesActions';
import Comments from './Comments';
import { store } from 'react-notifications-component';
import citiesActions from '../redux/actions/citiesActions';

const Itinerary = ({itinerary, getActivities, userId, token, likeItinerary, updateCityLikes}) => {
    const [ extraContent, setExtraContent] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const [changeLike, setChangeLike] = useState(true);
    const activitiesContainer = useRef({});
    
    useEffect(() => {
        Aos.init({ duration: 500 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        if (Object.keys(activitiesContainer.current).length) {
            let scrollNumber = Math.round(activitiesContainer.current.scrollWidth/2);
            activitiesContainer.current.scrollLeft = scrollNumber;
            // activitiesContainer.current.scrollBy(scrollNumber,0);
        }
    }, [extraContent]);

    const likeThisItinerary = async (flag) => {
        let success;
        let notificationOptions = { title: "", message: "", type: ""};
        if (userId && changeLike){
            setChangeLike(false);
            try {
                success = await likeItinerary(itinerary._id, token,userId, flag);
                await updateCityLikes(token, itinerary.cityId, flag);
            } catch (error) {
                notificationOptions.title = "Sorry, we are having connection errors";
                notificationOptions.message = "Please come back later";
                notificationOptions.type = "danger";
            } finally {
                if(success) {
                    if (flag) {
                        itinerary.likes.push(userId);
                    } else { 
                        itinerary.likes.pop();
                    }
                };
                setChangeLike(success);
            }
        };
        if (!userId) {
            notificationOptions.title = "Please Sign In";
            notificationOptions.message = "If you want to put a like on an Itinerary.";
            notificationOptions.type = "warning";
        };
        if (notificationOptions.title) {
            store.addNotification({
                ...notificationOptions,
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
    };

    const showCommentActivities = async () => {
        try{
            let response = await getActivities(itinerary._id);
            setActivities(response);
            setLoading(false);
        }catch(error){
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
            setExtraContent(false);
        }
    };

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
                            {(itinerary.likes.includes(userId) ? 
                                <HeartFill
                                    width="1.5em"
                                    height="2em"
                                    style={{cursor:userId ? "pointer" : "no-drop"}}
                                    onClick={() => likeThisItinerary(false)}
                                /> 
                                : <Heart 
                                    width="1.5em"
                                    height="2em"
                                    style={{cursor:userId ? "pointer" : "no-drop"}} 
                                    onClick={() => likeThisItinerary(true)}
                                />
                            )} 
                            {itinerary.likes.length.toString()}
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
                style={{ display: extraContent ? "flex" : "none", 
                        backgroundColor: loading ? "#3a3a5a" : "inherit"}}
            >   
                {loading ? 
                <img src={require("../assets/preLoader1.gif").default} alt="Pre Loader" />
                :<>
                    <div
                        className="activities"
                    >
                        <h4>Activities</h4>
                        <div
                            ref={activitiesContainer}
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
                    <Comments itineraryId={itinerary._id} comments={itinerary.comments}/>
                </>}
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
    likeItinerary: itinerariesActions.likeItinerary,
    updateCityLikes: citiesActions.updateCityLikes,
}

const mapStateToProps = (state) => {
    return{
        token: state.users.token,
        userId: state.users.userId,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
