import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return userAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "User", id:"LIST" },
                        ...result.ids.map(id => ({type: "User", id}))
                    ]
                } else return [{type: "User", id:"LIST"}]
            }
        }),



        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: "/users",
                method: "POST",
                body: {
                    ...initialUserData,
                }
            }),

            invalidatesTags: [
                {type: "User", id: "LIST"}
            ]
        }),

        updateUser: builder.mutation({
            query: initialUserData => ({
                url : `/users/${initialUserData.id}`,
                method: "PATCH",
                body: {
                    ...initialUserData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "User", id:arg.id}]
        }),

        
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "User", id:arg.id}]
        }),


        forgotUser: builder.mutation({
            query: initialUserData => ({
                url: "/users/forgotPassword",
                method: "POST",
                body: {
                    ...initialUserData,
                }
            }),

            invalidatesTags: [
                {type: "User", id: "LIST"}
            ]
        }),



        verifyResetLink: builder.mutation({
            query: (resetLink) => ({
                url: `/users/password/reset/${resetLink}`,
                method: "PATCH",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "User", id:arg.id}]
        }),


        resetPassword: builder.mutation({
            query: initialUserData => ({
                url: "/users/resetPassword",
                method: "POST",
                body: {
                    ...initialUserData,
                }
            }),

            invalidatesTags: [
                {type: "User", id: "LIST"}
            ]
        }),


        verifyAccount: builder.mutation({
            query: (resetLink) => ({
                url: `/users/verify/${resetLink}`,
                method: "PATCH",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "User", id:arg.id}]
        }),


        
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useForgotUserMutation,
    useVerifyResetLinkMutation,
    useResetPasswordMutation,
    useVerifyAccountMutation
} = userApiSlice



// returns the query result object
export const selectUserResult = userApiSlice.endpoints.getUsers.select()

// create memoized selector
const selectUserData = createSelector(selectUserResult, userResult => userResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllUsers,
    selectById : selectUserById,
    selectIds : selectUserIds
    //Pass in a selector that returns the users slice of state
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)