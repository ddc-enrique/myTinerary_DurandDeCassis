import axios from "axios";

const citiesActions = {
    getCitiesList: () => {
        return async (dispatch) => {
            let response = await axios.get("http://localhost:4000/api/cities");
            let data = response.data.response;
            if (!response.data.success) throw data;
            dispatch({ type: "GET_ALL_CITIES", payload: data });
        }
    },

    filterCitiesList: (wordToFilter) => {
        return (dispatch) => {           
            dispatch({ type: "FILTER_CITIES", payload: wordToFilter });
        }
    },

};

export default citiesActions;