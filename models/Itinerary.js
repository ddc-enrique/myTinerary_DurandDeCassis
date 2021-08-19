const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { name:{ type: String}, profilePic:{ type: String} },
    price: { type: Number, min: 1, max: 5, required: true},
    duration: { type: Number, min: 1, required: true},
    likes: { type: Number, default: 0, min: 0},
    hashtags: [String],
    comments: [],
    description: { type: String, required: true},
    src: { type: String, required: true},
});

const Itinerary = mongoose.model("itinerary", ItinerarySchema);

module.exports = Itinerary;