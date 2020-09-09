/* conexión bd*/
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI ? 
process.env.MONGO_URI
: process.env.MONGODB_URI

mongoose.connect(URI,{
 dbName:'clickit',
 useNewUrlParser:true, /* opciones de mongoose para que se pueda conectar */
 useCreateIndex:true,
 useUnifiedTopology:true,
 useFindAndModify: false
}).then(() =>{
    console.log('DB is connected');

}).catch((err) => console.log("Error connecting to the database."));

