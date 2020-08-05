const router = require('express').Router();

router.use('/user', require('./user/userRoutes'))
router.use('/todo',require('./todos/todoRoutes'))

module.exports = router;
