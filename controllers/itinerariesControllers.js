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
            .populate({ 
                path: "comments", 
                populate: { path:"userId", select: "firstName lastName profilePic"} 
            })
            .then( (itineraries) => 
                res.json({ success: true, response: itineraries })
            )
            .catch( () => res.json({ success: false, response: "Network Error" }));
    },

    uploadNewItinerary: (req, res) => {
        const {title, author, price, duration, hashtags, comments, description, src, cityId} = req.body;
        const {name, profilePic} = author;
        const itineraryToUpload = new Itinerary ({
            title, price, duration, hashtags, comments, description, src, cityId,
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
            .populate("userId", "firstName lastName profilePic")
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
        .catch( (err) => res.json({ success: false, response: err }) );
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
        .catch( (err) => res.json({ success: false, response: err }) );
    },

    likeItinerary: (req, res) => {
        const {userId, addLike} = req.body;
        const arrayOperator = addLike ? {$push: { likes: userId }} : {$pull: { likes: userId }};
        Itinerary.findOneAndUpdate( 
            { _id: req.params.itineraryId }, arrayOperator 
        ).then( () => res.json({ success: true }) )
        .catch( err => res.json({ success: false, response: err }) );
    },
};

module.exports = itinerariesControllers;