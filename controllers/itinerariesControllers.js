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
        .then( (itineraries) => res.json({ success: true, response: itineraries }))
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
            cityId: req.body.cityId,
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