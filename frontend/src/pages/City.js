import React, { useEffect, useRef, useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Itinerary from "../components/Itinerary";
import MenuTH from "../components/MenuTH";
import PreLoader from "../components/PreLoader";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import ConnectionError from "./ConnectionError";

const City = ({match, cities, getCities, getItineraries, itineraries}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ flag: false, err: {} });
    const [showMap, setShowMap] = useState(false);
    const iframeMap = useRef({})
    const [showTH, setShowTH] = useState(false);
    let cityItineraries = [];
    let city = {};

    useEffect( () => {
        window.scrollTo(0, 0);

        async function getCitiesList() {
            try{
                if (!cities.length) await getCities();
            } catch(e) {
                setError({flag:true, err: e});
            }
        };
        getCitiesList();

        async function getItinerariesList() {
            try{
                if(!itineraries.length) await getItineraries();
            } catch(e) {
                setError({flag:true, err: e});
            }
        };
        getItinerariesList();
        setLoading(false);

    }, []);

    const displayMaps = (maps) => {
        iframeMap.current.src = maps;
        setShowMap(true);
    }

    if (loading) {
        return <PreLoader />
    };

    if(!cities.length) {
        return false;
    } else{
        city = cities.find(city => city._id === match.params.id);
        cityItineraries = itineraries.filter(itinerary => itinerary.cityId === match.params.id);
    };

    console.log(cityItineraries);

    if (error.flag) {
        return (
            <ConnectionError
                error={error.err}
                showButton={true}
            />
        )
    };

    return (
        <div 
            className="containerCityPage"
        >
            <Header />
            <div className="subContainerCityPage">
                <MenuTH city={city} displayMaps={displayMaps} showTH={showTH} setShowTH={setShowTH}/>
                <div
                    id="mapsTH"
                    style={{ display: (showMap && showTH) ? "block" : "none" }}
                >
                    <XCircle
                        onClick={() => setShowMap(false)}
                        width="2em"
                        height="2em"
                    />
                    <iframe
                        src=""
                        title="maps"
                        ref={iframeMap}
                    ></iframe>
                </div>
                <main
                    style={{filter: showTH ? "blur(4px)" : "blur(0px)" }}
                >
                    <div
                        className="imageHero"
                        style={{ backgroundImage: `url(${require(`../assets/${city.src}.jpeg`).default})` }}
                    >
                        <h2>{city.name}, {city.country}</h2>
                    </div>
                    <div
                        className="containerItineraries"
                    >
                        {   cityItineraries.length 
                                ?
                                cityItineraries.map( itinerary => (
                                    <Itinerary key={itinerary._id} itinerary={itinerary} />
                                ))
                                :
                                <div
                                    data-aos="zoom-out" 
                                    id="emptyItinerariesList"
                                >
                                    <img src={require("../assets/errorW.png").default} alt="logo MyTinerary" />
                                    <p> Oh NO! We are sorry, but we still don't have any itenerary registered in this city.</p>
                                </div>
                        }
                    </div>
                    <Link to="/cities">
                        <button>
                            Go back to Cities 
                            <img src={require("../assets/cities1.png").default} alt="buildings" />
                        </button>
                    </Link>
                </main>
            </div>
            <Footer />
        </div>
    )
};

const mapDispatchToProps = {
    getCities: citiesActions.getCitiesList,
    getItineraries: itinerariesActions.getItinerariesList,
};

const mapStateToProps = (state) => {
    return{
        cities: state.cities.citiesList,
        itineraries: state.itineraries.itinerariesList,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(City);