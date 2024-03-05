import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const transactionAdapter = createEntityAdapter({})

const initialState = transactionAdapter.getInitialState()

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransactions: builder.query({
            query: () => "/transaction-detail",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return transactionAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "Transaction", id:"LIST" },
                        ...result.ids.map(id => ({type: "Transaction", id}))
                    ]
                } else return [{type: "Transaction", id:"LIST"}]
            }
        }),



        addNewTransaction: builder.mutation({
            query: initialTransactionData => ({
                url: "/transaction-detail/create_transaction_details",
                method: "POST",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: [
                {type: "Transaction", id: "LIST"}
            ]
        }),

        updatePendingTransaction: builder.mutation({
            query: initialTransactionData => ({
                url : `/transaction-detail/${initialTransactionData.id}`,
                method: "PATCH",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Transaction", id:arg.id}]
        }),


        updateInQueueTransaction: builder.mutation({
            query: initialTransactionData => ({
                url : `/transaction-detail/in-queue-Edit/${initialTransactionData.id}`,
                method: "PATCH",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Transaction", id:arg.id}]
        }),


        updateInBoundTransaction: builder.mutation({
            query: initialTransactionData => ({
                url : `/transaction-detail/in-bound-Edit/${initialTransactionData.id}`,
                method: "PATCH",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Transaction", id:arg.id}]
        }),


        updateReceiveTransaction: builder.mutation({
            query: initialTransactionData => ({
                url : `/transaction-detail/receive-Edit/${initialTransactionData.id}`,
                method: "PATCH",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "Transaction", id:arg.id}]
        }),
        
        deletePendingTransaction: builder.mutation({
            query: (id) => ({
                url: `/transaction-detail/pending/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "Transaction", id:arg.id}]
        }),




        generateRevenue: builder.mutation({
            query: initialTransactionData => ({
                url: "/transaction-detail/revenue",
                method: "POST",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: [
                {type: "Transaction", id: "LIST"}
            ]
        }),



        generateCashierMoney: builder.mutation({
            query: initialTransactionData => ({
                url: "/transaction-detail/cashier",
                method: "POST",
                body: {
                    ...initialTransactionData,
                }
            }),

            invalidatesTags: [
                {type: "Transaction", id: "LIST"}
            ]
        }),



        
    })
})

export const {
    useGetTransactionsQuery,
    useAddNewTransactionMutation,
    useUpdatePendingTransactionMutation,
    useUpdateInQueueTransactionMutation,
    useUpdateInBoundTransactionMutation,
    useUpdateReceiveTransactionMutation,
    useDeletePendingTransactionMutation,
    useGenerateRevenueMutation,
    useGenerateCashierMoneyMutation,
} = transactionApiSlice

// returns the query result object
export const selectTransactionResult = transactionApiSlice.endpoints.getTransactions.select()

// create memoized selector
const selectTransactionData = createSelector(selectTransactionResult, transactionResult => transactionResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllTransactions,
    selectById : selectTransactionById,
    selectIds : selectTransactionIds
    //Pass in a selector that returns the users slice of state
} = transactionAdapter.getSelectors(state => selectTransactionData(state) ?? initialState)