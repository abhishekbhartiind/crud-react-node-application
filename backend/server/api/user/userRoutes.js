const router = require('express').Router(),
    controller = require('./userController');

router.route('/register')
    .post(controller.create)

router.route('/login')
    .post(controller.login)

module.exports = router