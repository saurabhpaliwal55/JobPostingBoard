import React, { useEffect, useState } from "react";
// import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import NavBar from "./NavBar";

const Verify = () => {
  const [email, setEmail] = useState();
  const [emailOtp, setEmailOtp] = useState();
  const { setUserData } = useUser();
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
  };

  const toastErrorOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const otpChangeHandler = (e) => {
    setEmailOtp(e.target.value);
  };

  const signUpHandle = () => {
    navigate("/");
  };

  useEffect(() => {
    localStorage.removeItem("userData");
  }, []);
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
      const response = await axios.post("/api/user/verifyOtp", {
        emailOtp,
        email,
      });
      const user = response?.data?.user;
      if (response.status == 200) {
        toast.success("OTP verified successfully.", toastSuccessOptions);
        localStorage.setItem("userData", JSON.stringify(user));
        setUserData(user);
        navigate("/app/home");
      }
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("Email otp are required.", toastErrorOptions);
      }
      if (error.response.status == 401) {
        toast.error("Invalid OTP", toastErrorOptions);
      }
      if (error.response.status == 402) {
        toast.error("OTP Expired", toastErrorOptions);
      }
      if (error.response.status == 403) {
        toast.error("Enter Email First", toastErrorOptions);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row w-full justify-between px-4 md:px-10">
        <div className="flex w-full md:w-[550px] h-auto mt-[100px] md:mt-[200px] text-center md:text-left">
          <p className="font-[DM Sans] font-medium text-[#292929B2] text-[18px] md:text-[22px]">
            Join our platform to streamline your hiring process! Sign up to post
            job openings, manage applications, and connect with top talent
            effortlessly. Create an account today and start building your dream
            team with ease and efficiency!
          </p>
        </div>
        <div className="flex w-full md:w-[700px] h-auto mt-[50px] md:mt-[150px] flex-col items-center">
          <p className="text-[28px] md:text-[32px] font-semibold">Sign In</p>
          <div className="flex flex-col items-center w-full mt-[30px] gap-3">
            {[
              {
                icon: <MailOutlineIcon />,
                placeholder: "Enter Email",
                onChange: emailChangeHandler,
              },
              {
                icon: <MailOutlineIcon />,
                placeholder: "Mail OTP",
                onChange: otpChangeHandler,
              },
            ].map((field, index) => (
              <div
                key={index}
                className="flex bg-[#F4F4F4] min-h-[40px] w-full md:max-w-[500px] items-center border border-[#CCCCCC] rounded-md p-4"
              >
                {field.icon}
                <input
                  className="outline-none border-none bg-[#F4F4F4] flex-1"
                  type="text"
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-full mt-4">
            <button
              className="w-full md:max-w-[500px] min-h-[40px] text-[18px] md:text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
              onClick={sendHandler}
            >
              Send OTP
            </button>
            <button
              className="w-full md:max-w-[500px] min-h-[40px] text-[18px] md:text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
              onClick={verifyHandler}
            >
              Verify
            </button>
          </div>
          <h2
            className="w-full md:max-w-[500px] text-center text-[18px] md:text-[20px] font-bold mt-4 hover:cursor-pointer"
            onClick={signUpHandle}
          >
            Not a user? Sign Up
          </h2>
        </div>
      </div>
    </>
  );
};

export default Verify;
