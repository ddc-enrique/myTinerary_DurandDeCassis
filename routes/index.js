const express = require("express");
const router = express.Router();
const citiesControllers = require("../controllers/citiesControllers")

router.route("/cities").get(citiesControllers.getCitiesList);
router.route("/city/:id").get(citiesControllers.getCityByID);

module.exports = router;
