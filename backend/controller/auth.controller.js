import { asyncHandler } from "../utils/asyncHandler.js";
import { companyDetail } from "../models/companyDetails.model.js";
import { Otp } from "../models/otp.model.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmailOtp } from "../utils/sendEmail.js";

const genrateAccessToken = async (userId) => {
  try {
    const user = await companyDetail.findById(userId).select("_id");
    const accessToken = await user.generateAccessToken();
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

const register = asyncHandler(async (req, res) => {
  //getUser details
  //generate token and store in cokkies
  //build session based authentication
  const { name, phone, companyName, companyEmail, employeeSize } = req.body;
  // checking all fields are not empty
  if (!name || !phone || !companyName || !companyEmail || !employeeSize) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // checking a valid email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(companyEmail);
  if (!isValidEmail) {
    return res.status(401).json({ message: "Invalid Email." });
  }

  // checking existed user
  const existedUser = await companyDetail.findOne({
    $or: [{ name }, { companyEmail }, { companyName }],
  });

  if (existedUser) {
    return res.status(402).json({
      error: "user or company already registered",
    });
  }

  // creating company details object and saving into db

  const user = await companyDetail.create({
    name,
    phone: Number(phone),
    companyName,
    companyEmail,
    employeeSize: Number(employeeSize),
  });

  const createdUser = await companyDetail
    .findById(user._id)
    .select("-_id -__v");
  // generating token and saving it into cookies
  // const accessToken = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
  const accessToken = await genrateAccessToken(user._id);

  if (!user) {
    return res.status(501).json({
      error: "something went wrong while regestring user",
    });
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .json({ message: "Success user created", user: createdUser });
});

const requestEmailOTP = asyncHandler(async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { email } = req.body;
  const isValidEmail = emailRegex.test(email);
  const user = await companyDetail.find({ companyEmail: email });
  if (!email) {
    return res.status(401).json({ message: "Email is required." });
  }

  if (!isValidEmail) {
    return res.status(402).json({ message: "Invalid Email." });
  }

  if (user.length == 0) {
    return res.status(404).json({ message: "Email address is not registered" });
  }
  const emailOtp = generateOTP();
  try {
    await sendEmailOtp(email, emailOtp);
    const otpEntry = await Otp.create({
      emailOtp,
      email,
    });
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending OTP.", err });
  }
});

const verifyEmailOtp = asyncHandler(async (req, res) => {
  // verify email and mobile number using otp
  const { emailOtp } = req.body;
  const { email } = req.body;

  const user = await companyDetail.findOne({ companyEmail: email });
  if (!email) {
    return res.status(403).json({ message: "Email is required" });
  }
  if (!emailOtp) {
    return res.status(400).json({ message: "Email otp are required." });
  }
  const emailOtpEntry = await Otp.findOne({ emailOtp,email });
  
  if (!emailOtpEntry) {
    return res.status(401).json({ message: "Invalid OTP." });
  }
  if (new Date() > emailOtpEntry.expiresAt) {
    await Otp.deleteOne({ _id: emailOtpEntry._id });
    return res.status(402).json({ message: "OTP expired." });
  }
  await Otp.deleteOne({ _id: emailOtpEntry._id });
  const accessToken = await genrateAccessToken(user._id);
  return res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .json({ message: "OTP verified successfully.",user });
});

const logOut = asyncHandler(async(req,res)=>{
  const options = {
    httpOnly:true,
    secure:true
  }
  res.status(200).clearCookie("accessToken",options).json({message:"User logOut successfully"})
})

export { register, requestEmailOTP, verifyEmailOtp, logOut };
