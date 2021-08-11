import { Link } from "react-router-dom";

const CitiesList = ({cities}) => {
    return (
        cities.map(city => (
            <Link to={`/city/${city.id}`} key={city.id}>
                <div
                    className="imageCity"
                    style={{ backgroundImage: `url(${require(`../assets/${city.src}_carousel.jpeg`).default})` }}
                >
                    <div className="cityData">
                        <h5>City: {city.name}</h5>
                        <h5>Country: {city.country}</h5>
                    </div>
                </div>
            </Link>
        ))
    )
};

export default CitiesList;