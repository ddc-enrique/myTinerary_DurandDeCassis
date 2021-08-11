const express = require("express");
const cors = require("cors");
//require("dotenv").config()

const app = express();

app.use(cors()); //Middleware

const items = [
    [
        { id: 1, name: "Corrientes", country: "Argentina", src: "corrientes" },
        { id: 2, name: "London", country: "England", src: "london" },
        { id: 3, name: "Rome", country: "Italy", src: "rome" },
        { id: 4, name: "Warsaw", country: "Poland", src: "warsaw" },
    ],
    [
        { id: 5, name: "New York", country: "United States", src: "newYork" },
        { id: 6, name: "Amsterdam", country: "Netherlands", src: "amsterdam" },
        { id: 7, name: "Hong Kong", country: "China", src: "hongKong" },
        { id: 8, name: "Barcelona", country: "Spain", src: "barcelona" },
    ],
    [
        { id: 9, name: "Paris", country: "France", src: "paris" },
        { id: 10, name: "Buenos Aires", country: "Argentina", src: "buenosAires" },
        { id: 11, name: "Sydney", country: "Australia", src: "sydney" },
        { id: 12, name: "Saint Petersburg", country: "Rusia", src: "stPetersburg" },
    ]
];
const cities = [
    { id: 1, name: "Corrientes", country: "Argentina", src: "corrientes", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 2, name: "London", country: "England", src: "london", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 3, name: "Rome", country: "Italy", src: "rome", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 4, name: "Warsaw", country: "Poland", src: "warsaw", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 5, name: "New York", country: "United States", src: "newYork", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 6, name: "Amsterdam", country: "Netherlands", src: "amsterdam", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 7, name: "Hong Kong", country: "China", src: "hongKong", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 8, name: "Barcelona", country: "Spain", src: "barcelona", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 9, name: "Paris", country: "France", src: "paris", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 10, name: "Buenos Aires", country: "Argentina", src: "buenosAires", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 11, name: "Sydney", country: "Australia", src: "sydney", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
    { id: 12, name: "Saint Petersburg", country: "Rusia", src: "stPetersburg", 
        transportHubs: { airports: [], ferryports: [], busStations: [], trainStations: [] } 
    },
]

app.get("/api/cities", (req, res) => {
    res.json({ response: cities })
})

app.get("/api/carousel", (req, res) => {
    res.json({ response: items })
})

app.listen(4000, () => console.log("Hello, the server is listening on port 4000"));