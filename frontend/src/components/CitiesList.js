import React, { useEffect } from "react";


const CitiesList = ({cities, update}) => {
    // useEffect(() => {
        
    // },[update])
    
    return (
        cities.map(city => (
            // <Link to='{/}'>
            <div
                className="imageCity"
                key={city.id}
                style={{ backgroundImage: `url(${require(`../assets/${city.src}_carousel.jpeg`).default})` }}
            >
                <div className="cityData">
                    <h5>City: {city.name}</h5>
                    <h5>Country: {city.country}</h5>
                </div>
            </div>
            // </Link>
        ))
    )
};

export default CitiesList;