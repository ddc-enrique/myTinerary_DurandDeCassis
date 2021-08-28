const express = require("express");
const router = express.Router();
const passport = require("passport");
const citiesControllers = require("../controllers/citiesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");
const usersControllers = require("../controllers/usersControllers");
const validator = require("../controllers/validator");

router
    .route("/cities")
    .get(citiesControllers.getAllCities)
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
    .post(validator, usersControllers.createUser);

router
    .route("/user/signin")
    .post(usersControllers.checkUser);

router
    .route("/verifyToken")
    .get(passport.authenticate("jwt", { session: false }), usersControllers.verifyToken);

module.exports = router;
