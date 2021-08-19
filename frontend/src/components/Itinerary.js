import React, { useState } from 'react';
import { Cash, Heart, HeartFill, Stopwatch } from 'react-bootstrap-icons';

const Itinerary = ({itinerary}) => {
    const [ extraContent, setExtraContent] = useState(false);
    let cash = [];
    for (let i = 1; i <= itinerary.price; i++) {
        cash.push(<Cash key={itinerary._id + "P" + i.toString() }/>)
    }
    console.log(cash);
    return (
        <div className="itinerary">
            <div 
                className="imageItinerary"
                style={{backgroundImage: `url("/assets/${itinerary.src}.jpg")`}}
            >
                <h3>{itinerary.title}</h3>
            </div>
            
            <div className="bodyItinerary">
                <div className="author">
                    <div
                        className="authorPic"
                        style={{backgroundImage: `url("/assets/${itinerary.author.profilePic}.jpg")`}}
                    >
                    </div>
                    <p>{itinerary.author.name}</p>
                </div>
                <div className="description">
                    <p>{itinerary.description}</p>
                    <p>
                        Price: {(cash.map( moneyBill => moneyBill))}
                    </p>
                    <p><Stopwatch /> Duration: {itinerary.duration} {itinerary.duration === 1 ? "hour" : "hours"}</p>
                </div>
                <div className="social">
                    <p className="likes">
                        {(itinerary.likes ? <HeartFill /> : <Heart />)} {itinerary.likes.toString()}
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
                style={{display: extraContent ? "flex" : "none"}}
            >
                <p>Page Under Construction</p>
            </div>

            <button
                className="buttonView"
                onClick={() => setExtraContent(!extraContent)}
            >
                View{extraContent ? " Less" : " More"}
            </button>
        </div>
    )
}

export default Itinerary
