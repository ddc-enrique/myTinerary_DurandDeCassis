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
        .catch((err)=> res.json({ success: false, response: err })); 
    },

    getItinerariesByCityId: (req, res) => {
        Itinerary.find( {cityId: req.params.cityId} )
        .then( (itineraries) => 
            res.json({ success: true, response: itineraries })
        )
        .catch( () => res.json({ success: false, response: "Page Not Found" }));
    },

    uploadNewItinerary: (req, res) => {
        const {title, author, price, duration, hashtags, description, src, cityId} = req.body;
        const {name, profilePic} = author;
        const itineraryToUpload = new Itinerary ({
            title, price, duration, hashtags, description, src, cityId,
            author: {
                name: name,
                profilePic: profilePic,
            },
        });
        itineraryToUpload
            .save()
            .then( () => res.json({ success: true }))
            .catch( (err) => res.json({ success: false, response: err }))
    },

    getItineraryById: (req, res) => {
        Itinerary.findOne({ _id: req.params.id })
            .then((itinerary) => {
                if (itinerary) {
                    res.json({ success: true, response: itinerary });
                } else {
                    throw new Error("Not itinerary found with that _id");
                }
            })
            .catch((err) => res.json({ success: false, response: err }));
    },

    updateItinerary: (req, res) => {
        Itinerary.findOneAndUpdate({ _id: req.params.id}, { ...req.body })
        .then( (itinerary) => {
            if(itinerary) {
                res.json({ success:true })
            } else {
                throw new Error(`No itinerary found with the _id: ${req.params._id}`)
            }
        })
        .catch( (err) => res.json({ success: false, response: err }) )
    },

    deleteItinerary: (req, res) => {
        Itinerary.findOneAndDelete({ _id: req.params.id})
        .then((itinerary) => {
            if(itinerary) {
                res.json({ success:true })
            } else {
                throw new Error(`No itinerary found with the _id: ${req.params._id}`)
            }
        })
        .catch( (err) => res.json({ success: false, response: err }) )
    },
};

module.exports = itinerariesControllers;