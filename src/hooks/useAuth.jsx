import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //Below is for useDebug value purposes
    // const {auth} = useContext(AuthContext);
    // useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out");
    //this should only be use
    return useContext(AuthContext);
}

export default useAuth