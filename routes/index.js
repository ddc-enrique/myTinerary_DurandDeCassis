const express = require("express");
const router = express.Router();
const passport = require(("passport"));
const citiesControllers = require("../controllers/citiesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");
const usersControllers = require("../controllers/usersControllers");

router
    .route("/cities")
    .get(passport.authenticate("jwt", {session:false}) ,citiesControllers.getAllCities)
    .post(citiesControllers.uploadNewCity);

router
    .route("/city/:id")
    .get(citiesControllers.getCityByID)
    .put(citiesControllers.updateCity)
    .delete(citiesControllers.deleteCity);

router
    .route("/itineraries")
    .get(itinerariesControllers.getAllItineraries)
    .post(itinerariesControllers.uploadNewItinerary);

router
    .route("/itinerary/:id")
    .get(itinerariesControllers.getItineraryById)
    .put(itinerariesControllers.updateItinerary)
    .delete(itinerariesControllers.deleteItinerary);

router
    .route("/itineraries/:cityId")
    .get(itinerariesControllers.getItinerariesByCityId);

router
    .route("/user/signup")
    .post(usersControllers.createUser);

router
    .route("/user/signin")
    .post(usersControllers.checkUser);

module.exports = router;
