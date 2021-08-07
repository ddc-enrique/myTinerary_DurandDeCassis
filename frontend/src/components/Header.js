import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuSign from "./MenuSign";

const Header = () => {
    const [displaySign, setDisplaySign] = useState(false);
    const displayMenuSign = () => {
        setDisplaySign(!displaySign);
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
                    />
                </div>
                <div
                    id="displaySign"
                    style={{ display: displaySign ? "block" : "none" }}
                >
                    <MenuSign />
                </div>
            </div>
        </header>
    )
};

export default Header;