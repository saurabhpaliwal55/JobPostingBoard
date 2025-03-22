import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateInreviw = () => {
  const [details, setDetails] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidatesList: [],
    endDate: "",
  });
  const [candidateInput, setCandiateInput] = useState("");
  const [interviewId, setInterviewId] = useState("");
  const [disable, setDisable] = useState(true);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleCandidateInput = (e) => {
    // setDetails({ ...details, candidateInput: e.target.value });
    setCandiateInput(e.target.value);
  };
  const addCandidate = () => {
    if (details.candidatesList.includes(candidateInput)) {
      toast.error("same email", toastErrorOptions);
      setCandiateInput("");
      return;
    }
    if (candidateInput) {
      setDetails({
        ...details,
        candidatesList: [...details.candidatesList, candidateInput],
      });
      setCandiateInput("");
    }
  };
  const removeCandidate = (email) => {
    setDetails({
      ...details,
      candidatesList: details.candidatesList.filter(
        (candidate) => candidate !== email
      ),
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/user/createInterview", details);
      const iId = response.data.createdInterview._id;
      setInterviewId(iId);
      if (response.status == 200) {
        toast.success("Interview created successfully", toastSuccessOptions);
        setDisable(false);
      }
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("All fields are required");
      }
      if (error.response.status == 402) {
        toast.error("Plese add candidates");
      } else {
        console.log(error);
      }
    }
  };

  const handleSend = async () => {
    try {
      console.log(interviewId);
      const response = await axios.post("/api/user/sendMail", { interviewId });
      if (response.status == 200) {
        toast.success("Emails sent to candiates", toastSuccessOptions);
        navigate("/app/showInterviews");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full">
        <div className="w-16 bg-gray-100 h-full md:flex hidden justify-center sidebar "></div>
        <div className="flex flex-col w-full md:w-[900px] p-6 md:pt-[70px] mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full md:w-[30%] text-gray-700 font-medium text-[20px] text-center md:text-right pr-4">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Enter Job Title"
              className="w-full md:w-[70%] border rounded-md p-2"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full md:w-[30%] text-gray-700 font-medium text-[20px] text-center md:text-right pr-4">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              placeholder="Enter Job Description"
              className="w-full md:w-[70%] h-[150px] border rounded-md p-2"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full md:w-[30%] text-gray-700 font-medium text-[20px] text-center md:text-right pr-4">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              onChange={handleChange}
              className="w-full md:w-[70%] border rounded-md p-2"
            >
              <option value="">Select Experience Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full md:w-[30%] text-gray-700 font-medium text-[20px] text-center md:text-right pr-4">
              Add Candidate
            </label>
            <div className="flex w-full md:w-[70%]">
              <input
                type="email"
                name="candidatesList"
                value={candidateInput}
                placeholder="xyz@gmail.com"
                onChange={handleCandidateInput}
                onKeyPress={(e) => e.key === "Enter" && addCandidate()}
                className="w-[80%] border rounded-md p-2"
              />
              <button
                type="button"
                onClick={addCandidate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[70%] ml-auto mb-4">
            {details.candidatesList.map((email, index) => (
              <div
                key={index}
                className="flex justify-between border rounded-md p-2 items-center mb-2"
              >
                <span>{email}</span>
                <button
                  type="button"
                  onClick={() => removeCandidate(email)}
                  className="text-red-500 font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <label className="w-full md:w-[30%] text-gray-700 font-medium text-[20px] text-center md:text-right pr-4">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="w-full md:w-[70%] border rounded-md p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            {disable ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Create Interview
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                onClick={handleSend}
              >
                Send Emails
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInreviw;
