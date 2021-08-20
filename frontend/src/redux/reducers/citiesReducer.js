const citiesReducer = ( state = { citiesList: [], citiesFiltered: [], cityByID: {}, }, action) => {
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
        case "FIND_CITY_BY_ID":
            let newObject = state.citiesList.find(city => 
                city._id === action.payload);
            return {
                ...state,
                cityByID: newObject,
            }
        default: 
            return state;
    }
};

export default citiesReducer;