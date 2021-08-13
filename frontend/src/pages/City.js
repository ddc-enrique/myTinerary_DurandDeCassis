import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const City = (props) => {
    const [city, setCity] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorDB, setErrorDB] = useState(false);
    const [errorFrontBack, setErrorFrontBack] = useState(false);

    useEffect(()=>{
        axios
            .get(`http://localhost:4000/api/city/${props.match.params.id}`)
            .then((res) => {
                if(res.data.success){
                    setCity(res.data.response);
                    console.log(res.data.response);
                } else {
                    console.log(res.data.response);
                    setErrorDB(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorFrontBack(true);
            })
            .finally(() => setLoading(false))
    }, []);

    if (loading) {
        return <p>Loading please wait...</p>
    }
    return(
        <div className="containerCityPage">
            <Header />
            <div 
                className="imageHero"
                style={{ backgroundImage: `url(${require(`../assets/${city.src}.jpeg`).default})` }}
            >
            </div>
            <p>Page of {city.name} it is under construction</p>
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