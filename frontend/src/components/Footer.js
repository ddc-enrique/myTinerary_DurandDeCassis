import React from "react";
import { Instagram, Facebook, Twitter } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


export default class Footer extends React.Component {

    render(){
        return(
            <footer>
                <nav>
                    <Link to="/">
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
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <Instagram  width="1.5em" height="1.5em"/>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                        <Twitter width="1.5em" height="1.5em"/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <Facebook width="1.5em" height="1.5em"/>
                    </a>
                </div>
            </footer>
        )
    }
}