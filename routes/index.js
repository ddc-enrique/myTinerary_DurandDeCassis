const express = require("express");
const router = express.Router();
const citiesControllers = require("../controllers/citiesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");

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
    .post(itinerariesControllers.uploadNewItinerary)

    module.exports = router;
