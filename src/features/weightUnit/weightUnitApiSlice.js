import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const weightUnitAdapter = createEntityAdapter({})

const initialState = weightUnitAdapter.getInitialState()

export const weightUnitApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWeightUnits: builder.query({
            query: () => "/unit-type",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return weightUnitAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "WeightUnit", id:"LIST" },
                        ...result.ids.map(id => ({type: "WeightUnit", id}))
                    ]
                } else return [{type: "WeightUnit", id:"LIST"}]
            }
        }),



        addNewWeightUnit: builder.mutation({
            query: initialWeightUnitData => ({
                url: "/unit-type",
                method: "POST",
                body: {
                    ...initialWeightUnitData,
                }
            }),

            invalidatesTags: [
                {type: "WeightUnit", id: "LIST"}
            ]
        }),

        updateWeightUnit: builder.mutation({
            query: initialWeightUnitData => ({
                url : `/unit-type/${initialWeightUnitData.id}`,
                method: "PATCH",
                body: {
                    ...initialWeightUnitData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "WeightUnit", id:arg.id}]
        }),

        
        deleteWeightUnit: builder.mutation({
            query: (id) => ({
                url: `/unit-type/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "WeightUnit", id:arg.id}]
        })


        
    })
})

export const {
    useGetWeightUnitsQuery,
    useAddNewWeightUnitMutation,
    useUpdateWeightUnitMutation,
    useDeleteWeightUnitMutation
} = weightUnitApiSlice

// returns the query result object
export const selectWeightUnitResult = weightUnitApiSlice.endpoints.getWeightUnits.select()

// create memoized selector
const selectWeightUnitData = createSelector(selectWeightUnitResult, weightUnitResult => weightUnitResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllWeightUnits,
    selectById : selectWeightUnitById,
    selectIds : selectWeightUnitIds
    //Pass in a selector that returns the users slice of state
} = weightUnitAdapter.getSelectors(state => selectWeightUnitData(state) ?? initialState)