import axios from "../api/axios";
import useAuth from "./useAuth";
const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        setAuth((prev) => {
            // console.log(JSON.stringify(prev));
            // console.log("Refesh",response.data.access_token);
            return {...prev, roles:response.data.roles, access_token: response.data.access_token, branch_id:response.data.branch_id}
        });

        return response.data.access_token;
    }
  return refresh;
}

export default useRefreshToken
