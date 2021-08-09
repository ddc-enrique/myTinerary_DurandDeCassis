import React, { useEffect, useState } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  // CarouselCaption,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 500 }); //cuando se monta Home inicializo la animacion de callAction
    // puedo darle duracion usando la propiedad duration: en el objeto que recibe como parametro
    // la duracion es en milisegundos
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const showCityData = (e) => {
    if (e.target.className === "imageCityCarousel"){
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

  const items = [
    [
      { id: 1, name: "Corrientes", country: "Argentina", src: "corrientes" },
      { id: 2, name: "London", country: "England", src: "london" },
      { id: 3, name: "Rome", country: "Italy", src: "rome" },
      { id: 4, name: "Warsaw", country: "Poland", src: "warsaw" },
    ],
    [
      { id: 5, name: "New York", country: "United States", src: "newYork" },
      { id: 6, name: "Amsterdam", country: "Netherlands", src: "amsterdam" },
      { id: 7, name: "Hong Kong", country: "China", src: "hongKong" },
      { id: 8, name: "Barcelona", country: "Spain", src: "barcelona" },
    ],
    [
      { id: 9, name: "Paris", country: "France", src: "paris" },
      { id: 10, name: "Buenos Aires", country: "Argentina", src: "buenosAires" },
      { id: 11, name: "Sydney", country: "Australia", src: "sydney" },
      { id: 12, name: "Saint Petersburg", country: "Rusia", src: "stPetersburg" },
    ]
  ];


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
                className="imageCityCarousel"
                style={{ backgroundImage: `url(${picture.default})` }}
                key={city.id}
                onMouseEnter={showCityData}
                onMouseLeave={unShowCityData}
              >
                <div 
                  className="cityData"
                  // style={{display: (displayCityData ) ? "block" : "none"}}
                >
                  <h5>{city.name}</h5>
                  <h5>{city.country}</h5>
                </div>
              </div>
            );
          })}
        </div>
        {/* <CarouselCaption captionText={slide.caption} captionHeader={slide.caption} /> */}
      </CarouselItem>
    )
  });
  return (
    <div className="containerHome">
      <div className="imageHero">
        <h1>
          MyTinerary
        </h1>
        <h3>
          Find  your  perfect  trip, designed by insiders who know and love their cities!
        </h3>
      </div>
      <div data-aos="flip-up" className="callAction">
        <h4>Are you searching for a new adventure, but still don´t know where ?</h4>
        <Link to="/cities"><button>Choose from HERE!</button></Link>
      </div>
      <h2>Popular MyTineraries</h2>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}

      >
        {/* <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} /> */}
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  )
};
export default Home;