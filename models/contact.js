const { Schema, model } = require('mongoose');
const Joi = require('joi');

// const { ObjectId } = require('mongodb');

const contactSchemaMongoose = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
      },
    { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({ 'any.required': 'missing required name field'}),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required().messages({ 'any.required': 'missing required email field'}),
    phone: Joi.string()
      .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
        .required().messages({ 'any.required': 'missing required phone field' }),
        favorite: Joi.boolean(),
  });


const favoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemasJoi = {
    add: addContactSchema,
    favoriteSchema: favoriteSchema,
};

const Contact = model('contact', contactSchemaMongoose);

module.exports = {
    Contact,
    schemasJoi,
};