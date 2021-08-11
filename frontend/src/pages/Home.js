import React, { useEffect } from "react";
import CallAction from "../components/CallAction";
import CarouselCities from "../components/CarouselCities";
import Footer from "../components/Footer";
import Header from "../components/Header";


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <CarouselCities />

      <Footer />
    </div>
  )
};
export default Home;