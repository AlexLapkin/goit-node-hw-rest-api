const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      // unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// register
const registerSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

// log in
const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
