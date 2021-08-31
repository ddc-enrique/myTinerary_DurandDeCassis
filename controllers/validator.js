const joi = require("joi");

const validator = (req, res, next) => {
    const schema = !req.body.google 
        ? joi.object({
            firstName: joi.string().trim().min(2).max(15).required().pattern(/^[a-zA-Z\s]+$/).messages({
                "string.empty": "The field First Name is required",
                "string.min": "Please enter a name with at least 2 letters",
                "string.max": "Invalidate field, please enter less than 15 letters",
                "string.pattern.base": "Please enter only letters, you can include whitespaces",
            }),
            lastName: joi.string().trim().min(2).max(25).required().pattern(/^[a-zA-Z\s]+$/).messages({
                "string.empty": "The field Last Name is required",
                "string.min": "Please enter a last name with at least 2 letters",
                "string.max": "Invalidate field, please enter less than 25 characters",
                "string.pattern.base": "Please enter only letters, you can include whitespaces",
            }),
            email: joi.string().trim().required().email().messages({
                "string.empty": "The field email is required",
                "string.email": "Invalidate email format, please use the pattern name@email.com",
            }),
            password: joi.string().trim().required().min(5).max(20).messages({
                "string.empty": "The field password is required",
                "string.min": "The password is too short, please enter at least 5 characters",
                "string.max": "The password is too long, please enter less than 20 characters",
            }),
            profilePic: joi.string().trim().required().messages({
                "string.empty": "This field is required, it doesnt matter if you are ugly",
            }),
            country: joi.string(),
        })  
        : joi.object({
            firstName: joi.string(),
            lastName: joi.string(),
            email: joi.string(),
            password: joi.string(),
            profilePic: joi.string(),
            country: joi.string(),
            google: joi.boolean(),
        });

    const validation = schema.validate(req.body, { abortEarly: false });

    if (!validation.error) {
        next();
    } else {
        console.log(validation.error.details);
        res.json( {success: false, errors: validation.error.details} );
    }

};

module.exports = validator;