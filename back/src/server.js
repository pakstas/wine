const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const routes = require("./router");

const port = process.env.SERVER_PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/", routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
