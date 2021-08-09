import React from "react";
import { NavLink } from "react-router-dom";
import MenuSign from "./MenuSign";

const Header = () => {
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
                <MenuSign />
            </header>
    )
};

export default Header;