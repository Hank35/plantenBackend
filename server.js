//import required dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var mongodb = require('./config/mongo_connector');
const routes = require('./routes/routes');
var defS = require('./config/default_data');

app.use(cors());

app.use(bodyParser.json());
routes(app);

var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
      mongodb.createDevConnection();
      break;
    case 'prod':
      mongodb.createProdConnection();
      break;
    case 'test':
      mongodb.createTestConnection();
      break;
}

app.listen(process.env.PORT || 3000, () => {
    console.log('App is ready for requests.')
  })
  .on('error', (error) => {
    console.warn('Warning', error.toString());
});

defS.addDefaultClimate();


module.exports = app;