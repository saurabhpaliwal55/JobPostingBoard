import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  const btnhandler = () =>{
    navigate('/app/createInterView')
  }

  const showBtnhandler = () =>{
    navigate('/app/showInterviews')
  }
   return (
    <>
      <div className="flex">
        <div className="w-16 bg-gray-100 h-screen flex justify-center">
          <div className="w-8 h-8 mt-[40px]">
            <HomeIcon />
          </div>
        </div>

        <div className="flex flex-col h-[150px] w-[200px] ml-[30px] mt-[30px] items-center">
          <button className="bg-blue-500 w-full text-white py-2 px-4 rounded-lg mb-4" onClick={btnhandler}> 
            Create Interview
          </button>
          <button className="bg-blue-500 w-full text-white py-2 px-4 rounded-lg" onClick={showBtnhandler}> 
            Show Interviews
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
