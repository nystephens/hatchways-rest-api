const express = require("express");
const axios = require("axios");
const router = express.Router();
const bodyParser = require('body-parser');

// here is where we set up our express server connection to the local port
const app = express();
const port = process.env.PORT || 3001

// use body parser to parse the json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.get("/test", (req, res, next) => {
    console.log("'/test' call");
    axios.get("https://api.neoscan.io/api/main_net/v1/get_all_nodes")
      .then(data => res.json(data))
      .catch(err => next(err));
  });
  
module.exports = router;