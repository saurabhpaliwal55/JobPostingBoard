import React, { useEffect, useState } from "react";
// import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { useUser } from "../contexts/UserContext";
import NavBar from "./NavBar";

const Verify = () => {
  const [email, setEmail] = useState();
  const [emailOtp, setEmailOtp] = useState();
  const {setUserData} = useUser();
  // const [isDisable,setIsDisable] = useState(false)
  const navigate = useNavigate();
  const toastSuccessOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const toastErrorOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const otpChangeHandler = (e) => {
    setEmailOtp(e.target.value);
  };

  useEffect(()=>{
    localStorage.removeItem("userData")
  },[])
  const sendHandler = async () => {
    try {
      const res = await axios.post("/api/user/sendOtp", { email });
      if (res.status == 200) {
          toast.success("Otp Send", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("Email is required.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (error.response.status == 402) {
        toast.error("Invalid Email.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (error.response.status == 404) {
        toast.error("Email address is not registered", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.log(error);
      }
    }
  };
  const verifyHandler = async () => {
    try {
      const response = await axios.post("/api/user/verifyOtp", { emailOtp,email });
      const user = response?.data?.user;
      if(response.status == 200){
        toast.success("OTP verified successfully.", toastSuccessOptions);
        localStorage.setItem("userData",JSON.stringify(user));
        setUserData(user);
        navigate('/app/home')
      }
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("Email otp are required.", toastErrorOptions);
      }
      if(error.response.status == 401){
        toast.error("Invalid OTP", toastErrorOptions);
      }
      if(error.response.status == 402){
        toast.error("OTP Expired", toastErrorOptions);
      }
      if(error.response.status == 403){
        toast.error("Enter Email First", toastErrorOptions);
      }
      else{
        console.log(error);
      }
    }
  };

  return (
    <>
      <NavBar/>
      <div className="flex w-full justify-between">
        <div className="flex w-[550px] h-[200px] mt-[200px] ml-[20px]">
          <p className="font-[DM Sans] font-medium text-[#292929B2] text-[22px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
        <div className="flex w-[700px] h-[400px] mt-[150px] mr-[20px] flex-col">
          <div className="flex flex-col h-[40] w-[110] items-center">
            <p className="font-[DM Sans] text-[32px] font-semibold">SignIn</p>
            <p className="font-medium text-[#292929B2] font-[DM Sans] text-[16px]">
              Lorem Ipsum is simply dummy text
            </p>
          </div>

          <div className="flex flex-col items-center mt-[30px] gap-2">
            <div className="flex bg-[#F4F4F4] h-[40px] w-[500px]  items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <MailOutlineIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4] w-full"
                type="text"
                placeholder="Enter Email"
                onChange={emailChangeHandler}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <button
                className="w-[500px] h-[30px] text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
                onClick={sendHandler}
              >
                SendOTP
              </button>
            </div>
            <div className="flex bg-[#F4F4F4] h-[40px] w-[500px]  items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <MailOutlineIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Mail OTP"
                onChange={otpChangeHandler}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <button
                className="w-[500px] h-[30px] text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
                onClick={verifyHandler}
              >
                Verify
              </button>
            </div>
            {/* <div className="flex bg-[#F4F4F4] h-[40px] w-[500px] items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <PhoneIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Mobile OTP "
              />
            </div>
            <div className="flex items-center justify-center ">
              <button className="w-[500px] h-[30px] text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]">
                Verify
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
