import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const securityQuestionAdapter = createEntityAdapter({})

const initialState = securityQuestionAdapter.getInitialState()

export const securityQuestionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSecurityQuestions: builder.query({
            query: () => "/security-question",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return securityQuestionAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "SecurityQuestion", id:"LIST" },
                        ...result.ids.map(id => ({type: "SecurityQuestion", id}))
                    ]
                } else return [{type: "SecurityQuestion", id:"LIST"}]
            }
        }),



        addNewSecurityQuestion: builder.mutation({
            query: initialSecurityQuestionData => ({
                url: "/security-question",
                method: "POST",
                body: {
                    ...initialSecurityQuestionData,
                }
            }),

            invalidatesTags: [
                {type: "SecurityQuestion", id: "LIST"}
            ]
        }),

        updateSecurityQuestion: builder.mutation({
            query: initialSecurityQuestionData => ({
                url : `/security-question/${initialSecurityQuestionData.id}`,
                method: "PATCH",
                body: {
                    ...initialSecurityQuestionData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "SecurityQuestion", id:arg.id}]
        }),

        
        deleteSecurityQuestion: builder.mutation({
            query: (id) => ({
                url: `/security-question/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "SecurityQuestion", id:arg.id}]
        })


        
    })
})

export const {
    useGetSecurityQuestionsQuery,
    useAddNewSecurityQuestionMutation,
    useUpdateSecurityQuestionMutation,
    useDeleteSecurityQuestionMutation
} = securityQuestionApiSlice

// returns the query result object
export const selectSecurityQuestionResult = securityQuestionApiSlice.endpoints.getSecurityQuestions.select()

// create memoized selector
const selectSecurityQuestionData = createSelector(selectSecurityQuestionResult, securityQuestionResult => securityQuestionResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllSecurityQuestions,
    selectById : selectSecurityQuestionById,
    selectIds : selectSecurityQuestionIds
    //Pass in a selector that returns the users slice of state
} = securityQuestionAdapter.getSelectors(state => selectSecurityQuestionData(state) ?? initialState)