const morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    override = require('method-override');

module.exports = app => {
    app.use(morgan('dev'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors())
    app.use(override())
}