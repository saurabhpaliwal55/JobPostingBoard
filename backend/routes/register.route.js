import { Router } from "express";
import { logOut, register, requestEmailOTP, verifyEmailOtp } from "../controller/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createInterview, sendMail, showInterviews } from "../controller/createInterview.controllers.js";

const router = Router();

router.route("/register").post(register);
router.route("/logout").post(logOut)
router.route("/sendOtp").post(requestEmailOTP);
router.route("/verifyOtp").post(verifyEmailOtp);
router.route("/createInterview").post(verifyJWT,createInterview);
router.route("/sendMail").post(verifyJWT,sendMail);
router.route("/showInterviews").get(verifyJWT,showInterviews);


export default router;