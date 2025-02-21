import mongoose, { Schema } from "mongoose";

const interviewSchema = new Schema({
    companyId:{
        type:Schema.Types.ObjectId,
        ref:"companyDetail"
    },
    jobTitle:String,
    jobDescription:String,
    experienceLevel:String,
    candidates:[String],
    endDate:Date,
})

export const interview = mongoose.model("interview",interviewSchema);