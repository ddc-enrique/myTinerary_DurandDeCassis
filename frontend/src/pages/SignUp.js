import React, { useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import axios from 'axios';
import PreLoader from '../components/PreLoader';



const SignUp = ({history}) => {
    
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
    let countries = ["Argentina", "Brazil", "Cameroon", "Chile", "Denmark", "Paraguay", "Russia", "Uruguay"];
    useEffect(() => {
        const getCountries = async() => {
            let response = await axios.get("https://restcountries.eu/rest/v2/all?fields=name");
            countries = response.data;
        };
        // getCountries();
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
                errors["password"] = "Please enter a password with at least 5 charachters";
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

    const submitUser = async () => {
        if ( handleValidation() ) {
            try {
                let data = JSON.stringify( newUser );
                let response = await axios.post("http://localhost:4000/api/user/signup", data, {headers:{"Content-Type" : "application/json"}});
                if(response.data.success){
                    alert("Account created successfully!");
                    console.log(response.data);
                    setTimeout(() => {
                        history.push("/");
                    }, 1000);
                } else {
                    throw new Error(response.data.error.message);
                }
            } catch(error) {
                    alert(error);
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
                            countries.map((country, index) => (
                                <option value={country} key={index}>{country}</option>
                            ))
                        }
                    </select>
                    <p className="error">&nbsp;{errorsValidation["country"]}</p>
                    <div className="sign">
                        <button onClick={submitUser}> SIGN-UP </button>
                        <div>
                            <hr /> OR <hr />
                        </div>
                        <button> SIGN-UP with Google</button>
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

export default SignUp