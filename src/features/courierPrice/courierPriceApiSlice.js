import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const courierPriceAdapter = createEntityAdapter({})

const initialState = courierPriceAdapter.getInitialState()

export const courierPriceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourierPrices: builder.query({
            query: () => "/courier-price",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return courierPriceAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "CourierPrice", id:"LIST" },
                        ...result.ids.map(id => ({type: "CourierPrice", id}))
                    ]
                } else return [{type: "CourierPrice", id:"LIST"}]
            }
        }),



        addNewCourierPrice: builder.mutation({
            query: initialCourierPriceData => ({
                url: "/courier-price",
                method: "POST",
                body: {
                    ...initialCourierPriceData,
                }
            }),

            invalidatesTags: [
                {type: "CourierPrice", id: "LIST"}
            ]
        }),

        updateCourierPrice: builder.mutation({
            query: initialCourierPriceData => ({
                url : `/courier-price/${initialCourierPriceData.id}`,
                method: "PATCH",
                body: {
                    ...initialCourierPriceData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierPrice", id:arg.id}]
        }),

        
        deleteCourierPrice: builder.mutation({
            query: (id) => ({
                url: `/courier-price/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierPrice", id:arg.id}]
        })


        
    })
})

export const {
    useGetCourierPricesQuery,
    useAddNewCourierPriceMutation,
    useUpdateCourierPriceMutation,
    useDeleteCourierPriceMutation
} = courierPriceApiSlice

// returns the query result object
export const selectCourierPriceResult = courierPriceApiSlice.endpoints.getCourierPrices.select()

// create memoized selector
const selectCourierPriceData = createSelector(selectCourierPriceResult, courierPriceResult => courierPriceResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllCourierPrices,
    selectById : selectCourierPriceById,
    selectIds : selectCourierPriceIds
    //Pass in a selector that returns the users slice of state
} = courierPriceAdapter.getSelectors(state => selectCourierPriceData(state) ?? initialState)