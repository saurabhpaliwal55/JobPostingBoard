import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateJobDescription = async (jobDescriptionPoints,experienceLevel,companyName) => {

  const prompt = `Write a job description on${jobDescriptionPoints} with ${experienceLevel} experienceLevel in 200 words for comapany named ${companyName} ` ;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};
