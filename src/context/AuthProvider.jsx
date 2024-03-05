import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
   const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
   const [isEdit, setIsEdit] = useState({isEdit:false, page:"", id:""});
   const [trackingNumber, setTrackingNumber] = useState(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, isEdit, setIsEdit, setTrackingNumber }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;