require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = process.env;
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Backend exam" });
});

require("./app/routes")(app);

// set port, listen for requests
const port = PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});