import axios from "axios";

const usersActions = {
    signUp: (user) => {
        return async (dispatch) => {
            // let data = JSON.stringify(user);
            let response = await axios.post("http://localhost:4000/api/user/signup", user );
            // data, {headers:{"Content-Type" : "application/json"}});
            if(!response.data.success) throw response.data.err;
            dispatch({ type: "SIGN_USER_ON_LS_&_STORE", payload: response.data.response });
            return response
        }
    },

    signIn: (user) => {
        return async (dispatch) => {
            // let data = JSON.stringify(user);
            let response = await axios.post("http://localhost:4000/api/user/signin", user);
            // , {headers:{"Content-Type" : "application/json"}});
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

    signFromLS: (token, user) => {
        
        return(dispatch, getState) => {
            dispatch({ type:"SIGN_USER_ON_LS_&_STORE", payload: {token, user} });
        }
    }
}

export default usersActions;