import React, { useState } from "react";
import {PersonCheck, PersonPlus, PersonX} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";


const MenuSign = ({token, profilePic, signOut}) => {
    const [displaySign, setDisplaySign] = useState(false);

    return(
        <div 
            id="menuSign" 
            onClick={() => setDisplaySign(!displaySign)}
            tabIndex= "0"
        > 
            <div id="logoMenuSign">
                <img
                    src={require("../assets/sign_IN_UP3.png").default}
                    alt="menuSign"
                />
                <div
                    style={token && {backgroundImage: `url(${profilePic})`, display: "block"}}
                    className="userProfilePic"
                >
                </div>
            </div>
            <div
                style={{display: displaySign ? "block" : "none", height: window.document.body.offsetHeight - (window.innerHeight*0.17)}}
                onClick={() => setDisplaySign(!displaySign)}
                className="divToCloseMenuSign"
            >
            </div>
            <div
                id="displaySign"
                style={{ display: displaySign ? "block" : "none"}}
            >
                    {
                        !token
                        ?   
                        <nav>
                            <Link className="sign" to="/signin">
                                <div className="sign signIconText">
                                    <PersonCheck></PersonCheck><p className="sign"> SIGN-IN</p>
                                </div>
                            </Link>
                            <Link className="sign" to="/signup">
                                <div className="sign signIconText">
                                    <PersonPlus></PersonPlus><p className="sign"> SIGN-UP</p>
                                </div>
                            </Link>
                        </nav>
                        :
                        <nav>
                            <span className="sign" onClick={() => signOut()} >
                                <div className="sign signIconText">
                                    <PersonX></PersonX> <p className="sign"> SIGN-OUT</p>
                                </div>
                            </span>
                        </nav>
                    }
                    <div
                        className="divDownDisplaySign" 
                        onClick={() => setDisplaySign(!displaySign)}
                        style={{ display: displaySign ? "block" : "none", height: window.document.body.offsetHeight - (window.innerHeight*0.30)}}    
                    >
                    </div>
            </div>
        </div>
    )    
};


const mapDispatchToProps = {
    signOut: usersActions.signOut,
};

const mapStateToProps = (state) => {
    return{
        token: state.users.token,
        profilePic: state.users.profilePic,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSign);