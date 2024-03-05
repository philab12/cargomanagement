import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const courierStageAdapter = createEntityAdapter({})

const initialState = courierStageAdapter.getInitialState()

export const courierStageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourierStages: builder.query({
            query: () => "/courier-send-stages-setup",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return courierStageAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "CourierStage", id:"LIST" },
                        ...result.ids.map(id => ({type: "CourierStage", id}))
                    ]
                } else return [{type: "CourierStage", id:"LIST"}]
            }
        }),



        addNewCourierStage: builder.mutation({
            query: initialCourierStageData => ({
                url: "/courier-send-stages-setup",
                method: "POST",
                body: {
                    ...initialCourierStageData,
                }
            }),

            invalidatesTags: [
                {type: "CourierStage", id: "LIST"}
            ]
        }),

        updateCourierStage: builder.mutation({
            query: initialCourierStageData => ({
                url : `/courier-send-stages-setup/${initialCourierStageData.id}`,
                method: "PATCH",
                body: {
                    ...initialCourierStageData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierStage", id:arg.id}]
        }),

        
        deleteCourierStage: builder.mutation({
            query: (id) => ({
                url: `/courier-send-stages-setup/${id}`,
                method: "DELETE",
                // body: {id}
            }),

            invalidatesTags: (result, error, arg) => [{type: "CourierStage", id:arg.id}]
        })


        
    })
})

export const {
    useGetCourierStagesQuery,
    useAddNewCourierStageMutation,
    useUpdateCourierStageMutation,
    useDeleteCourierStageMutation
} = courierStageApiSlice

// returns the query result object
export const selectCourierStageResult = courierStageApiSlice.endpoints.getCourierStages.select()

// create memoized selector
const selectCourierStageData = createSelector(selectCourierStageResult, courierStageResult => courierStageResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllCourierStages,
    selectById : selectCourierStageById,
    selectIds : selectCourierStageIds
    //Pass in a selector that returns the users slice of state
} = courierStageAdapter.getSelectors(state => selectCourierStageData(state) ?? initialState)