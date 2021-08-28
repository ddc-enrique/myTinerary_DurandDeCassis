import axios from "axios";

const usersActions = {
    signUp: (user) => {
        console.log("entre al action");
        return async (dispatch) => {

            // let data = JSON.stringify(user);
            let response = await axios.post("http://localhost:4000/api/user/signup", user );
            // data, {headers:{"Content-Type" : "application/json"}});
            console.log("hice le fetcheo a la api");
            if(!response.data.success) throw (response.data.err || response.data.errors);
            dispatch({ type: "SIGN_USER_ON_LS_&_STORE", payload: response.data.response });
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

    signFromLS: (token) => {
        return async (dispatch, getState) => {
            console.log(token);
            try {
                let response = await axios
                    .get("http://localhost:4000/api/verifyToken", { 
                    headers: { Authorization: "Bearer " + token } 
                });
                console.log(response.data.user);
                dispatch({ type:"SIGN_USER_ON_LS_&_STORE", payload: {
                    token, user: response.data.user } 
                });
            } catch (error) {
                dispatch({ type:"SIGN_OUT"});
            }
        }
    }
}

export default usersActions;