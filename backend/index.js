const config = require('./server/config/config')
const app = require('./server/server')
const logger = require('./server/utils/logger')

app.listen(config.port, () => {
    logger.log(`In ${config.env}, listening on port ${config.port}`)
})
