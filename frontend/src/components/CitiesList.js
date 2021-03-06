import { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from 'aos';

const CitiesList = ({cities}) => {
    useEffect(()=>{
        Aos.init({ duration: 500 });
    }, [])
    
    if (cities.length) {
        return (
            cities.map((city, index) => (
                <Link 
                    to={`/city/${city._id}`} 
                    key={city._id} 
                    style={{textDecoration: "inherit"}}
                >
                    <div
                        data-aos={index%2 === 0 ? "fade-right" : "fade-left"}
                        className="imageCity"
                        style={{ backgroundImage: `url(${require(`../assets/${city.src}.jpeg`).default})` }}
                    >
                        <div className="cityData">
                            <div className="titleCity">
                                <h5>City: {city.name}</h5>
                                <h5>Country: {city.country}</h5>
                            </div>
                            <div className="description">
                                <h6
                                    style={{textDecoration: "inherit"}}
                                >
                                    {city.description}
                                </h6>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        )
    } else {
        return(
            <div
                data-aos="zoom-out" 
                id="emptyCitiesList"
            >
                <img src={require("../assets/errorW.png").default} alt="logo MyTinerary" />
                <p> Oh NO! We are sorry, but we still don't have any city registered that name.</p>
            </div>
        )
    }
};

export default CitiesList;