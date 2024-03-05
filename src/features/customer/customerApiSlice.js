import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const customerAdapter = createEntityAdapter({})

const initialState = customerAdapter.getInitialState()

export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCustomers: builder.query({
            query: () => "/customers",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return customerAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "Customer", id:"LIST" },
                        ...result.ids.map(id => ({type: "Customer", id}))
                    ]
                } else return [{type: "Customer", id:"LIST"}]
            }
        }),



        addNewCustomer: builder.mutation({
            query: initialCustomerData => ({
                url: "/customers",
                method: "POST",
                body: {
                    ...initialCustomerData,
                }
            }),

            invalidatesTags: [
                {type: "Customer", id: "LIST"}
            ]
        }),

        updateCustomer: builder.mutation({
            query: initialCustomerData => ({
                url : `/customers/${initialCustomerData.id}`,
                method: "PATCH",
                body: {
                    ...initialCustomerData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Customer", id:arg.id}]
        }),

        
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "Customer", id:arg.id}]
        })


        
    })
})

export const {
    useGetCustomersQuery,
    useAddNewCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApiSlice

// returns the query result object
export const selectCustomerResult = customerApiSlice.endpoints.getCustomers.select()

// create memoized selector
const selectCustomerData = createSelector(selectCustomerResult, customerResult => customerResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllCustomers,
    selectById : selectCustomerById,
    selectIds : selectCustomerIds
    //Pass in a selector that returns the users slice of state
} = customerAdapter.getSelectors(state => selectCustomerData(state) ?? initialState)