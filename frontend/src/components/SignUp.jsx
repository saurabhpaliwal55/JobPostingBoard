import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signup = () => {
  const [details, setDetails] = useState({
    name: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });
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

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const buttonHandler = async () => {
    // setLoading(true); // for spinner
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // console.log(details);
      const response = await axios.post("api/user/register", details, config);
      const user = response?.data?.user;
      // console.log(user);
      if (response.status == 200) {
        toast.success("Comapany registered successfully",toastSuccessOptions);
        navigate("/app/home");
        localStorage.setItem("userData", JSON.stringify(user));
      }
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("All fields are required", toastErrorOptions);
      }
      if(error.response.status == 401){
        toast.error("Invalid Email", toastErrorOptions);
      }
      if(error.response.status == 402){
        toast.error("User or company already registered", toastErrorOptions);
      }
      if(error.response.status == 501){
        toast.error("Something went wrong", toastErrorOptions)
      }
      else{
        console.log(error);
      }
    } 
  };

  const alreadyHandler = () => {
    navigate("/verify");
  };
  return (
    <>
      <NavBar />
      <div className="flex w-full justify-between">
        <div className="flex w-[550px] h-[200px] mt-[200px] ml-[20px]">
          <p className="font-[DM Sans] font-medium text-[#292929B2] text-[22px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
        <div className="flex w-[700px] h-[600px] mt-[10px] mr-[20px] flex-col ">
          <div className="flex flex-col h-[40] w-[110] items-center">
            <p className="font-[DM Sans] text-[32px] font-semibold">SignUp</p>
            <p className="font-medium text-[#292929B2] font-[DM Sans] text-[16px]">
              Lorem Ipsum is simply dummy text
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex bg-[#F4F4F4] h-[60px] w-[500px] items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <PersonOutlineIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Name"
                name="name"
                onChange={changeHandler}
              />
            </div>

            <div className="flex bg-[#F4F4F4] h-[60px] w-[500px] items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <PhoneIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Phone no. "
                name="phone"
                onChange={changeHandler}
              />
            </div>

            <div className="flex bg-[#F4F4F4] h-[60px] w-[500px] items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <PersonOutlineIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Company Name"
                name="companyName"
                onChange={changeHandler}
              />
            </div>

            <div className="flex bg-[#F4F4F4] h-[60px] w-[500px] items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <MailOutlineIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Company Email"
                name="companyEmail"
                onChange={changeHandler}
              />
            </div>

            <div className="flex bg-[#F4F4F4] h-[60px] w-[500px] items-center border border-[#CCCCCC] rounded-md m-[4px] p-[4px]">
              <GroupsIcon
                className="items-center"
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <input
                className="outline-none border-none bg-[#F4F4F4]"
                type="text"
                placeholder="Employee Size"
                name="employeeSize"
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-[16px] font-bold text-[#292929B2]">
              By clicking on proceed you wil accept our
            </p>
            <p className="text-[16px] font-bold text-blue-500 ">
              Terms <span className="text-[#292929B2]">&</span> Conditions
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center justify-center ">
            <button
              className="w-[500px] h-[40px] text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
              onClick={alreadyHandler}
            >
              Already A User
            </button>
            <button
              className="w-[500px] h-[40px] text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
              onClick={buttonHandler}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
