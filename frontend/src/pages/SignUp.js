import React, { useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import axios from 'axios';
import PreLoader from '../components/PreLoader';
import { connect } from 'react-redux';
import usersActions from '../redux/actions/usersActions';
import GoogleLogin from 'react-google-login';

//123395486350-7vkdk0812656ukr4p18pi6h4gc40jm8s.apps.googleusercontent.com

const SignUp = ({history, signUp}) => {
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

    const responseGoogle = async (response) => {

        let newUser = {
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            profilePic: response.profileObj.imageUrl,
            country: "Argentina",
            google: true,
        }
        try {
            await signUp(newUser);
        } catch (error) {
            alert(error);
        }
    }

    const submitUser = async () => {
        if ( handleValidation() ) {
            try {
                await signUp(newUser);
            } catch(error) {
                if(Array.isArray(error)){
                    let errors = {};
                    error.forEach(err => {
                        errors[err.path[0]] = err.message;
                    });
                    setErrorsValidation(errors);
                } else {
                    alert(error);
                }
            }
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