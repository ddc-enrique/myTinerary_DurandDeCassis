import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import usersActions from "../redux/actions/usersActions";

const SignIn = ({history, signIn}) => {
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
    
    const submitUser = async() => {
        if (handleValidation()) {
            try {
                await signIn(checkUser);
            } catch(error) {
                console.log(error);
                alert(error);
            }
        }
    }

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
                        <button onClick={submitUser}> SIGN-IN </button>
                        <div>
                            <hr /> OR <hr />
                        </div>
                        <button> SIGN-IN with Google</button>
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