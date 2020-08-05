const User = require('./userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { emptyCheck } = require("../../utils")

module.exports = {
    create: (userObject) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(userObject.password, 10)
                .then(hash => {
                    const newUser = new User({
                        ...userObject,
                        password: hash,
                        createdOn: Date.now(),
                        updatedOn: Date.now()
                    });
                    newUser.save()
                        .then(user => resolve(user))
                        .catch(err => reject(err))
                })
        })
    },
    login: (userObject) => {
        return new Promise((resolve, reject) => {
            let { email, password } = userObject
            let fetchedUser;
            if(emptyCheck(email) && emptyCheck(password)){
                User.findOne({ email: email })
                .then(user => {
                    if(emptyCheck(user) && Object.values(user).length > 0){
                        fetchedUser = user;
                        return bcrypt.compare(password, user.password);
                    } else {
                        reject({
                            name:"UnauthorizedError",
                            stack:"user not found"
                        })
                    }
                })
                .then(result => {
                    if (!result) {
                        reject({
                            name:"UnauthorizedError",
                            stack:"Invalid credentials"
                        })
                    }
                    if(emptyCheck(fetchedUser)){
                        const token = jwt.sign(
                            { 
                                name: fetchedUser.name, 
                                email: fetchedUser.email, 
                                userId: fetchedUser._id,
                            }, "secret_this_should_be_longer", 
                            { expiresIn: "1d" }
                        );
                        
                        const userData ={
                            token:token,
                            userId:fetchedUser._id,
                            name:fetchedUser.name,
                            email:fetchedUser.email,
                            mobile:fetchedUser.mobile
                        }
                        resolve(userData)
                    }
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                });
            } else reject("Username or Password is empty")
        })
    }
}