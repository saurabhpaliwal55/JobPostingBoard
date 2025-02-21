import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [userData,setUserData] = useState(()=>{
        return JSON.parse(localStorage.getItem("userData")) || null;
    });
    useEffect(()=>{
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
          } else {
            localStorage.removeItem('userData');
          }
    },[userData]);
    return(
        <UserContext.Provider value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
