import jwt from "jsonwebtoken"
import { companyDetail } from "../models/companyDetails.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import dotenv from "dotenv"
dotenv.config();

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replcae("Bearer ","");
        if(!token){
           return res.status(401).json({message:"Token not found"});
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await companyDetail.findById(decodedToken?._id);
        if(!user){
            return res.status(401,"Invalid access token")
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
})