import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {PersonCheck, PersonPlus} from "react-bootstrap-icons";
const Header = () => {
    const [displaySign, setDisplaySign] = useState(false);
    const displayMenuSign = () => {
        setDisplaySign(!displaySign);
    }
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggle = () => setDropdownOpen(prevState => !prevState);
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
                {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} id="dropdown">
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={dropdownOpen}
                        id="dropdownToggle"
                    >
                        <img
                            src={require("../assets/sign_IN_UP.png").default}
                            alt="menuSign"
                        />
                    </DropdownToggle>
                    <DropdownMenu id="dropdownMenu">
                        <div className="signIconText">
                            <PersonCheck></PersonCheck><p> SIGN-IN</p>
                        </div>
                        <div className="signIconText">
                            <PersonPlus></PersonPlus><p> SIGN-UP</p>
                        </div>
                    </DropdownMenu>
                </Dropdown> */}
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

// #dropdown {
//     position: relative !important;
//     margin-right: 1px;
//   }
  
//   #dropdownToggle {
//     width: 100%;
//   }
  
//   #dropdownToggle img {
//     height: 13vh;
//   }
  
//   #dropdownMenu {
//     width: 100%;
//     position: absolute !important;
//     /* top: 100% !important; */
//     background-color: #3A3A5A;
//   }
  
//   /* #displaySign nav {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: #3A3A5A;
//   } */
  
//   .signIconText {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border: 1px solid whitesmoke;
//     color: whitesmoke;
//   }
  
//   /* .signIconText p {
//     display: inline-block;
//     margin-left: 10px;
//     margin-top: 10px;
//   } */