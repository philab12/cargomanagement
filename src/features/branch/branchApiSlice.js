import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const branchAdapter = createEntityAdapter({})

const initialState = branchAdapter.getInitialState()

export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBranchs: builder.query({
            query: () => "/branch",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return branchAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "Branch", id:"LIST" },
                        ...result.ids.map(id => ({type: "Branch", id}))
                    ]
                } else return [{type: "Branch", id:"LIST"}]
            }
        }),



        addNewBranch: builder.mutation({
            query: initialBranchData => ({
                url: "/branch",
                method: "POST",
                body: {
                    ...initialBranchData,
                }
            }),

            invalidatesTags: [
                {type: "Branch", id: "LIST"}
            ]
        }),

        updateBranch: builder.mutation({
            query: initialBranchData => ({
                url : `/branch/${initialBranchData.id}`,
                method: "PATCH",
                body: {
                    ...initialBranchData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Branch", id:arg.id}]
        }),

        
        deleteBranch: builder.mutation({
            query: (id) => ({
                url: `/branch/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "Branch", id:arg.id}]
        })


        
    })
})

export const {
    useGetBranchsQuery,
    useAddNewBranchMutation,
    useUpdateBranchMutation,
    useDeleteBranchMutation
} = branchApiSlice

// returns the query result object
export const selectBranchResult = branchApiSlice.endpoints.getBranchs.select()

// create memoized selector
const selectBranchData = createSelector(selectBranchResult, branchResult => branchResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllBranchs,
    selectById : selectBranchById,
    selectIds : selectBranchIds
    //Pass in a selector that returns the users slice of state
} = branchAdapter.getSelectors(state => selectBranchData(state) ?? initialState)