import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import { Search } from "react-bootstrap-icons";
import axios from "axios";
// import { Link } from "react-router-dom";
import CitiesList from "../components/CitiesList";


const Cities = () => {
    const [cities, setCities] = useState([]);
    const inputSearch = useRef("");
    const [update, setUpdate] = useState(0);

    // const renderCitiesList = (arrayCities) => arrayCities.map(city => (
    //     <div
    //         className="imageCity"
    //         key={city.id}
    //         style={{ backgroundImage: `url(${require(`../assets/${city.src}_carousel.jpeg`).default})` }}
    //     >
    //         <div className="cityData">
    //             <h5>City: {city.name}</h5>
    //             <h5>Country: {city.country}</h5>
    //         </div>
    //     </div>
    // ))

    useEffect(() => {
        window.scrollTo(0, 0);

        axios
            .get('http://localhost:4000/api/cities')
            .then((res) => setCities(res.data.response));
    }, []);

    let citiesFiltered = cities;

    const inputHandler = () => {
        console.log(inputSearch.current.value);
        filterCities(inputSearch.current.value);
    }

    const filterCities = (cityFilter) => {
        citiesFiltered = cities.filter(city => (
            city.name.toUpperCase().startsWith(
                cityFilter.toUpperCase().trim()
            )
        ));
        setUpdate(update + 1);
        // setUpdatCmp(true);
        // console.log(update)
        console.log(citiesFiltered);
    }

    useEffect(() => {
        console.log(update);
    })

    return (
        <div className="containerCities">
            <Header />
            <div className="imageHero">
                <h1>Cities</h1>
                <div>
                    <input
                        type="text"
                        name="cities"
                        placeholder="Are you looking for a specific City ?"
                        ref={inputSearch}
                        onChange={inputHandler}
                    />
                    {/* <button >
                        Search <Search />
                    </button> */}
                </div>
            </div>
            <div className="containerCitiesList">
                <CitiesList cities={citiesFiltered} update={update}/>
                {/* {citiesFiltered.map(city => (
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
                ))} */}
            </div>

            <Footer />
        </div>
    )
};
export default Cities;