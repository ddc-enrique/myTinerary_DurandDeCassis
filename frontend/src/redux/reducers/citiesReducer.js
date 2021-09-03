const citiesReducer = ( state = {carouselCities: [], citiesList: [], citiesFiltered: [], forceUpdateCarousel: 0}, action) => {
    switch(action.type) {
        case "GET_ALL_CITIES":
            return{
                ...state,
                citiesList: action.payload, citiesFiltered: action.payload, carouselCities: action.payload,
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
            let citiesLikesUpdated = state.carouselCities.map(city => {
                let cityAux=city;
                if (city._id === action.payload.cityId) {
                    cityAux.likes = action.payload.addLike ? (city.likes + 1) : (city.likes - 1);
                }
                return cityAux
            });
            let updateCarousel = state.forceUpdateCarousel + 1;
            return{
                carouselCities: citiesLikesUpdated,
                forceUpdateCarousel: updateCarousel,
            };

        default: 
            return state;
    }
};

export default citiesReducer;