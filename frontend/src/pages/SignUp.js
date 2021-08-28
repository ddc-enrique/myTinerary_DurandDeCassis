import React, { useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import axios from 'axios';
import PreLoader from '../components/PreLoader';
import { connect } from 'react-redux';
import usersActions from '../redux/actions/usersActions';
import GoogleLogin from 'react-google-login';
import { store } from 'react-notifications-component';

//123395486350-7vkdk0812656ukr4p18pi6h4gc40jm8s.apps.googleusercontent.com

const SignUp = ({signUp}) => {
    const [countriesSelect, setCountriesSelect] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    password: "",
                                    profilePic: "",
                                    country: {value:"chooseCountry"}
                                    });
    const { firstName, lastName, email, password, profilePic, country } = newUser;
    const [errorsValidation, setErrorsValidation] = useState({});
    
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all?fields=name")
            .then( res => setCountriesSelect(res.data));
        setLoading(false);
    }, []);

    const inputHandler = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    const handleValidation = () => {
        let fields = newUser;
        let errors = {};
        let validate = true;
        
        if (!fields["firstName"]) {
            validate = false;
            errors["firstName"] = "The field First Name is required";
        };

        if (!fields["lastName"]) {
            validate = false;
            errors["lastName"] = "The field Last Name is required";
        };

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
                errors["password"] = "The password is too short, please enter a password with at least 5 charachters";
            }
        };

        if (!fields["profilePic"]) {
            validate = false;
            errors["profilePic"] = "This field is required, it doesnt matter if you are ugly";
        };

        if (fields["country"].value === "chooseCountry") {
            validate = false;
            errors["country"] = "Please choose a country from the list";
        };

        setErrorsValidation(errors);
        return validate
    };

    const handleSignUp = async(user) => {
        try {
            let response = await signUp(user);
            store.addNotification({
                title: `WELCOME ${(response.data.response.user.firstName).toUpperCase()}!`,
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
            let errorsOptions = {title:"", message:"", type:"danger"};
            if((typeof error) === "string") {
                switch (error) {
                    case "1":
                        errorsOptions.title = "You already Sign Up with this Google account";
                        errorsOptions.message = "Now you just have to Sign In";
                        errorsOptions.type = "warning";
                        break;
                    case "2":
                        setErrorsValidation({email: "User with this email already exist"});
                        break;
                    default:
                        errorsOptions.title = "Sorry, we are having connection errors";
                        errorsOptions.message = "Please come back later";
                        break;
                }
            } else {
                errorsOptions.title = "Sorry, we are having connection errors";
                errorsOptions.message = "Please come back later";
            };
            if (!(error === "2")) {
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
    }

    const responseGoogle = (response) => {
        let googleUser = {
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            profilePic: response.profileObj.imageUrl,
            country: "Argentina",
            google: true,
        }
        handleSignUp(googleUser);
    }

    const submitUser = () => {
        if ( handleValidation() ) {
            handleSignUp(newUser);
        }
    }

    if (loading) return <PreLoader />;

    return (
        <div className="containerSign">
            <Header /> 
            
            <div className="containerForm">
                <div className="formTitle">
                    <h2>Create an Account</h2>
                    <h4>Please fill the form with the fields requested below</h4>
                </div>
                <div className="form">
                    <input 
                        type="text" 
                        placeholder="Enter your First Name"
                        name="firstName"
                        value={firstName}                        
                        onChange={inputHandler}
                    />
                    <p className="error">&nbsp;{errorsValidation["firstName"]}</p>
                    <input 
                        type="text" 
                        placeholder="Enter your Last Name"
                        name="lastName"
                        value={lastName}                        
                        onChange={inputHandler}
                    />
                    <p className="error">&nbsp;{errorsValidation["lastName"]}</p>
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
                    <input 
                        type="text" 
                        placeholder="Enter a URL for your profile picture"
                        name="profilePic"
                        value={profilePic}                        
                        onChange={inputHandler}
                    />
                    <p className="error">&nbsp;{errorsValidation["profilePic"]}</p>
                    <select 
                        name="country" 
                        value={country}
                        onChange={inputHandler}
                    >
                        <option 
                            value="chooseCountry"
                        >
                            Choose your Country
                        </option>
                        {
                            countriesSelect.map((country, index) => (
                                <option value={country.name} key={index}>{country.name}</option>
                            ))
                        }
                    </select>
                    <p className="error">&nbsp;{errorsValidation["country"]}</p>
                    <div className="sign">
                        <button onClick={submitUser}> SIGN-UP </button>
                        <div>
                            <hr /> OR <hr />
                        </div>
                        <GoogleLogin
                            clientId="123395486350-7vkdk0812656ukr4p18pi6h4gc40jm8s.apps.googleusercontent.com"
                            buttonText="Sign Up with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        {/* <button> SIGN-UP with Google</button> */}
                    </div>
                </div>
                <div className="switchSign">
                    <p>Already have an account? <Link to="/signin">Sign In here!</Link></p>
                </div>
            </div>

            <Footer />
        </div>
    )
};

const mapDispatchToProps = {
    signUp: usersActions.signUp,
};

export default connect(null, mapDispatchToProps)(SignUp)