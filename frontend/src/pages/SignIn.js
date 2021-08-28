import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import usersActions from "../redux/actions/usersActions";
import GoogleLogin from 'react-google-login';
import { store } from 'react-notifications-component';

const SignIn = ({signIn}) => {
    const [checkUser, setCheckUser] = useState({
                                        email: "",
                                        password: "",
                                    });
    const {email, password} = checkUser;
    const [errorsValidation, setErrorsValidation] = useState({});

    const inputHandler = (e) => {
        setCheckUser({
            ...checkUser,
            [e.target.name]: e.target.value
        });
    }

    const handleValidation = () => {
        let fields = checkUser;
        let errors = {};
        let validate = true;

        if(!fields["email"]) {
            validate = false;
            errors["email"] = "The field email is required";
        } else {
            if (!fields["email"].includes("@")) {
                validate = false;
                errors["email"] = "Please enter an email with an email direction format";
            }
        };

        if(!fields["password"]) {
            validate = false;
            errors["password"] = "The field password is required";
        } else {
            if(fields["password"].length < 5) {
                validate = false;
                errors["password"] = "Please enter a password with at least 5 charachters";
            }
        };
        
        setErrorsValidation(errors);
        return validate
    };

    const handleSignIn = async (user) => {
        try {
            let response = await signIn(user);
            store.addNotification({
                title: `WELCOME BACK ${(response.data.response.user.firstName).toUpperCase()}!`,
                message: "Thanks for choosing MyTinerary",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    pauseOnHover: true
                }
            });
        } catch(error) {
            let errorsOptions = {title:"", message:"", type:"warning"};
            if((typeof error) === "string") {
                switch (error) {
                    case "1":
                        errorsOptions.title = "Please Sign Up first";
                        errorsOptions.message = " ";
                        break;
                    case "2":
                        errorsOptions.title = "You Sign Up with your Google account";
                        errorsOptions.message = "Please Sign In with Google";
                        break;
                    case "3":
                        setErrorsValidation({signIn: "Wrong email and/or password"});
                        break;
                    default:
                        errorsOptions.title = "Sorry, we are having connection errors";
                        errorsOptions.message = "Please come back later";
                        errorsOptions.type = "danger";
                        break;
                }
            } else {
                errorsOptions.title = "Sorry, we are having connection errors";
                errorsOptions.message = "Please come back later";
                errorsOptions.type = "danger";
            };
            if (!(error === "3")) {
                store.addNotification({
                    ...errorsOptions,
                    insert: "top",
                    container: "center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 2000,
                        pauseOnHover: true
                    }
                });
            };
        };
    };
    
    const responseGoogle = (response) => {
        let googleUser = {
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            googleFlag: true,
        };
        handleSignIn(googleUser);
    };

    const submitUser = () => {
        if (handleValidation()) {
            handleSignIn(checkUser);
        };
    };

    return (
        <div className="containerSign">
            <Header /> 
            
            <div className="containerForm">
                <div className="formTitle">
                    <h2>Welcome Back!</h2>
                    <h4>Sign-In for a better expirience on MyTinerary</h4>
                </div>
                <div className="form">
                    <input 
                        type="email"
                        placeholder="Enter your Email"
                        name="email"
                        value={email}
                        onChange={inputHandler}
                    />
                    <p className="error">&nbsp;{errorsValidation["email"]}</p>
                    <input 
                        type="password"
                        placeholder="Enter a password with at least 5 characters"
                        name="password"
                        value={password}
                        onChange={inputHandler}
                    />
                    <p className="error">&nbsp;{errorsValidation["password"]}</p>
                    
                    <div className="sign">
                        <p className="error">&nbsp;{errorsValidation["signIn"]}</p>
                        <button onClick={submitUser}> SIGN-IN </button>
                        <div>
                            <hr /> OR <hr />
                        </div>
                        <GoogleLogin
                            clientId="123395486350-7vkdk0812656ukr4p18pi6h4gc40jm8s.apps.googleusercontent.com"
                            buttonText="Sign In with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        {/* <button> SIGN-IN with Google</button> */}
                    </div>
                </div>
                <div className="switchSign">
                    <p>Do not have an account yet? <Link to="/signup">Sign Up here!</Link></p>
                </div>
            </div>

            <Footer />
        </div>
    )
};

const mapDispatchToProps = {
    signIn: usersActions.signIn,
};


export default connect(null, mapDispatchToProps)(SignIn)