const Todo = require('./todoModel');

module.exports = {
    createTodo : todoData => {
        return new Promise((resolve, reject) => {
            let newTodoData = new Todo(todoData);

            newTodoData.save()
            .then(newNote => {
                resolve(newNote)
            })
            .catch(err => reject(err))
        })
    },
    getAllTodo : () => {
        return new Promise((resolve, reject) => {
            Todo.find({})
                .then(todo => resolve(todo))
                .catch(err => reject(err))
        });
    },
    deleteTodo: id => {
        return new Promise((resolve, reject) => {
            Todo.deleteOne({_id: id})
                .then(() => resolve())
                .catch(err => reject(err))
        });
    },
    updateTodo: (todoData) => {
        return new Promise((resolve, reject) => {
            Todo.findOneAndUpdate({_id : todoData._id},{$set: todoData.updatedData},{new: true})
                .then(todo => resolve(todo))
                .catch(err => reject(err));
        });
    }
}