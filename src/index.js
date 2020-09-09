/* the index file will allow us to initialize our server */
require('dotenv').config(); // to use env variables
//Initiliazations
const app = require('./app');
require('./database');


async function main(){
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}
main();

