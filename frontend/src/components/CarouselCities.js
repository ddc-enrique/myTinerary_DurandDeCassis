import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
import axios from 'axios';
import PreLoader from "../components/PreLoader"
import ConnectionError from "../pages/ConnectionError";

const CarouselCities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorDB, setErrorDB] = useState("");
    const [errorFrontBack, setErrorFrontBack] = useState("");
    let items= [[],[],[]];
    let citiesAux;

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/cities')
            .then((res) => {
                if (res.data.success) {
                    setCities(res.data.response);
                } else {
                    setErrorDB(res.data.response.message); 
                }
            })
            .catch((err) => { 
                setErrorFrontBack(err.message); 
            })
            .finally(()=> setLoading(false));
    }, []);
    citiesAux = cities.sort((cityA, cityB) => cityA.likes - cityB.likes);

    items = items.map((slide, i) => {
        for (let j = i*4; j < (i+1)*4; j++) {
            slide.push(citiesAux[j]);    
        }
        return slide
    });
    console.log(items);

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    if (loading) {
        return(
            <div className="divSlide">
                <PreLoader />
            </div>
        )
    }

    let slides;

    if (errorDB || errorFrontBack) {
        slides = [
            <CarouselItem
                onExiting={() => setAnimating(false)}
                onExited={() => setAnimating(false)}
                key={1}
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
                <div className="divSlide">
                    <ConnectionError 
                        errorMessage={errorDB ? errorDB : errorFrontBack }
                        showButton={false}
                    />
                </div>
            </CarouselItem>
        ];
    } else {

    slides = items.map((slide, index) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
                <div className="divSlide">
                    {slide.map(city => {
                        let picture = require(`../assets/${city.src}.jpeg`);
                        return (
                            <div
                                className="imageCity"
                                style={{ backgroundImage: `url(${picture.default})` }}
                                key={city._id}
                            >
                                <div className="cityData">
                                    <h5>{city.name}</h5>
                                    <h5>{city.country}</h5>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CarouselItem>
        )
    });
    };

    return(
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    )
};

export default CarouselCities