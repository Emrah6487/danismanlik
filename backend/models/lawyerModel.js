const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const lawyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    barNo: { type: Number, unique: true },
    branch: { type: String, required: true },
    password: { type: String, required: true },
    memberAg: { type: Boolean, required: true },
    infoText: { type: Boolean, required: true },
    perData: { type: Boolean, required: true },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

const validate = (data) => {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(10).required(),
    surname: joi.string().trim().min(3).max(10).required(),
    email: joi.string().email().trim().min(5).max(30).required(),
    phone: joi.string().trim().min(13).max(20).required(),
    barNo: joi.number().required(),
    branch: joi.string().required(),
    memberAg: joi.boolean().required(),
    infoText: joi.boolean().required(),
    perData: joi.boolean().required(),
    password: passwordComplexity(),
  });
  return schema.validate(data);
};

module.exports = { Lawyer, validate };
