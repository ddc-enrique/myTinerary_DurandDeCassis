import axios from "axios";

const itinerariesActions = {
    getItinerariesList: () => {
        return async (dispatch) => {
            let response = await axios.get("http://localhost:4000/api/itineraries");
            let data = response.data.response;
            dispatch({ type:"GET_ALL_ITINERARIES", payload: data});
        }
    },
};

export default itinerariesActions;