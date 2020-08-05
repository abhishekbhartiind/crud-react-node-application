const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      config = require('./config/config'),
      api = require('./api/api'),
      logger = require('./utils/logger');
  
//Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(
    () => logger.log('MongoDB Connected Successfully with ' + config.env),
    err => logger.error('MongoDB Connection Failed. \n' + console.log(err))
);

mongoose.set('useCreateIndex', true);
// removes deprecationWarning

//Middleware
require('./middleware/appMiddleware')(app)

app.use((req, res, next) => {
  //console.log("req",req.files);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      res.status(200).json({});
  }
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/../docs/index.html');
});

//Main API
app.use('/api', api);

app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).send(err.stack)
    return
  }

  logger.error(err.stack)
  res.status(500).send('Oops server error')
})

module.exports = app