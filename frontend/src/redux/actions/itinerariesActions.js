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
};

export default itinerariesActions;