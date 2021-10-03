const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/index");
require("dotenv").config();
require('./config/database');
require("./config/passport");
const path = require('path')

const app = express();

//Middleware  
app.use(cors()); 
app.use(express.json());

app.use("/api", router)
if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
}

app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0' , () => console.log("Hello, the server is listening on port 4000"));