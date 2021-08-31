const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { name:{ type: String}, profilePic:{ type: String} },
    price: { type: Number, min: 1, max: 5, required: true },
    duration: { type: Number, min: 1, required: true },
    likes: [ String ],
    hashtags: [String],
    comments: [ {
        userId: { type: mongoose.Types.ObjectId, ref: "user"},
        commentText: { type: String, required: true}
    } ],
    description: { type: String, required: true },
    src: { type: String, required: true },
    cityId: { type: mongoose.Types.ObjectId, ref: "city" },
});

const Itinerary = mongoose.model("itinerary", ItinerarySchema);

module.exports = Itinerary;