import axios from "../api/axios";
import useAuth from "./useAuth";


const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({});
        try{

            const response = await axios('/auth/logout', {
                withCredentials: true,
            })

        }catch(error){
            console.err(error);
        }
    }

    return logout
}



export default useLogout;