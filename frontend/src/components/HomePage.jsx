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
    <div className="flex flex-col h-[150px] ml-[30px] mt-[30px] items-center justify-center gap-4">
    <button className="bg-blue-500  text-white py-2 px-4 rounded-lg" onClick={btnhandler}> 
      Create Interview
    </button>
    <button className="bg-blue-500  text-white py-2 px-4 rounded-lg" onClick={showBtnhandler}> 
      Show Interviews
    </button>
  </div>
  );
};

export default HomePage;
