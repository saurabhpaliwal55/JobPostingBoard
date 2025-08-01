import { asyncHandler } from "../utils/asyncHandler.js";
import {interview} from "../models/interview.model.js";
import { companyDetail } from "../models/companyDetails.model.js";
import { generateJobDescription } from "../utils/gooleGenerative.js";
import { sendEmails } from "../utils/sendEmail.js";

const createInterview = asyncHandler(async(req,res)=>{
    const {jobTitle,jobDescription,experienceLevel,candidatesList,endDate} = req.body;
    const cid = req.user._id;
    
    if(!jobTitle || !jobDescription || !experienceLevel || !endDate){
        return res.status(401).json({message:"all fields are required"})
    }
    if(!candidatesList || candidatesList.length === 0){
        return res.status(402).json({message:"candidate list is required"})
    }


    try {
        const createdInterview = await interview.create({
            companyId:cid,
            jobTitle,
            jobDescription,
            experienceLevel,
            candidates: candidatesList || [],
            endDate,
        })    
        res.status(200).json({message:"Interview created",createdInterview})
    } catch (error) {
        res.status(501).json({message:"Internal Server error",error})
    }
    
})

const showInterviews = asyncHandler(async(req,res)=>{
    const cid = req.user._id;
    const interviews = await interview.find({companyId:cid});
    res.status(200).json(interviews)
    
})

const sendMail = asyncHandler(async(req,res)=>{
    const cid = req.user._id;
    const {interviewId} = req.body;
    
    const interviewDetails = await interview.findById(interviewId)
    
    const jobDescription = interviewDetails?.jobDescription;
    const experienceLevel = interviewDetails?.experienceLevel;
    const candidates = interviewDetails?.candidates;
    
    const companydetails = await companyDetail.findById(cid)
    const companyName = companydetails?.companyName;
    

    const jobDes = await generateJobDescription(jobDescription,experienceLevel,companyName);
    if(!jobDes){
        return res.status(401).json({message:"Something went while generating"})
    }
    try {
        await sendEmails(candidates,jobDes);
        return res.status(200).json({message:"Emails sent"})
    } catch (error) {
        console.error(error);
    }

})


export {createInterview,showInterviews,sendMail};