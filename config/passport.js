const passport = require("passport");
const jwtStategy = require('passport-jwt').Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

module.exports = passport.use(new jwtStategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY
}, (payload, done) => {
    User.findOne({ _id: payload._doc._id })
        .then(userFound => {
            if (userFound) {
                return done(null, userFound)
            } else {
                return done(null, false)
            }
        })
        .catch(error => { 
            return done(error, false)
        });
}))