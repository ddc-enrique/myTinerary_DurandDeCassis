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
            errors["email"] = "Please enter your email";
        } else {
            if (!fields["email"].includes("@")) {
                validate = false;
                errors["email"] = "Please enter an email with an email direction format";
            }
        };

        if(!fields["password"]) {
            validate = false;
            errors["password"] = "Please enter your password";
        } else {
            if(fields["password"].length < 5) {
                validate = false;
                errors["password"] = "The password has a minimum of 5 characters";
            }
        };
        
        setErrorsValidation(errors);
        return validate
    };

    const handleSignIn = async (user) => {
        let notificationOptions = { title: "", message: "", type: "", container: "center", dismiss: { duration: 4000, pauseOnHover: true } };
        let showNotification = true;
        try {
            let response = await signIn(user);
            notificationOptions.title = `WELCOME BACK ${(response.data.response.user.firstName).toUpperCase()}!`;
            notificationOptions.message = "Thanks for choosing MyTinerary";
            notificationOptions.type = "success";
            notificationOptions.container = "top-right";
            notificationOptions.dismiss.duration = 2000;
        } catch(error) {
            if((typeof error) === "string") {
                switch (error) {
                    case "1":
                        notificationOptions.title = "Please Sign Up first";
                        notificationOptions.message = " ";
                        notificationOptions.type = "warning";
                        break;
                    case "2":
                        notificationOptions.title = "You Sign Up with your Google account";
                        notificationOptions.message = "Please Sign In with Google";
                        notificationOptions.type = "warning";
                        break;
                    case "3":
                        setErrorsValidation({signIn: "Wrong email and/or password"});
                        showNotification = false;
                        break;
                    default:
                        notificationOptions.title = "Sorry, we are having connection errors";
                        notificationOptions.message = "Please come back later";
                        notificationOptions.type = "danger";
                        break;
                }
            } else {
                notificationOptions.title = "Sorry, we are having connection errors";
                notificationOptions.message = "Please come back later";
                notificationOptions.type = "danger";
            };
        } finally {
            if (showNotification) {
                store.addNotification({
                    ...notificationOptions,
                    insert: "top",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
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

    const submitUser = (e) => {
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
                    <div className="inputContainer">
                        <div>
                            <img src={require("../assets/email.png").default} alt="" className="logoInput" />
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                name="email"
                                value={email}
                                onChange={inputHandler}
                            />
                        </div>
                        <p className="error">&nbsp;{errorsValidation["email"]}</p>
                    </div>

                    <div className="inputContainer">
                        <div>
                            <img src={require("../assets/password.png").default} alt="" className="logoInput" />
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                name="password"
                                value={password}
                                onChange={inputHandler}
                            />
                        </div>
                        <p className="error">&nbsp;{errorsValidation["password"]}</p>
                    </div>
                </div>
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