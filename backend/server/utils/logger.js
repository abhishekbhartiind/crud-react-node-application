require('colors')
const _ = require('lodash')
const config = require('../config/config')

const noop = function(){}
const consoleLog = config.logging ? console.log.bind(console) : noop

let logger = {
  log: function(){
    let tag = '[ ✨ LOG ✨ ]'.green
    let args = _.toArray(arguments)
      .map(function(arg){
        if(typeof arg === 'object'){
          let string = JSON.stringify(arg, null, 2)
          return tag + '  ' + string.cyan;
        } else if(arg !== undefined) {
          return tag + '  ' + arg.cyan
        } else {
          return tag + arg
        }
      })
    consoleLog.apply(console, args)
  },
  debug: function(){},
  error: function(){
    let args = _.toArray(arguments)
      .map(function(arg){
        arg = arg.stack || arg
        let name = arg.name || '[ ❌ ERROR ❌ ]'
        let log = name.yellow + '  ' + arg.red
        return log;
      })
    consoleLog.apply(console, args)
  }
}

module.exports = logger;