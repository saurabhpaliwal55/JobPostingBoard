import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);
  const {userData} = useUser();
  const {setUserData} = useUser();
  const navigate = useNavigate();

  const toastSuccessOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const toogleDropDown = () => {
    setDropDown(!dropDown);
  };

  const btnHandler = async() =>{
    try {
      const response = await axios.post('/api/user/logOut');
      if(response.status == 200){
      localStorage.removeItem("userData");
      toogleDropDown();
      setUserData(null)
      toast.success("LoggedOut successfully",toastSuccessOptions);
      navigate("/verify")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
    
  return (
    <>
      <div className="flex items-center justify-between h-[80px]  bg-gray-100 ">
        <img
          className="h-[43px] w-[165px] ml-[55px]"
          src="https://s3-alpha-sig.figma.com/img/3e25/ee17/725a57611cb5a4a0585131e0c38ed0eb?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V1itCb9R1wpN5bLCZekABgtCjzleojk~gNFVDA2CqsFKWNP-~2e3dwIPO87JufgaPzAQ5-T2xzWShrtd3uqpGQr3WMSJwcCZAhDKvuIwoJsNaSStbrf6Mbi6rNdopbs00rgNMQ025Ua6AZ-ndy017TEKJZNLHDVplw8MT4wEloYB9IGX-yFfvOO3DzoimCMAiLAa6Knd0UM31GqtDP0e67CtbUfdWIvX9K66ro~9x56cFW0XFUQtUyGV-16je85QYfH0Ax-C8UB6W5DlcvXkQCnR6BUn6kp0k4OaLhR5OeJvveoUIZHPGT4ZQMu9zGBgURYhD1BpDSAmvCfd3cTqmQ__"
          alt=""
        />
        <div className="flex">
          {/* <p className="w-[108px] h-[36px] mr-[55px] font-[DM Sans] font-medium text-[#576474] text-[28px]">
            Contact
          </p> */}
          { userData ?
          <button
            className="w-[200px] h-[36px] font-[DM Sans] font-medium text-[#576474] text-[20px]"
            onClick={toogleDropDown}
          >
          {userData?.name}
          </button> : (<p className="w-[108px] h-[36px] mr-[25px] font-[DM Sans] font-medium text-[#576474] text-[28px]">User</p>)}
          {
            dropDown && (<div className="absolute right-0 mt-[60px]  w-48 bg-white rounded-md shadow-lg">
              <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left rounded-md" onClick={btnHandler}>Logout</button>
            </div>)
          }
        </div>
      </div>
    </>
  );
};

export default NavBar;
