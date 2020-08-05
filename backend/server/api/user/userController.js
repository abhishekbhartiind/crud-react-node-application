const UserService = require('./userService');

module.exports = {
    create: async(req, res, next) => {
        if (!req.is('application/json')) 
            next(new Error("Invalid Content-Type header (expected 'application/json')"))
        let obj = req.body;
        UserService.create(obj).then(() => {
            UserService.login({
                "email":req.body.email,
                "password":req.body.password
            }).then(data =>{
                res.status(200).json(data)
            })
        }).catch(err => next(err))
    },
    login: async(req,res,next) => {
        if (!req.is('application/json')) 
            next(new Error("Invalid Content-Type header (expected 'application/json')"))
        let obj = req.body;
        UserService.login(obj)
        .then(data => {
            res.status(200).json(data)
        }).catch(err => next(err))
    }
}