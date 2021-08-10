import React, { useEffect } from "react";
import CallAction from "../components/CallAction";
import CarouselCities from "../components/CarouselCities";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

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

  return (
    <div className="containerHome">
      <Header />

      <div className="imageHero">
        <h1>
          MyTinerary
        </h1>
        <h3>
          Find  your  perfect  trip, designed by insiders who know and love their cities!
        </h3>
      </div>

      <CallAction />

      <h2>Popular MyTineraries</h2>
      <CarouselCities items={items} />

      <Footer />
    </div>
  )
};
export default Home;