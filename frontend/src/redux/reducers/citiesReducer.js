const citiesReducer = ( state = { citiesList: [], citiesFiltered: [],}, action) => {
    switch(action.type) {
        case "GET_ALL_CITIES":
            return{
                ...state,
                citiesList: action.payload, citiesFiltered: action.payload,
            };

        case "FILTER_CITIES":
            let newList = state.citiesList.filter(city => (
                city.name.toUpperCase().startsWith(
                    action.payload
                )
            ));
            return{
                ...state,
                citiesFiltered: newList,
            };
        case "UPDATE_CITIES_LIKES":
            let citiesLikesUpdated = state.citiesList.map(city => {
                if (city._id === action.payload.cityId) {
                    city.likes = action.payload.addLike ? (city.likes + 1) : (city.likes - 1);
                }
                return city
            });
            return{
                citiesList: citiesLikesUpdated,
            };

        default: 
            return state;
    }
};

export default citiesReducer;