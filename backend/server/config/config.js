const _ = require('lodash')

const config = {
  dev: 'development',
  prod: 'production',
  port: process.env.PORT || 4000,
  expireTime: 60 * 24 * 60 * 7, // 7 days in seconds
  secretOrKey: 'secretKey',
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;

try{
  envConfig = require('./' + config.env)
} catch(e) {
  envConfig = {}
}

module.exports = _.merge(config, envConfig)