import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const City = (props) => {
    const [city, setCity] = useState({});
    useEffect(()=>{
        axios
            .get(`http://localhost:4000/api/city/${props.match.params.id}`)
            .then((res)=> setCity(res.data.response))
    }, []);
    console.log(city);
    return(
        <div>
            <Header />
            {props.match.params.id}
            {city.name}
            {city.country}
            <Footer />
        </div>
    )
};

export default City