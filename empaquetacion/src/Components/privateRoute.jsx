import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/clientContext";

const privateRoute = () => {
    const { isloggedIn } = useAuth();

    return isloggedIn ? <Outlet/> : <Navigate to="/" replace />;
}

export default privateRoute