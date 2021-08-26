import React, { useState } from "react";
import {PersonCheck, PersonPlus, PersonX} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";


const MenuSign = ({token, user, signOut}) => {
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
                    style={token && {backgroundImage: `url(/assets/${user.profilePic}.jpg)`, display: "block"}}
                    className="userProfilePic"
                >

                </div>
            </div>
            <div
                style={{display: displaySign ? "block" : "none"}}
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
                            <Link className="sign" onClick={() => signOut()} to="/">
                                <div className="sign signIconText">
                                    <PersonX></PersonX> <p className="sign"> SIGN-OUT</p>
                                </div>
                            </Link>
                        </nav>
                    }
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
        user: state.users.user,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSign);