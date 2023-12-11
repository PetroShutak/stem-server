const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    image: {
      type: String,
    },
    raiting: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    country: {
      type: String,
      
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  image: Joi.string().required(),
  raiting: Joi.number().required(),
  country: Joi.string(),
});

const schemas = { addSchema };

const Product = model("product", productSchema);

module.exports = { Product, schemas };
