import axios from "axios";

const itinerariesActions = {
    getItinerariesList: (cityId) => {
        return async (dispatch) => {
            let response = await axios.get(`http://localhost:4000/api/itineraries/${cityId}`);
            let data = response.data.response;
            if(!response.data.success) throw data;
            dispatch({ type:"GET_ITINERARIES", payload: data});
            return data;
        }
    },

    clearItinerariesList: () => {
        return (dispatch) => {
            dispatch({ type:"CLEAR_ITINERARIES_LIST", payload: null });
        }
    },

    getActivities: (itineraryId) => {
        return async () => {
            let response = await axios.get(`http://localhost:4000/api/activities/${itineraryId}`);
            if (!response.data.success) throw response.data.error;
            return response.data.response;
        }
    },

    likeItinerary: (itineraryId, token, userId, addLike) => {
        return async () => {
            let response = await axios.put(`http://localhost:4000/api/likeItinerary/${itineraryId}`, 
                { userId, addLike }, { headers: { Authorization: "Bearer " + token } }
            );
            if(!response.data.success) throw response.data.response;
            return response.data.success;
        }
    },

    addOrDeleteComment: (itineraryId, token, userId, commentText, commentId) => {
        return async () => {
            let response = await axios.put(`http://localhost:4000/api/commentItinerary/${itineraryId}`,
                { userId, commentText, commentId }, { headers: { Authorization: "Bearer " + token } }
            );
            if(!response.data.success) throw response.data.response;
            return response.data;
        }
    },

    editComment: (commentId, token, newCommentText) => {
        return async () => {
            let response = await axios.put("http://localhost:4000/api/editComment", 
                { commentId, newCommentText },
                { headers: { Authorization: "Bearer " + token } }
            );
            if(!response.data.success) throw response.data.response;
            return response.data.success;
        }
    },


};

export default itinerariesActions;