const express = require("express");
const router = express.Router();
const passport = require("passport");
const citiesControllers = require("../controllers/citiesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");
const usersControllers = require("../controllers/usersControllers");
const activitiesControllers = require("../controllers/activitiesControllers");
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
    .route("/city/likes/:id")
    .put(passport.authenticate("jwt", { session: false }), citiesControllers.updateCityLikes)

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
    .route("/likeItinerary/:itineraryId")
    .put(passport.authenticate("jwt", { session: false }), itinerariesControllers.likeItinerary);
 
router
    .route("/commentItinerary/:itineraryId")
    .put(passport.authenticate("jwt", { session: false }), itinerariesControllers.commentItinerary);

router
    .route("/editComment")
    .put(passport.authenticate("jwt", { session: false }), itinerariesControllers.editComment);
   
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

router
    .route("/activities/:itineraryId")
    .get(activitiesControllers.getActivities);

router
    .route("/activity")
    .post(activitiesControllers.uploadActivity);

module.exports = router;
