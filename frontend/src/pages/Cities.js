import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CitiesList from "../components/CitiesList";
import PreLoader from "../components/PreLoader";
import ConnectionError from "./ConnectionError";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";



const Cities = ({getCities, cities, citiesFiltered, filterCities}) => {
    const [loading, setLoading] = useState(true);
    const [errorDB, setErrorDB] = useState("");
    const [errorFrontBack, setErrorFrontBack] = useState("");
    useEffect( async() => {
        window.scrollTo(0, 0);
        if (!cities.length) await getCities();
        setLoading(false);
    }, []);

    const inputHandler = (e) => {

        filterCities(e.target.value.toUpperCase().trim());
    }



    if (loading) {
        return <PreLoader />
    }

    // if (errorDB || errorFrontBack) {
    //     return(
    //         <ConnectionError 
    //             error={errorDB ? errorDB : errorFrontBack } 
    //             showButton={true}    
    //         />
    //     )
    // };

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

const mapDispatchToProps = {
    getCities: citiesActions.getCitiesList,
    filterCities: citiesActions.filterCitiesList,
};

const mapStateToProps = (state) => {
    return{
        cities: state.cities.citiesList,
        citiesFiltered: state.cities.citiesFiltered,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);