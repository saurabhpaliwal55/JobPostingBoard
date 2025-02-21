import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const companyDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  employeeSize: {
    type: Number,
    required: true,
  },
});

companyDetailsSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      companyName: this.companyName,
      companyEmail: this.companyEmail,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
export const companyDetail = mongoose.model(
  "companyDetail",
  companyDetailsSchema
);
