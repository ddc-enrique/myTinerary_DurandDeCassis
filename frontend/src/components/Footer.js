import React from "react";
import { Instagram, Facebook, Twitter } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


export default class Footer extends React.Component {

    render(){
        return(
            <footer>
                <nav>
                    <Link exact to="/">
                        <p>HOME</p>
                    </Link>
                    <Link to="/cities">
                        <p>CITIES</p>
                    </Link>
                </nav>
                <div
                    className="logoFooter"
                    style={{backgroundImage: `url(${require("../assets/thirdDesign.png").default})`}}
                ></div>
                <div>
                    <Link to="https://www.instagram.com/"><Instagram  width="1.5em" height="1.5em"/></Link>
                    <Link to="https://www.twitter.com/"><Twitter width="1.5em" height="1.5em"/></Link>
                    <Link to="https://www.facebook.com/"><Facebook width="1.5em" height="1.5em"/></Link>
                </div>
            </footer>
        )
    }
}