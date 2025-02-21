import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"companyDetail",
    },
    emailOtp:String,
    email:String,
    phoneOtp:String,
    phone:Number,
    expiresAt: { type: Date, required: true, default: () => Date.now() + 5 * 60 * 1000 }
})

export const Otp = mongoose.model("Otp",otpSchema);