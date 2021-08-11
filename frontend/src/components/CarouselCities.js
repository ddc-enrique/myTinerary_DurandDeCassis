import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    // CarouselCaption,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CarouselCities = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/carousel')
            .then((res) => setItems(res.data.response))
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const showCityData = (e) => {
        if (e.target.className === "imageCity"){
        let divCityData = e.target.children[0].style;
        divCityData.display = "flex";
        divCityData.flexDirection = "column";
        divCityData.justifyContent = "center";
        divCityData.alignItems = "center";
        }
    }
    const unShowCityData = (e) => {
        (e.target.className === "cityData" && (e.target.style.display = "none" ))
    }

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

    const slides = items.map((slide, index) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
                <div className="divSlide">
                {slide.map(city => {
                    let picture = require(`../assets/${city.src}_carousel.jpeg`);
                    return (
                        <div
                            className="imageCity"
                            style={{ backgroundImage: `url(${picture.default})` }}
                            key={city.id}
                            onMouseEnter={showCityData}
                            onMouseLeave={unShowCityData}
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