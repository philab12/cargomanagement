import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const idTypeAdapter = createEntityAdapter({})

const initialState = idTypeAdapter.getInitialState()

export const idTypeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getIdTypes: builder.query({
            query: () => "/id-types",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedData = responseData.map(data => {
               //     user.id = user.id
                    return data
                });

                return idTypeAdapter.setAll(initialState, loadedData)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: "IdType", id:"LIST" },
                        ...result.ids.map(id => ({type: "IdType", id}))
                    ]
                } else return [{type: "IdType", id:"LIST"}]
            }
        }),


        addNewIdType: builder.mutation({
            query: initialIdTypeData => ({
                url: "/id-types",
                method: "POST",
                body: {
                    ...initialIdTypeData,
                }
            }),

            invalidatesTags: [
                {type: "IdType", id: "LIST"}
            ]
        }),

        updateIdType: builder.mutation({
            query: initialIdTypeData => ({
                url : `/id-types/${initialIdTypeData.id}`,
                method: "PATCH",
                body: {
                    ...initialIdTypeData,
                }
            }),

            invalidatesTags: (result, error, arg) => [{type: "IdType", id:arg.id}]
        }),



        deleteIdType: builder.mutation({
            query: (id) => ({
              url: `/id-types/${id}`,
              method: "DELETE",
            //   body: { id },
            }),
      
            invalidatesTags: (result, error, arg) => [{ type: "IdType", id: arg.id }],
          }),
      


    })
})

export const {
    useGetIdTypesQuery,
    useAddNewIdTypeMutation,
    useUpdateIdTypeMutation,
    useDeleteIdTypeMutation
} = idTypeApiSlice

// returns the query result object
export const selectIdTypeResult = idTypeApiSlice.endpoints.getIdTypes.select()

// create memoized selector
const selectIdTypeData = createSelector(selectIdTypeResult, idTypeResult => idTypeResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them aliases using destructuring
export const {
    selectAll : selectAllIdTypes,
    selectById : selectIdTypeById,
    selectIds : selectIdTypeIds
    //Pass in a selector that returns the users slice of state
} = idTypeAdapter.getSelectors(state => selectIdTypeData(state) ?? initialState)