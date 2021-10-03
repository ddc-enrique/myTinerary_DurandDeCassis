import axios from "axios";

const citiesActions = {
    getCitiesList: () => {
        return async (dispatch) => {
            let response =await axios.get("https://mytinerary-duranddecassis.herokuapp.com/api/cities");
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

    updateCityLikes: (token, cityId, addLike) => {
        return async(dispatch) => {
            await axios.put(`https://mytinerary-duranddecassis.herokuapp.com/api/city/likes/${cityId}`, 
                {addLike}, { headers: { Authorization: "Bearer " + token } }
            );
            let sendObject = {cityId, addLike};
            dispatch({ type: "UPDATE_CITY_LIKES", payload: sendObject});
        }
    },

};

export default citiesActions;