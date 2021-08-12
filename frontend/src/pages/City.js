import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const City = (props) => {
    const [city, setCity] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        axios
            .get(`http://localhost:4000/api/city/${props.match.params.id}`)
            .then((res)=> {
                setCity(res.data.response);
                setLoading(true);
            })
        }, []);
    console.log(city.src);
    if (!loading) {
        return <p>Page under construction</p>
    } else {
        console.log(require(`../assets/${city.src}.jpeg`));
    }
    return(
        <div className="containerCityPage">
            <Header />
            <div 
                className="imageHero"
                style={{ backgroundImage: `url(${require(`../assets/${city.src}.jpeg`).default})` }}
            >

            </div>
            <p>Page under construction</p>
            {/* {props.match.params.id}
            {city.name}
            {city.country} */}
            <Link to="/cities">
            <button>Go back to Cities</button>
            </Link>
            <Footer />
        </div>
    )
};

export default City