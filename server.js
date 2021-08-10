const express = require("express");
const cors = require("cors");
//require("dotenv").config()

const app = express();

app.listen(4000, () => console.log("Hi Server is listening on port 4000"));