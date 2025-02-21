import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const MainComponent = () => {
  const { userData } = useUser();

  return userData ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/verify" replace />
  );
};

export default MainComponent;
