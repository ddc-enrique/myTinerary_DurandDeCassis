import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import CitiesList from "../components/CitiesList";


const Cities = () => {
    const [cities, setCities] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorDB, setErrorDB] = useState(false);
    const [errorFrontBack, setErrorFrontBack] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get('http://localhost:4000/api/cities')
            .then((res) => {
                if(res.data.success){
                    setCities(res.data.response);
                } else {
                    console.log(res.data.response)
                    setErrorDB(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorFrontBack(true);
            })
            .finally(() => setLoading(false))

    }, []);
    let citiesFiltered = cities;
    const inputHandler = (e) => {
        setInputSearch(e.target.value);
        console.log(inputSearch);
    }
    const filterCities = (cityFilter) => {
        citiesFiltered = cities.filter(city => (
            city.name.toUpperCase().startsWith(
                cityFilter.toUpperCase().trim()
            )
        ));
    }
    console.log(inputSearch);
    filterCities(inputSearch);
    console.log(citiesFiltered);

    if (loading) {
        return(
            <div>
                Loading Cities Page...
            </div>
        )
    }

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
                        onChange={inputHandler}
                    />
                </div>
            </div>
            <div className="containerCitiesList">
                <CitiesList cities={citiesFiltered} />
            </div>

            <Footer />
        </div>
    )
};
export default Cities;