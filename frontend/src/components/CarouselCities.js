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
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false)
    let items= [[],[],[]];

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/cities')
            .then((res) => {
                setCities(res.data.response);
                setLoading(true);
            });
    }, []);
    
    items = items.map((slide, i) => {
        for (let j = i*4; j < (i+1)*4; j++) {
            slide.push(cities[j]);    
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

    if (!loading) {
        return(
            <div>
                Loading Carousel...
            </div>
        )
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