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
                    if(user.google) throw new Error("You already Sign Up with this Google account, now you just have to Sign In");
                    throw new Error("User with that email already exist");
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
        let errorMessage = "Wrong email and/or password";
        const {email, password, googleFlag} = req.body;
        User.findOne({ email: email })
            .then((userFound) => {
                if (!userFound) {
                    if(googleFlag) throw new Error("Please Sign Up first");
                    throw new Error(errorMessage);
                } else {
                    if (userFound.google && !googleFlag) throw new Error("You Sign Up with your Google account, please Sign In with Google");
                    let comparePasswords = bcryptjs.compareSync(password, userFound.password);
                    if (!comparePasswords) throw new Error(errorMessage);
                    const token = jwt.sign({...userFound}, process.env.SECRETORKEY);
                    res.json({ success: true, response: {token, user: userFound}});
                }
            })
            .catch((error) => {
                res.json({ success: false, response: null, err: error.message });
            });
    },

    verifyToken: (req, res) => {
        console.log(req.user);
        res.json( { user: req.user } );
    },

};

module.exports = usersControllers;