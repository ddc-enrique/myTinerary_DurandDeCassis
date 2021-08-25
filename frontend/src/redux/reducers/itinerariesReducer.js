const itinerariesReducer = ( state = { itinerariesList: null }, action) => {
    switch (action.type) {
        case "GET_ITINERARIES":
            return{
                ...state,
                itinerariesList: action.payload,
            };
        
        case "CLEAR_ITINERARIES_LIST":
            return{
                ...state,
                itinerariesList: action.payload,
            }

        default:
            return state;
    }
};

export default itinerariesReducer;