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
        toast.success("Comapany registered successfully", toastSuccessOptions);
        navigate("/app/home");
        localStorage.setItem("userData", JSON.stringify(user));
      }
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("All fields are required", toastErrorOptions);
      }
      if (error.response.status == 401) {
        toast.error("Invalid Email", toastErrorOptions);
      }
      if (error.response.status == 402) {
        toast.error("User or company already registered", toastErrorOptions);
      }
      if (error.response.status == 501) {
        toast.error("Something went wrong", toastErrorOptions);
      } else {
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
      <div className="flex flex-col md:flex-row w-full justify-between px-4 md:px-10">
        <div className="flex w-full md:w-[550px] h-auto md:h-[200px] mt-[100px] md:mt-[200px]">
          <p className="font-[DM Sans] font-medium text-[#292929B2] text-[18px] md:text-[22px] text-center md:text-left">
            Join our platform to streamline your hiring process! Sign up to post
            job openings, manage applications, and connect with top talent
            effortlessly. Create an account today and start building your dream
            team with ease and efficiency!
          </p>
        </div>
        <div className="flex w-full md:w-[700px] h-auto mt-[20px] md:mt-[10px] flex-col items-center">
          <p className="text-[28px] md:text-[32px] font-semibold">Sign Up</p>
          <div className="flex flex-col items-center w-full">
            {[
              {
                icon: <PersonOutlineIcon />,
                placeholder: "Name",
                name: "name",
              },
              { icon: <PhoneIcon />, placeholder: "Phone No.", name: "phone" },
              {
                icon: <PersonOutlineIcon />,
                placeholder: "Company Name",
                name: "companyName",
              },
              {
                icon: <MailOutlineIcon />,
                placeholder: "Company Email",
                name: "companyEmail",
              },
              {
                icon: <GroupsIcon />,
                placeholder: "Employee Size",
                name: "employeeSize",
              },
            ].map((field, index) => (
              <div
                key={index}
                className="flex bg-[#F4F4F4] h-[60px] w-full md:w-[500px] items-center border border-[#CCCCCC] rounded-md my-2 p-4"
              >
                {field.icon}
                <input
                  className="outline-none border-none bg-[#F4F4F4] flex-1"
                  type="text"
                  placeholder={field.placeholder}
                  name={field.name}
                  onChange={changeHandler}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-[#292929B2]">
              By clicking on proceed you accept our
            </p>
            <p className="text-[16px] font-bold text-blue-500">
              Terms <span className="text-[#292929B2]">&</span> Conditions
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full items-center">
            <button
              className="w-full md:w-[500px] h-[40px] text-[18px] md:text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
              onClick={alreadyHandler}
            >
              Already A User
            </button>
            <button
              className="w-full md:w-[500px] h-[40px] text-[18px] md:text-[20px] rounded-md font-bold bg-[#3F71FF] text-[#FFFFFF]"
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
