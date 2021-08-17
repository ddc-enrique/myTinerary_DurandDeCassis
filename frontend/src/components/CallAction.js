import React from "react";
import Aos from 'aos';
import { Link } from "react-router-dom";

export default class CallAction extends React.Component{
    componentDidMount(){
        Aos.init({ duration: 500 });
    };

    render(){
        return(
            <div data-aos="flip-up" className="callAction">
                <h4>Are you searching for a new adventure, but still don´t know where ?</h4>
                <Link to="/cities"><button>Choose from HERE!</button></Link>
            </div>
        )
    }
}