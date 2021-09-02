import axios from "axios";

const citiesActions = {
    getCitiesList: () => {
        return async (dispatch) => {
            let response =await axios.get("http://localhost:4000/api/cities");
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
            await axios.put(`http://localhost:4000/api/city/likes/${cityId}`, 
                addLike, { headers: { Authorization: "Bearer " + token } }
            );
            dispatch({ type: "UPDATE_CITY_LIKES", payload: {cityId, addLike}});
        }
    },

};

export default citiesActions;