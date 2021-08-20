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
        default: 
            return state;
    }
};

export default citiesReducer;