const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

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
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

// register
const registerSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

// log in
const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
  resendVerifyEmail: emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
