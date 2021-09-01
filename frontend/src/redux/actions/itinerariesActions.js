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

    likeItinerary: (itineraryId, user_Id, flag) => {
        return async () => {
            let response = await axios.put(`http://localhost:4000/api/removeLike/${itineraryId}`, { userId: user_Id, addLike: flag});
            if(!response.data.success) throw response.data.response;
            return response.data.success;
        }
    },
};

export default itinerariesActions;