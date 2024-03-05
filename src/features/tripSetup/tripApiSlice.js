import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const tripAdapter = createEntityAdapter({})

const initialState = tripAdapter.getInitialState()

export const tripApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTrips: builder.query({
            query: () => "/trip-setup",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return tripAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "Trip", id:"LIST" },
                        ...result.ids.map(id => ({type: "Trip", id}))
                    ]
                } else return [{type: "Trip", id:"LIST"}]
            }
        }),



        addNewTrip: builder.mutation({
            query: initialTripData => ({
                url: "/trip-setup",
                method: "POST",
                body: {
                    ...initialTripData,
                }
            }),

            invalidatesTags: [{type: "Trip", id: "LIST"}]
        }),

        updateTrip: builder.mutation({
            query: initialTripData => ({
                url : `/trip-setup/${initialTripData.id}`,
                method: "PATCH",
                body: {
                    ...initialTripData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Trip", id:arg.id}]
        }),

        
        deleteTrip: builder.mutation({
            query: (id) => ({
                url: `/trip-setup/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "Trip", id:arg.id}]
        })


        
    })
})

export const {
    useGetTripsQuery,
    useAddNewTripMutation,
    useUpdateTripMutation,
    useDeleteTripMutation
} = tripApiSlice

// returns the query result object
export const selectTripResult = tripApiSlice.endpoints.getTrips.select()

// create memoized selector
const selectTripData = createSelector(selectTripResult, tripResult => tripResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllTrips,
    selectById : selectTripById,
    selectIds : selectTripIds
    //Pass in a selector that returns the users slice of state
} = tripAdapter.getSelectors(state => selectTripData(state) ?? initialState)