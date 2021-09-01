const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const usersControllers = {

    createUser: (req, res) => {
        const {firstName, lastName, email, password, profilePic, country, google} = req.body;
        let hashedPassword = bcryptjs.hashSync(password);
        const newUser = new User ({ firstName, lastName, email, password: hashedPassword, profilePic, country, google });
        User.findOne({ email: email }).then(
            (user) => { 
                if(user) {
                    if(user.google) throw new Error("1");
                    throw new Error("2");
                } else {
                    newUser.save().then( (savedUser) => {
                            const token = jwt.sign({...savedUser}, process.env.SECRETORKEY);
                            res.json({ success: true, response: {token, user: savedUser}, err:null })
                    })
                }
            }
        )
        .catch( (error) => res.json({ success: false, response: null, err: error.message}))
    },

    checkUser: (req, res) => {
        const {email, password, googleFlag} = req.body;
        User.findOne({ email: email })
            .then((userFound) => {
                if (!userFound) {
                    if(googleFlag) throw new Error("1");
                    throw new Error("3");
                } else {
                    if (userFound.google && !googleFlag) throw new Error("2");
                    let comparePasswords = bcryptjs.compareSync(password, userFound.password);
                    if (!comparePasswords) throw new Error("3");
                    const token = jwt.sign({...userFound}, process.env.SECRETORKEY);
                    res.json({ success: true, response: {token, user: userFound}});
                }
            })
            .catch((error) => {
                res.json({ success: false, response: null, err: error.message });
            });
    },

    verifyToken: (req, res) => {
        res.json( { user: req.user } );
    },

};

module.exports = usersControllers;