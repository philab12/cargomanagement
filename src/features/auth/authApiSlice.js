import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
               url: "/auth/login",
               method: "POST",
               body: {...credentials}

            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),

            // async onQueryStarted(arg, {dispatch, queryFulfilled}){
            //     try {
            //          //const {data} = await queryFulfilled
            //          await queryFulfilled
            //        // console.log(data)
            //         dispatch(logOut())
            //         setTimeout(() => {
            //             dispatch(apiSlice.util.resetApiState())
            //         },1000)
            //         dispatch(apiSlice.util.resetApiState())
            //     } catch(err){
            //         console.log(err)
            //     }
            // }
        }),

    

        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET"
            }),

            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                //    console.log("dataaaaa",data)
                    const {access_token, email, roles, branch_id} = data
                    dispatch(setCredentials({access_token, email, roles, branch_id,password:""}))
                }catch(err){
                    console.log(err)
                }
            }
        }),



    })
})


export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice