const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils/handleMongooseError");

const emailRegexp =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
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
  { versionKey: false, timestamp: true }
);

userSchema.post("save", function (error, doc, next) {
  handleMongooseError(error, next);
});
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": `missing required field email`,
    "any.required": `"email" is a required field`,
  }),
});

const registerLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(30),
});

const schemas = {
  registerLoginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
