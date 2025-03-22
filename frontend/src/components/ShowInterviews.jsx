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
      <div className="flex flex-col m-20 gap-2">
        {interViewDetails ? (
          interViewDetails.map((details, index) => {
            return <InterViewDetail details={details} key={index} />;
          })
        ) : (
          <p>Loading ......</p>
        )}
      </div>
    </>
  );
};

export default ShowInterviews;
