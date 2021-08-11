import React, { useState } from "react";
import {PersonCheck, PersonPlus} from "react-bootstrap-icons";


const MenuSign = () => {
    const [displaySign, setDisplaySign] = useState(false);
    const displayMenuSign = () => {
        setDisplaySign(!displaySign);
    };
    const handleBlur = () => {
        setDisplaySign(false);
    }
    return(
        <div id="menuSign"> 
            <div id="logoMenuSign">
                <img
                    src={require("../assets/sign_IN_UP3.png").default}
                    alt="menuSign"
                    onClick={displayMenuSign}
                    tabIndex= "0"
                    onBlur={handleBlur}
                />
            </div>
            <div
                id="displaySign"
                style={{ display: displaySign ? "block" : "none"}}
            >
                <nav>
                    <div className="signIconText">
                        <PersonCheck></PersonCheck><p> SIGN-IN</p>
                    </div>
                    <div className="signIconText">
                        <PersonPlus></PersonPlus><p> SIGN-UP</p>
                    </div>
                </nav>
            </div>
        </div>
    )    
};

export default MenuSign;