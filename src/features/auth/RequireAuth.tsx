import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentToken } from "./authSlice";
// import { selectUserPortal } from "./authSlice";

import React from "react";

const RequireAuth = ({allowedRoles}: any) => {
  const token = useSelector(selectCurrentToken);
//   const user_portal = useSelector(selectUserPortal);
  const user_role = useSelector(selectCurrentRole);
  const location = useLocation();
  // console.log(user_role)
  // console.log(token)
//   console.log("Require Auth",token);
  //To include roles refer to previous tut
 return (
    allowedRoles?.includes(user_role) ? 
    <Outlet /> : 
    token ? 
    <Navigate to="/unauthorized" state={{ from: location }} replace /> :
     <Navigate to="/login" state={{ from : location }} replace />
 )
};

export default RequireAuth;
