const todoService = require('./todoService');

module.exports = {
    addTodo : async(req,res,next) => {
        if (!req.is('application/json')) 
            next(new Error("Invalid Content-Type header (expected 'application/json')"))
        if (!req.userData) 
            next(new Error("User not authenticated"))
        let obj = req.userData;
        todoService.createTodo({
            ...req.body,
            createdBy: obj.userId
        }).then(data => {
            res.status(200).json(data)
        }).catch(err =>next(err))
    },
    getTodoLists: async(req, res, next) => {
        if (!req.userData) 
            next(new Error("User not authenticated"))
        todoService.getAllTodo({})
        .then(data => {
            res.status(200).json(data)
        }).catch(err => next(err))
    },
    deleteTodo: async(req, res, next) => {
        if (!req.userData) 
            next(new Error("User not authenticated"))
        let id = req.params.id;
        todoService.deleteTodo(id)
        .then(() => {
            res.status(200).json({ message: "Deleted Successfully"})
        })
        .catch(err => next(err))
                
    },
    updateTodo: async(req, res, next) => {
        if (!req.userData) 
            next(new Error("User not authenticated"))
        let id = req.params.id;
        
        todoService.updateTodo({_id: id, updatedData:req.body})
        .then(data => {
            res.status(200).json(data)
        }).catch(err => next(err))
    }
}