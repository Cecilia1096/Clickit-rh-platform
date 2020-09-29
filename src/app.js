/* in the app file we are only defining the server */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


//Settings
app.set('port',process.env.PORT || 5000);

// Middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

//set up routes

app.use("/",require("./routes/user"));



module.exports = app; /* exportando app */


