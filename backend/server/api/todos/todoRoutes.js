const router = require('express').Router(),
    controller = require('./todoController');

const checkAuth = require("../../middleware/check-auth");

router.route('').post(checkAuth, controller.addTodo);
router.route('').get(checkAuth, controller.getTodoLists);

router.route('/:id')
    .delete(checkAuth, controller.deleteTodo)
    .put(checkAuth,controller.updateTodo)

module.exports = router;