/* in the app file we are only defining the server */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const auth = require('./middlewares/auth');
const app = express();


//Settings
app.set('port',process.env.PORT || 3000);
app.all('/api/*', auth);

// Middlewares



//Routes
app.use('/api/auth', require('./routes/auth'));




module.exports = app; /* exportando app */


