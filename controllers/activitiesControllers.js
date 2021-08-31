const Activity = require("../models/Activity");

const activitiesControllers = {
    uploadActivity: (req, res) => {
        const {title, src, itineraryId} = req.body;
        const activityToUpload = new Activity({title, src, itineraryId});        
        activityToUpload.save()
                .then( () => res.json( { success: true} ) )
                .catch( (err) => res.json( { success: false, error: err }))
    },

    getActivities: (req, res) => {
        Activity.find( { itineraryId: req.params.itineraryId })
                .then( (activities) => res.json( { success: true, response: activities }) )
                .catch( (err) => res.json( { success: false, error: err }));
    },
};

module.exports = activitiesControllers;