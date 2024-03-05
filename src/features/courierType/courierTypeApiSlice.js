import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const courierTypeAdapter = createEntityAdapter({})

const initialState = courierTypeAdapter.getInitialState()

export const courierTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourierTypes: builder.query({
            query: () => "/courier-type",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return courierTypeAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "CourierType", id:"LIST" },
                        ...result.ids.map(id => ({type: "CourierType", id}))
                    ]
                } else return [{type: "CourierType", id:"LIST"}]
            }
        }),



        addNewCourierType: builder.mutation({
            query: initialCourierTypeData => ({
                url: "/courier-type",
                method: "POST",
                body: {
                    ...initialCourierTypeData,
                }
            }),

            invalidatesTags: [
                {type: "CourierType", id: "LIST"}
            ]
        }),

        updateCourierType: builder.mutation({
            query: initialCourierTypeData => ({
                url : `/courier-type/${initialCourierTypeData.id}`,
                method: "PATCH",
                body: {
                    ...initialCourierTypeData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierType", id:arg.id}]
        }),

        
        deleteCourierType: builder.mutation({
            query: (id) => ({
                url: `/courier-type/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierType", id:arg.id}]
        })


        
    })
})

export const {
    useGetCourierTypesQuery,
    useAddNewCourierTypeMutation,
    useUpdateCourierTypeMutation,
    useDeleteCourierTypeMutation
} = courierTypeApiSlice

// returns the query result object
export const selectCourierTypeResult = courierTypeApiSlice.endpoints.getCourierTypes.select()

// create memoized selector
const selectCourierTypeData = createSelector(selectCourierTypeResult, courierTypeResult => courierTypeResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllCourierTypes,
    selectById : selectCourierTypeById,
    selectIds : selectCourierTypeIds
    //Pass in a selector that returns the users slice of state
} = courierTypeAdapter.getSelectors(state => selectCourierTypeData(state) ?? initialState)