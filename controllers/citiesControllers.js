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
];

const citiesControllers = {
    getCitiesList: (req, res) => {
        res.json({ response: cities})
    },

    getCityByID: (req, res) =>{
        const city = cities.find( (cty) => cty.id === parseInt(req.params.id));
        res.json({ response: city});
    },
};

module.exports = citiesControllers;