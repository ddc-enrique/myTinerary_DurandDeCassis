const User = require("../models/User");
const bcryptjs = require('bcryptjs');

const usersControllers = {

    createUser: (req, res) => {
        const {firstName, lastName, email, password, profilePic, country} = req.body;
        let hashedPassword = bcryptjs.hashSync(password);
        const newUser = new User ({ firstName, lastName, email, password: hashedPassword, profilePic, country });
        User.findOne({ email: email }).then(
            (user) => { 
                if(user) {
                    throw new Error("User with that email already exist");
                } else {
                    newUser.save().then( (savedUser) => res.json({ success: true, response: savedUser, err:null }))
                }
            }
        )
        .catch( (error) => res.json({ success: false, response: null, err: error}))
    },

    checkUser: (req, res) => {
        let errorMessage = "Wrong email or password";
        const {email, password} = req.body;
        User.findOne({ email: email })
            .then((userFound) => {
                if (!userFound) {
                    throw new Error(errorMessage);
                } else {
                    let comparePasswords = bcryptjs.compareSync(password, userFound.password);
                    if (!comparePasswords) throw new Error(errorMessage);
                    res.json({ success: true, response: userFound});
                }
            })
            .catch((error) => {
                res.json({ success: false, response: null, err: error });
            });
    },

};

module.exports = usersControllers;