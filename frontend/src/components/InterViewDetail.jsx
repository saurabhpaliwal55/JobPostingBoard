import React from 'react'
import axios from "axios"

const InterViewDetail = ({ details }) => {
    const {jobTitle,jobDescription,endDate,experienceLevel,candidates} = details;
    const handleClick = async()=>{
    }
  return (
    <>
    <div>
    <div className='flex flex-col border-2 border-black hover:cursor-pointer'onClick={handleClick}>
      <h1>Jobtitle:{jobTitle}</h1>
      <p>JobDesciton:{jobDescription}</p>
      <p>Exp:{experienceLevel}</p>
      <p>EndDate:{endDate}</p>
      {candidates.map(cand=><p>{cand}</p>)}
    </div>
    </div>
    </>
  )
}

export default InterViewDetail
