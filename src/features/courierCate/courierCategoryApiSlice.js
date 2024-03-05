import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const courierCategoryAdapter = createEntityAdapter({})

const initialState = courierCategoryAdapter.getInitialState()

export const courierCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourierCategorys: builder.query({
            query: () => "/courier-cate",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return courierCategoryAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "CourierCategory", id:"LIST" },
                        ...result.ids.map(id => ({type: "CourierCategory", id}))
                    ]
                } else return [{type: "CourierCategory", id:"LIST"}]
            }
        }),



        addNewCourierCategory: builder.mutation({
            query: initialCourierCategoryData => ({
                url: "/courier-cate",
                method: "POST",
                body: {
                    ...initialCourierCategoryData,
                }
            }),

            invalidatesTags: [
                {type: "CourierCategory", id: "LIST"}
            ]
        }),

        updateCourierCategory: builder.mutation({
            query: initialCourierCategoryData => ({
                url : `/courier-cate/${initialCourierCategoryData.id}`,
                method: "PATCH",
                body: {
                    ...initialCourierCategoryData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierCategory", id:arg.id}]
        }),

        
        deleteCourierCategory: builder.mutation({
            query: (id) => ({
                url: `/courier-cate/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierCategory", id:arg.id}]
        })


        
    })
})

export const {
    useGetCourierCategorysQuery,
    useAddNewCourierCategoryMutation,
    useUpdateCourierCategoryMutation,
    useDeleteCourierCategoryMutation
} = courierCategoryApiSlice

// returns the query result object
export const selectCourierCategoryResult = courierCategoryApiSlice.endpoints.getCourierCategorys.select()

// create memoized selector
const selectCourierCategoryData = createSelector(selectCourierCategoryResult, courierCategoryResult => courierCategoryResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllCourierCategorys,
    selectById : selectCourierCategoryById,
    selectIds : selectCourierCategoryIds
    //Pass in a selector that returns the users slice of state
} = courierCategoryAdapter.getSelectors(state => selectCourierCategoryData(state) ?? initialState)