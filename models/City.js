const mongoose = require("mongoose");

const TransportHubSchema = new mongoose.Schema({
    name: { type: String},
    maps: { type: String},
});

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required:true },
    src: { type: String },
    description: { type: String },
    transportHubs: {
        airports: [ TransportHubSchema ], 
        ferryPorts: [ TransportHubSchema ],
        busTerminals: [ TransportHubSchema ],
        trainStations: [ TransportHubSchema ], 
    },
    likes: { type: Number, default: 0, min: 0},
});

const City = mongoose.model("city", CitySchema);

module.exports = City;

