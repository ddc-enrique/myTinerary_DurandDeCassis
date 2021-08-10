import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Search  } from "react-bootstrap-icons";


const Cities = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[]);

    return (
        <div className="containerCities">
            <Header />
            <div className="imageHero">
                <h1>Cities</h1>
                <div>
                    <input
                        type="text"
                        name="cities"
                        placeholder="Are you looking for a specific City ?"
                        // value={}
                        // onChange={inputHandler}
                    />
                    <button >
                        {/* onClick={searchCity} */}
                        Search <Search />
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
};
export default Cities;