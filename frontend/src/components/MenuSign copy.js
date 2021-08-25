import React, { useEffect, useState } from "react";
import {PersonCheck, PersonPlus} from "react-bootstrap-icons";
import { Link } from "react-router-dom";


const MenuSign = () => {
    var clickOnLink = false;
    const [displaySign, setDisplaySign] = useState(false);

    useEffect( () => {
        return( () => {
            setDisplaySign(false);
        })
    }, [])

    const displayMenuSign = (e) => {
        let tagName = e.target.tagName;
        let className;
        if(tagName==="P"||tagName==="DIV"||tagName==="svg"||tagName==="path"){
            if(tagName==="svg") className = e.target.parentNode.classList[0];
            if(tagName==="path") className = e.target.parentNode.parentNode.classList[0];
            if(tagName==="DIV") className = e.target.classList[0];
            if(tagName==="P") className = e.target.className;
        };
        if(!className==="sign") clickOnLink = true;
        if(!clickOnLink) setDisplaySign(!displaySign);
    };

    const handleBlur = () => {
        let promise = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                let closeMenuSign = !clickOnLink; 
                resolve(closeMenuSign);
            }, 100)
        } );
        promise.then( (response) => { 
            if (response) {
                setDisplaySign(false);
            }
        });
    }
    return(
        <div 
            id="menuSign" 
            onClick={displayMenuSign}
            tabIndex= "0"
            onBlur={handleBlur}
        > 
            <div id="logoMenuSign">
                <img
                    src={require("../assets/sign_IN_UP3.png").default}
                    alt="menuSign"
                />
            </div>
            <div
                id="displaySign"
                style={{ display: displaySign ? "block" : "none"}}
            >
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
            </div>
        </div>
    )    
};

export default MenuSign;