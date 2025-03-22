import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);
  const { userData } = useUser();
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const toastSuccessOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const toogleDropDown = () => {
    setDropDown(!dropDown);
  };

  const btnHandler = async () => {
    try {
      const response = await axios.post("/api/user/logOut");
      if (response.status == 200) {
        localStorage.removeItem("userData");
        toogleDropDown();
        setUserData(null);
        toast.success("LoggedOut successfully", toastSuccessOptions);
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/app/home");
  };
  return (
    <>
      <div className="flex items-center justify-between h-[80px] bg-gray-100 px-4 md:px-10">
        <div className="p-4">
          <h2
            className="text-xl md:text-2xl font-bold text-[#576474] hover:cursor-pointer"
            onClick={handleClick}
          >
            Job Posting Board
          </h2>
        </div>

        <div className="relative flex items-center">
          {userData ? (
            <button
              className="w-auto md:w-[200px] h-[36px] font-[DM Sans] font-medium text-[#576474] text-[16px] md:text-[20px] px-4"
              onClick={toogleDropDown}
            >
              {userData?.name}
            </button>
          ) : (
            <p className="hidden md:block"></p> // Keeps layout stable
          )}

          {dropDown && (
            <div className="absolute right-0 top-[60px] w-48 bg-white rounded-md shadow-lg z-10">
              <button
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left rounded-md"
                onClick={btnHandler}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
