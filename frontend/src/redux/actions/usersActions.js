import axios from "axios";

const usersActions = {
    signUp: (user) => {
        return async (dispatch) => {
            let response = await axios.post("http://localhost:4000/api/user/signup", user );
            if(!response.data.success) throw (response.data.err || response.data.errors);
            dispatch({ type: "SIGN_USER_ON_LS_&_STORE", payload: response.data.response });
            return response
        }
    },

    signIn: (user) => {
        return async (dispatch) => {
            let response = await axios.post("http://localhost:4000/api/user/signin", user);
            if(!response.data.success) throw response.data.err;
            dispatch({ type: "SIGN_USER_ON_LS_&_STORE", payload: response.data.response });
            return response
        }
    },

    signOut: () => {
        return (dispatch) => {
            dispatch({ type:"SIGN_OUT"});
        }
    },

    signFromLS: (token) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios
                    .get("http://localhost:4000/api/verifyToken", { 
                    headers: { Authorization: "Bearer " + token }
                });
                dispatch({ type:"SIGN_USER_ON_LS_&_STORE", payload: {
                    token, user: response.data.user } 
                });
            } catch (error) {
                dispatch({ type:"SIGN_OUT"});
            }
        }
    },

}

export default usersActions;