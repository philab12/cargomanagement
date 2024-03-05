import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react';
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }catch(err){
                console.log(err);
            }finally{
               isMounted && setIsLoading(false);
            }
        }


        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        }
        
    },[]);


    useEffect(() => {
    
        console.log(`isLoading: ${isLoading}`);
        console.log(`at: ${JSON.stringify(auth?.access_token)}`);
        // console.log(`auth: ${JSON.stringify(auth)}`);
        // console.log(`persist`,persist);

    },[isLoading]);


    return (
        <>
        {!persist ? <Outlet /> : isLoading ? <p>Loading...</p> 
                      : <Outlet />
        }
        </>
    )
}


export default PersistLogin;