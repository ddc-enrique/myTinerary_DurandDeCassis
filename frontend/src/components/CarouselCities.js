import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
import ConnectionError from "../pages/ConnectionError";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";

const CarouselCities = ({getCities, cities, token}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ flag: false, err: {} });
    let items= [[],[],[]];
    let citiesAux;

    useEffect( () => {
        async function getCitiesList() {
            try {
                console.log(token);
                if (!cities.length) await getCities(token);
            } catch(e) {
                setError({flag: true, err: e});
            }
            setLoading(false);
        };
        getCitiesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    citiesAux = cities.sort((cityA, cityB) => cityA.likes - cityB.likes);

    items = items.map((slide, i) => {
        for (let j = i*4; j < (i+1)*4; j++) {
            slide.push(citiesAux[j]);    
        }
        return slide
    });

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
                <p>Loading...</p>
            </div>
        )
    }

    let slides;

    if (error.flag) {
        slides = [
            <CarouselItem
                onExiting={() => setAnimating(false)}
                onExited={() => setAnimating(false)}
                key={1}
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
                <div className="divSlide">
                    <ConnectionError 
                        error={error.err}
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

const mapDispatchToProps = {
    getCities: citiesActions.getCitiesList,
};

const mapStateToProps = (state) => {
    return{
        cities: state.cities.citiesList,
        token: state.users.token,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselCities);