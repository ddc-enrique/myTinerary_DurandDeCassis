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
                res.json( { success:false, response: "Page Not Found"})
            }
                // throw new Error (`It doesnt exist a City with the _id: ${req.params.id}`);
        })
        .catch(() => res.json({ success: false, response: "Page Not Found"}));
    },

    uploadNewCity: (req, res) => {
        const {name, country, src, description, transportHubs, likes} = req.body;
        const {airports, ferryPorts, busTerminals, trainStations} = transportHubs;
        const cityToUpload = new City ({ 
            name, country, src, description, likes,
            transportHubs: {
                airports: [...airports],
                ferryPorts: [...ferryPorts],
                busTerminals: [...busTerminals],
                trainStations: [...trainStations],
            },
        });
        cityToUpload
            .save()
            .then( () => res.json({ success: true}) )
            .catch( (err) => res.json({ success: false, response: err }) )
    },

    deleteCity: (req, res) =>{
        City.findOneAndDelete({ _id: req.params.id})
        .then( (city) => {
            if(city) {
                res.json({ success:true })
            } else {
                throw new Error(`No city found with the _id: ${req.params._id}`)
            }
        })
        .catch( (err) => res.json({ success: false, response: err }) )
    },

    updateCity: (req, res) => {
        City.findOneAndUpdate({ _id: req.params.id}, { ...req.body })
        .then( (city) => {
            if(city) {
                res.json({ success:true })
            } else {
                throw new Error(`No city found with the _id: ${req.params._id}`)
            }
        })
        .catch( (err) => res.json({ success: false, response: err }) )
    },

    updateCityLikes: (req, res) => {
        City.findOneAndUpdate( 
            { _id: req.params.id }, { $inc: {likes: req.body.addLike ? 1 : -1} } 
        ).then( () => res.json({ success: true }) )
        .catch( err => res.json({ success: false, response: err }) );
    },
};

module.exports = citiesControllers;