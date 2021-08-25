const usersReducer = (state = { token:null, user:null}, action) => {
    switch(action.type) {
        case "SIGN_USER_ON_LS_&_STORE":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(user))
            return{
                // ...state,
                token:action.payload.token, user: action.payload.user,
            }
        
        case "SIGN_OUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return{
                token: null, user: null,
            }
        case "SIGN_FROM_LS":

            return{

            }

        default:
            return state;
    }
};

export default usersReducer;