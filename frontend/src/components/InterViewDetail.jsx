import React from "react";
import axios from "axios";

const InterViewDetail = ({ details }) => {
  const { jobTitle, jobDescription, endDate, experienceLevel, candidates } =
    details;
  const handleClick = async () => {};
  return (
    <>
      <div
        className="flex flex-col border-2 border-black hover:cursor-pointer p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white w-full md:w-[400px] lg:w-[500px]"
        onClick={handleClick}
      >
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Job Title: {jobTitle}
        </h1>
        <p className="text-gray-700 mb-2 ">
          <span className="font-bold">Job Description:</span> {jobDescription}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-bold">Experience Level:</span> {experienceLevel}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-bold">End Date:</span>{" "}
          {new Date(endDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </p>
        <div className="text-gray-700">
          <p className="font-semibold">
            <span className="font-bold">Candidates:</span>
          </p>
          <ul className="list-disc pl-4">
            {candidates.map((cand, index) => (
              <li key={index} className="text-gray-600">
                {cand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InterViewDetail;
