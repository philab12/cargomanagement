import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'


const baseQuery = fetchBaseQuery({
   // baseUrl: `${import.meta.env.VITE_BACKENDURL}`,
    baseUrl: `${import.meta.env.VITE_BACKENDURL}`,
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.access_token

        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
   // const navigate = useNavigate();

    //console.log(args) // request url, method, body
    //console.log(api) // signal, dispatch, getState()
    //console.log(extraOptions) //custom like {shout: name}
    
    let result = await baseQuery(args, api, extraOptions)

    //if you want, handle other status codes, too
    //result?.error?.status
    //if(result?.error?.originalStatus === 401 ||  result?.error?.originalStatus === 403)
    if(result?.error?.status === 401){
        console.log('sending refresh token')

        //send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
         console.log("refreshhhhhhhhh",refreshResult)
        if(refreshResult?.data){
            const email = api.getState().auth.email
            const roles = api.getState().auth.roles
            const branch_id = api.getState().auth.branch_id
            //store the new token
         //   api.dispatch(setCredentials({access_token:refreshResult.access_token, email:refreshResult.email, roles:refreshResult.roles}))
              api.dispatch(setCredentials({...refreshResult.data, email, roles, branch_id, password:""}))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)

        } else {
            if(result?.error?.status === 401) {
                // refreshResult.error.data.message = "Your login has expired. "
                //navigate("/login")
               // history.push('/login');
               api.dispatch(logOut())
               window.location.replace("/login");

            }
              return refreshResult


        //    api.dispatch(logOut())
        //    window.location.replace("/login");

        }
    }

    return result

}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['IdType','CourierType', 'CourierCategory', 'CourierStage', 'Branch', 'Trip', 'CourierPrice', 'WeightUnit', 'ExtraCharge','SecurityQuestion', 'Transaction', 'Customer', 'User', 'ConsolidatedPackage'],
    endpoints: builder => ({})
})