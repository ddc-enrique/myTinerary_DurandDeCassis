const express = require("express");
const router = express.Router();
const citiesControllers = require("../controllers/citiesControllers")

router
    .route("/cities")
    .get(citiesControllers.getAllCities)
    .post(citiesControllers.uploadNewCity);
router
    .route("/city/:id")
    .get(citiesControllers.getCityByID)
    .put(citiesControllers.updateCity)
    .delete(citiesControllers.deleteCity);

module.exports = router;
