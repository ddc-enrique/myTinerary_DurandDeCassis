import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {PersonCheck, PersonPlus} from "react-bootstrap-icons";
const Header = () => {
    const [displaySign, setDisplaySign] = useState(false);
    const displayMenuSign = () => {
        setDisplaySign(!displaySign);
    };
    const handleBlur = () => {
        setDisplaySign(false);
    }
    return (
            <header>
                <nav>
                    <NavLink exact to="/">
                        <img src={require("../assets/SecondDesign.png").default} alt="logo" />
                        <p>HOME</p>
                    </NavLink>
                    <NavLink to="/cities">
                        <img src={require("../assets/cities.png").default} alt="buildings" />
                        <p>CITIES</p>
                    </NavLink>
                </nav>
                <div id="fatherMenuSign"> 
                    <div id="logoMenuSign">
                        <img
                            src={require("../assets/sign_IN_UP.png").default}
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
            </header>
    )
};

export default Header;