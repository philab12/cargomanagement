import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const consolidatedPackageAdapter = createEntityAdapter({})

const initialState = consolidatedPackageAdapter.getInitialState()

export const consolidatedPackageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getConsolidatedPackages: builder.query({
            query: () => "/consolidated-package",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return consolidatedPackageAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "ConsolidatedPackage", id:"LIST" },
                        ...result.ids.map(id => ({type: "ConsolidatedPackage", id}))
                    ]
                } else return [{type: "ConsolidatedPackage", id:"LIST"}]
            }
        }),



        addNewConsolidatedPackage: builder.mutation({
            query: initialConsolidatedPackageData => ({
                url: "/consolidated-package",
                method: "POST",
                body: {
                    ...initialConsolidatedPackageData,
                }
            }),

            invalidatesTags: [
                {type: "ConsolidatedPackage", id: "LIST"}
            ]
        }),



        updateConsolidatedPackage: builder.mutation({
            query: initialConsolidatedPackageData => ({
                url : `/consolidated-package/${initialConsolidatedPackageData.id}`,
                method: "PATCH",
                body: {
                    ...initialConsolidatedPackageData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "ConsolidatedPackage", id:arg.id}]
        }),

        
        deleteConsolidatedPackage: builder.mutation({
            query: (id) => ({
                url: `/consolidated-package/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "ConsolidatedPackage", id:arg.id}]
        })


        
    })
})

export const {
    useGetConsolidatedPackagesQuery,
    useAddNewConsolidatedPackageMutation,
    useLinkConsolidatedPackageMutation,
    useUpdateConsolidatedPackageMutation,
    useDeleteConsolidatedPackageMutation
} = consolidatedPackageApiSlice

// returns the query result object
export const selectConsolidatedPackageResult = consolidatedPackageApiSlice.endpoints.getConsolidatedPackages.select()

// create memoized selector
const selectConsolidatedPackageData = createSelector(selectConsolidatedPackageResult, consolidatedPackageResult => consolidatedPackageResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllConsolidatedPackages,
    selectById : selectConsolidatedPackageById,
    selectIds : selectConsolidatedPackageIds
    //Pass in a selector that returns the users slice of state
} = consolidatedPackageAdapter.getSelectors(state => selectConsolidatedPackageData(state) ?? initialState)