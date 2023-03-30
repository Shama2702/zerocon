const Joi = require('joi');

const signupSchema = Joi.object({
    first_name: Joi.string()
    .min(3)
    .required(),

    last_name: Joi.string()
    .min(2)
    .max(10)
    .required(),

    gender: Joi.string()
    .min(3)
    .required(),

    contact_number: Joi.string()
    .pattern(new RegExp('^[0-9]{3,30}$'))
    .min(11)
    .max(11)
    .required(),

    address: Joi.string()
    .min(6)
    .max(100)
    .required(),
    
    password: Joi.string()
    .min(6)
    .max(50)
    .required(),
})


const signinSchema = Joi.object({
    contact_number: Joi.string()
    .pattern(new RegExp('^[0-9]{3,30}$'))
    .min(11)
    .max(11)
    .required(),

    password: Joi.string()
    .min(6)
    .max(50)
    .required(),
})

module.exports = {signupSchema, signinSchema}