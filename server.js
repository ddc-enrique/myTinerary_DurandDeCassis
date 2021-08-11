const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
//require("dotenv").config()

const app = express();

//Middleware
app.use(cors()); 
app.use(express.json());

// app.get("/api/cities", (req, res) => {
//     res.json({ response: cities })
// })

// app.get("/api/carousel", (req, res) => {
//     res.json({ response: items })
// })

// app.get("/api/city/:id", (req, res) => {
//     const city = cities.find( (cty) => cty.id === parseInt(req.params.id));
//     res.json({response: city});
// })

app.use("/api", router)

app.listen(4000, () => console.log("Hello, the server is listening on port 4000"));