import axios from "axios";

const citiesActions = {
    getCitiesList: (...token) => {
        return async (dispatch) => {
            console.log(!token.length);
            let response = !token.length ? await axios.get("http://localhost:4000/api/cities")
                : await axios.get("http://localhost:4000/api/cities", { headers: { Authorizathion: "Bearer " + token[0] } });
            console.log(response)
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