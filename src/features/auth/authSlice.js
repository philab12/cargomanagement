import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {access_token: null,email:null, roles:null, branch_id:null, password:null, isEdit:false, page:null, id:null, forgotPassword:false, resetPassword:false},
    reducers: {
        setCredentials: (state, action) => {
            const {access_token, email, roles, branch_id, password} = action.payload
            state.access_token = access_token
            state.email = email
            state.roles = roles
            state.branch_id = branch_id

        },

        setForgotPassword: (state, action) => {
            state.forgotPassword = action.payload
        },

        setResetPassword: (state, action) => {
            state.resetPassword = action.payload
          //  console.log("athhhhhhhhhhhhhhhh")
        },

        setActionPage: (state, action) => {
            const {isEdit, page, id} = action.payload
            state.isEdit = isEdit
            state.page = page
            state.id = id
        },

        logOut: (state,action) => {
            state.access_token = null
            state.email = null
            state.roles = null
            state.branch_id = null
            state.isEdit = false
            state.page = null
            state.id = null
        }
    }
})

export const {setCredentials, setActionPage,logOut, setForgotPassword, setResetPassword} = authSlice.actions


export const selectCurrentToken = (state) => state.auth.access_token
export const selectCurrentRole = (state) => state.auth.roles
export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentBranchId = (state) => state.auth.branch_id
export const selectIsEdit = (state) => state.auth.isEdit
export const selectPage = (state) => state.auth.page
export const selectId = (state) => state.auth.id
export const selectForgotPassword = (state) => state.auth.forgotPassword
export const selectResetPassword = (state) => state.auth.resetPassword

export default authSlice.reducer
