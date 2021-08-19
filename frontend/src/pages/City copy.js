import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PreLoader from "../components/PreLoader";
import ConnectionError from "./ConnectionError";

const City = (props) => {
    const [city, setCity] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorDB, setErrorDB] = useState("");
    const [errorFrontBack, setErrorFrontBack] = useState("");
    const [showMap, setShowMap] = useState(false);
    const iframeMap = useRef(null)
    const [showTH, setShowTH] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/city/${props.match.params.id}`)
            .then((res) => {
                if (res.data.success) {
                    setCity(res.data.response);
                    console.log(res.data.response);
                } else {
                    setErrorDB((typeof (res.data.response) === "string"
                        ? res.data.response
                        : res.data.response.message));
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorFrontBack(err.message);
            })
            .finally(() => setLoading(false))
    }, []);

    const showList = (e) => {
        // console.log(e.target.tagName);
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

    }

    const unShowList = (e) => {
        console.log(e.target.className === "trasnportHub");
        if (e.target.className === "transportHub") {
            let list = e.target.children[0];
            list.style.display = "none";
        }
    }


    const displayMaps = (maps) => {
        iframeMap.current.src = maps;
        setShowMap(true);
    }

    if (loading) {
        return <PreLoader />
    };

    if (errorDB || errorFrontBack) {
        return (
            <ConnectionError
                errorMessage={errorDB ? errorDB : errorFrontBack}
                showButton={true}
            />
        )
    };

    return (
        <div className="containerCityPage">
            <Header />
            <div className="subContainerCityPage">
                <aside className="tranportHubs">
                    <div
                        className="containerTranportHubs"
                        style={{ display: showTH ? "flex" : "none", }}
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
                    style={{ filter: showTH ? "blur(4px)" : "blur(0px)" }}
                >
                    <div
                        className="imageHero"
                        style={{ backgroundImage: `url(${require(`../assets/${city.src}.jpeg`).default})` }}
                    >
                    </div>
                    <p>Page of {city.name} it is under construction</p>
                    <Link to="/cities">
                        <button>Go back to Cities</button>
                    </Link>

                </main>
            </div>

            <Footer />
        </div>
    )
};

export default City