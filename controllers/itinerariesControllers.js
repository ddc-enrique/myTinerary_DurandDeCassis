const Itinerary = require("../models/Itinerary");

const itinerariesControllers = {

    getAllItineraries: (req, res) => {
        Itinerary.find()
        .then( (itineraries) => {
            if(itineraries.length) {
                res.json({ success: true, response: itineraries});
            } else {
                throw new Error ();
            }
        })
        .catch( (err) => res.json({ success: false, response: err })); 
    },

    uploadNewItinerary: (req, res) => {
        const itineraryToUpload = new Itinerary ({
            title: req.body.title,
            author: {
                name: req.body.author.name,
                profilePic: req.body.author.profilePic,
            },
            price: req.body.price,
            duration: req.body.duration,
            hashtags: [ ...req.body.hashtags],
            description: req.body.description,
            src: req.body.src,
        });
        itineraryToUpload
            .save()
            .then( () => res.json({ success: true }))
            .catch( (err) => res.json({ success: false, response: err }))
    },
};

module.exports = itinerariesControllers;