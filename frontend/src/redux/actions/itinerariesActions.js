import axios from "axios";

const itinerariesActions = {
    getItinerariesList: (cityId) => {
        return async (dispatch) => {
            let response = await axios.get(`http://localhost:4000/api/itineraries`);
            let data = response.data.response;
            if(!response.data.success) throw data;
            dispatch({ type:"GET_ALL_ITINERARIES", payload: data});
        }
    },
};

export default itinerariesActions;