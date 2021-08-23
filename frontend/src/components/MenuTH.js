import React, { useEffect, useRef } from 'react'

const MenuTH = ({city, displayMaps, showTH, setShowTH}) => {
    const menuTransportHub = useRef({});
    useEffect(() => {        
        window.addEventListener("scroll", () => changeHeight());
        return () => {
            window.removeEventListener("scroll", () => changeHeight());
        }
    }, [])

    const changeHeight = () => {
        let menu = menuTransportHub.current;
        if (menu){
            if ((Object.entries(menu).length > 0) && window.pageYOffset<(window.innerHeight*0.17)) {
                menu.style.height = `${window.innerHeight-(window.innerHeight*0.17-window.pageYOffset)}px`;
                menu.style.bottom = "0px";
            }
        }
    }

    const showList = (e) => {
        console.log(e.target.className === "transportHub");
        if (e.target.className === "transportHub") {
            let list = e.target.children[0];
            list.style.display = "block";
            if (list.firstChild.children.length === 0) {
                list.innerHTML = "<p>This city doesn't have a Transport Hub of this type</p>";
                list.style.textDecoration = "none";
                list.style.cursor = "auto";
            }
        }
        changeHeight();
    }

    const unShowList = (e) => {
        console.log(e.target.className === "trasnportHub");
        if (e.target.className === "transportHub") {
            e.target.children[0].style.display= "none";
        }
    }

    return (
        <aside className="tranportHubs">
            <div
                className="containerTranportHubs"
                style={{ display: showTH ? "flex" : "none", }}
                ref={menuTransportHub}
            >
                {
                    Object.keys(city.transportHubs).map((transportHub, index) => (
                        <div
                            style={{ backgroundImage: `url(${require(`../assets/${transportHub}.png`).default})` }}
                            alt={`${transportHub} logo`}
                            onClick={(event) => showList(event)}
                            tabIndex={1}
                            onBlur={(event) => unShowList(event)}
                            className="transportHub"
                            key={index}
                        >
                            <div>
                                <ul>
                                {city.transportHubs[transportHub].map(eachHub => {
                                let { _id, name, maps } = eachHub;
                                    return (
                                        <li
                                            className="maps"
                                            key={_id}
                                            onClick={() => displayMaps(maps)}
                                        >
                                            {name}
                                        </li>
                                    )
                                })}
                                </ul>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div
                className="displayTransportHubs"
                onClick={() => setShowTH(!showTH)}
                style={{ left: showTH ? "150px" : "0px" }}
            >
                <p>{showTH ? "<" : ">"}</p>
            </div>
        </aside>
    )
}

export default MenuTH
