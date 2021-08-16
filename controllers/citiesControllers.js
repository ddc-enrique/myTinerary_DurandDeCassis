const City = require("../models/City");

const citiesControllers = {
    getAllCities: (req, res) => {
        City.find()
        .then((cities) => {
            if(cities.length) {
                res.json({ success: true, response: cities});
            } else {
                throw new Error("The Database Cities is empty");
            }
        })
        .catch((err)=> res.json({ success: false, response: err}));
    },

    getCityByID: (req, res) =>{
        City.findOne( {_id: req.params.id })
        .then((city) =>{
            if (city) {
                res.json({ success: true, response: city});
            } else {
                res.json( { success:false, response: `It doesnt exist a City with the _id: ${req.params.id}`})
            }
                // throw new Error (`It doesnt exist a City with the _id: ${req.params.id}`);
        })
        .catch((err) => res.json({ success: false, response: err }));
    },

    uploadNewCity: (req, res) => {
        const cityToUpload = new City ({
            name: req.body.name,
            country: req.body.country,
            src: req.body.src,
            description: req.body.description,
            transportHubs: {
                airports: [...req.body.transportHubs.airports],
                ferryPorts: [...req.body.transportHubs.ferryPorts],
                busTerminals: [...req.body.transportHubs.busTerminals],
                trainStations: [...req.body.transportHubs.trainStations],
            },
            likes: req.body.likes,
        });
        cityToUpload
            .save()
            .then( () => res.json({ success: true}) )
            .catch( (err) => res.json({ success: false, response: err }) )
    },

    deleteCity: (req, res) =>{
        City.findOneAndDelete({ _id: req.params.id})
        .then( () => res.json({ success: true }) )
        .catch( (err) => res.json({ success: false, response: err }) )
    },

    updateCity: (req, res) => {
        City.findOneAndUpdate({ _id: req.params.id}, { ...req.body })
        .then( () => res.json({ success:true }) )
        .catch( (err) => res.json( { success: false, response: err }) )
    },
};

module.exports = citiesControllers;