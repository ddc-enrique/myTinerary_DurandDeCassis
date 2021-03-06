import { Link } from "react-router-dom";

const ConnectionError = ({error, showButton}) => {
    return (
        <div id="connectionError">
            <h3>{error.message}</h3>
            <img src={require("../assets/errorB.png").default} alt="Error Logo MyTinerary" />
            {showButton 
            ? <Link to="/">
                <button>
                    <img src={require("../assets/SecondDesign2.png").default} alt="Logo MyTinerary" />
                    Go back to Home
                </button>
            </Link> 
            : null }
        </div>
    )
};
export default ConnectionError