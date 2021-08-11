const express = require("express");
const router = express.Router();
const myTineraryControllers = require("../controllers/myTineraryControllers")

router.route("/cities").get(myTineraryControllers.getCitiesList);
router.route("/carousel").get(myTineraryControllers.getPopularCities);
router.route("/city/:id").get(myTineraryControllers.getCityByID);

module.exports = router;
