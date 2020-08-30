/* conexión bd*/
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI
: 'mongodb://localhost/clickit';

mongoose.connect(URI,{
 useNewUrlParser:true, /* opciones de mongoose para que se pueda conectar */
 useCreateIndex:true,
 useUnifiedTopology:true
});

const connection = mongoose.connection
connection.once('open', () =>{
    console.log('DB is connected');
});