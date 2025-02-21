import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import InterViewDetail from "./InterViewDetail";
const ShowInterviews = () => {
  const [interViewDetails, setInterViewDetails] = useState(null);
  
  useEffect(() => {
    const fetchInterViews = async () => {
      const res = await axios.get("/api/user/showInterviews");
      setInterViewDetails(res.data);
    };
    fetchInterViews();
  }, []);


  return (
    <>
      <div className="flex">
      <div className="w-16 bg-gray-100 h-screen flex justify-center">
        <div className="w-8 h-8 mt-[40px]">
          <HomeIcon />
        </div>
      </div>
      <div className="flex flex-col">
      {/* <div>
      <h1>Click to send emails to candidates after clicking the interview is deleted</h1>
      </div> */}
      <div>
      {interViewDetails ? (interViewDetails.map((details,index)=>{
       return <InterViewDetail details = {details} key={index} />
      })):(<p>Loading ......</p>)}
      </div>
      </div>
      </div>
    </>
  );
};

export default ShowInterviews;
