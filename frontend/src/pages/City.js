import React, { useEffect, useRef, useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Itinerary from "../components/Itinerary";
import PreLoader from "../components/PreLoader";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import ConnectionError from "./ConnectionError";

const City = ({match, history, cities, getItineraries, itineraries}) => {
    const [city, setCity] = useState({});
    const [cityItineraries, setCityItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ flag: false, err: {} });
    const [showMap, setShowMap] = useState(false);
    const iframeMap = useRef({})
    const [showTH, setShowTH] = useState(false);
    const menuTransportHub = useRef({});
    useEffect(() => {
        // let newObject = cities.find(city => city._id === match.params.id);
        // setCity(newObject);
        // setLoading(false);
        let filterItineraries = itineraries.filter(itinerary => itinerary.cityId === match.params.id);
        setCityItineraries(filterItineraries);
        console.log(filterItineraries);
    }, [itineraries])

    useEffect( () => {
        window.scrollTo(0, 0);
        if(!cities.length) history.push("/cities");

        async function getItinerariesList() {
            try{
                await getItineraries();
            } catch(e) {
                setError({flag:true, err: e});
            }
        };
        if(!itineraries.length) getItinerariesList();

        let newObject = cities.find(city => city._id === match.params.id);
        setCity(newObject);
        
        console.log(match.params.id);
        let filterItineraries = itineraries.filter(itinerary => itinerary.cityId === match.params.id);
        setCityItineraries(filterItineraries);
        console.log(filterItineraries);

        if(!cityItineraries.length) setLoading(false);

        window.addEventListener("scroll", () => changeHeight());
        return () => {
            console.log("me desmonte");
            window.removeEventListener("scroll", () => changeHeight());
        }
    }, []);

        
    const changeHeight = () => {
        let menu = menuTransportHub.current;
        // if (menu){
            // if ((Object.entries(menu).length === 0) && window.pageYOffset<(window.innerHeight*0.17)) {
        if (window.pageYOffset<(window.innerHeight*0.17)) {                
            menu.style.height = `${window.innerHeight-(window.innerHeight*0.17-window.pageYOffset)}px`;
            menu.style.bottom = "0px";
        }
        // }
    }

    const showList = (e) => {
        console.log(e.target.className === "transportHub");
        if (e.target.className === "transportHub") {
            let list = e.target.children[0];
            list.style.display = "block";
            if (list.firstChild.children.length === 0) {
                list.innerHTML = "<p>This city doesn't have a Transport Hub of this type</p>";
                list.style.textDecoration = "none";
                list.style.cursor = "auto";
            }
        }
        changeHeight();
    }

    const unShowList = (e) => {
        console.log(e.target.className === "trasnportHub");
        if (e.target.className === "transportHub") {
            e.target.children[0].style.display= "none";
        }
    }

    const displayMaps = (maps) => {
        iframeMap.current.src = maps;
        setShowMap(true);
    }

    if (loading) {
        return <PreLoader />
    };

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
            onScroll={(e) => changeHeight(e)}    
        >
            <Header />
            <div className="subContainerCityPage">
                <aside className="tranportHubs">
                    <div
                        className="containerTranportHubs"
                        style={{ display: showTH ? "flex" : "none", }}
                        ref={menuTransportHub}
                    >
                        {
                            Object.keys(city.transportHubs).map((transportHub, index) => (
                                <div
                                    style={{ backgroundImage: `url(${require(`../assets/${transportHub}.png`).default})` }}
                                    alt={`${transportHub} logo`}
                                    onClick={(event) => showList(event)}
                                    tabIndex={1}
                                    onBlur={(event) => unShowList(event)}
                                    className="transportHub"
                                    key={index}
                                >
                                    <div>
                                        <ul>
                                        {city.transportHubs[transportHub].map(eachHub => {
                                            let { _id, name, maps } = eachHub;
                                            return (
                                                <li
                                                    className="maps"
                                                    key={_id}
                                                    onClick={() => displayMaps(maps)}
                                                >
                                                    {name}
                                                </li>
                                            )
                                        })}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div
                        className="displayTransportHubs"
                        onClick={() => setShowTH(!showTH)}
                        style={{ left: showTH ? "150px" : "0px" }}
                    >
                        <p>{showTH ? "<" : ">"}</p>
                    </div>
                </aside>
                <div
                    id="mapsTH"
                    style={{ display: showMap ? "block" : "none" }}
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