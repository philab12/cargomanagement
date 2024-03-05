import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const extraChargeAdapter = createEntityAdapter({})

const initialState = extraChargeAdapter.getInitialState()

export const extraChargeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExtraCharges: builder.query({
            query: () => "/extra-price-setup",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return extraChargeAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "ExtraCharge", id:"LIST" },
                        ...result.ids.map(id => ({type: "ExtraCharge", id}))
                    ]
                } else return [{type: "ExtraCharge", id:"LIST"}]
            }
        }),



        addNewExtraCharge: builder.mutation({
            query: initialExtraChargeData => ({
                url: "/extra-price-setup",
                method: "POST",
                body: {
                    ...initialExtraChargeData,
                }
            }),

            invalidatesTags: [
                {type: "ExtraCharge", id: "LIST"}
            ]
        }),

        updateExtraCharge: builder.mutation({
            query: initialExtraChargeData => ({
                url : `/extra-price-setup/${initialExtraChargeData.id}`,
                method: "PATCH",
                body: {
                    ...initialExtraChargeData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "ExtraCharge", id:arg.id}]
        }),

        
        deleteExtraCharge: builder.mutation({
            query: (id) => ({
                url: `/extra-price-setup/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "ExtraCharge", id:arg.id}]
        })


        
    })
})

export const {
    useGetExtraChargesQuery,
    useAddNewExtraChargeMutation,
    useUpdateExtraChargeMutation,
    useDeleteExtraChargeMutation
} = extraChargeApiSlice

// returns the query result object
export const selectExtraChargeResult = extraChargeApiSlice.endpoints.getExtraCharges.select()

// create memoized selector
const selectExtraChargeData = createSelector(selectExtraChargeResult, extraChargeResult => extraChargeResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllExtraCharges,
    selectById : selectExtraChargeById,
    selectIds : selectExtraChargeIds
    //Pass in a selector that returns the users slice of state
} = extraChargeAdapter.getSelectors(state => selectExtraChargeData(state) ?? initialState)