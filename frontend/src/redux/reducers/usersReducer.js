const usersReducer = (state = { token:null, userId: null, firstName: null, lastName: null, profilePic: null}, action) => {
    switch(action.type) {
        case "SIGN_USER_ON_LS_&_STORE":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("firstName", action.payload.user.firstName);
            localStorage.setItem("profilePic", action.payload.user.profilePic);
            return{
                token: action.payload.token, userId: action.payload.user._id,
                firstName: action.payload.user.firstName, profilePic: action.payload.user.profilePic,
                lastName: action.payload.user.lastName,
            };
        
        case "SIGN_OUT":
            localStorage.removeItem("token");
            localStorage.removeItem("firstName");
            localStorage.removeItem("profilePic");
            return{
                token: null, firstName: null, profilePic: null, userId: null,
            };

        default:
            return state;
    }
};

export default usersReducer;