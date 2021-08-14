// const cities = [
//     { id: 3, name: "Rome", country: "Italy", src: "rome", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 4, name: "Warsaw", country: "Poland", src: "warsaw", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 5, name: "New York", country: "United States", src: "newYork", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 6, name: "Amsterdam", country: "Netherlands", src: "amsterdam", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 7, name: "Hong Kong", country: "China", src: "hongKong", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 8, name: "Barcelona", country: "Spain", src: "barcelona", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 9, name: "Paris", country: "France", src: "paris", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 10, name: "Buenos Aires", country: "Argentina", src: "buenosAires", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 11, name: "Sydney", country: "Australia", src: "sydney", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
//     { id: 12, name: "Saint Petersburg", country: "Rusia", src: "stPetersburg", 
//         transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
//     },
// ];
const City = require("../models/City");

const citiesControllers = {
    getAllCities: (req, res) => {
        City.find()
        .then((cities) => {
            if(cities.length) {
                res.json({ success: true, response: cities});
            } else {
                throw new Error("The Database Cities it is empty");
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
                throw new Error(`I doesnt exist a City with the _id: ${req.params.id}`);
            }
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
            .then( () => res.json({ success: true}))
            .catch((err) => res.json({ success: false, error: err }))
    },

    deleteCity: (req, res) =>{
        City.findOneAndDelete({ _id: req.params.id})
        .then(() => 
            res.json({ success: true }) 
        )
        .catch((err) => 
            res.json({ success: false, response: err.message })
        )
    },

    updateCity: (req, res) => {
        City.findOneAndUpdate({ _id: req.params.id}, { ...req.body })
        .then( () => res.json({ success:true }) )
    },
};

module.exports = citiesControllers;