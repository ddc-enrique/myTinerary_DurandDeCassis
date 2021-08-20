import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";

const mainReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
});

export default mainReducer;