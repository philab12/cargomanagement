import { createSlice } from "@reduxjs/toolkit";

const transSlice = createSlice({
    name: "trans",
    initialState: {tracking_number: null, track_rep:null},
    reducers: {
        setTrackingNumber: (state, action) => {
            const {tracking_number} = action.payload
            state.tracking_number = tracking_number
           

        },

        setTrackRep: (state, action) => {
            const {track_rep} = action.payload
            state.track_rep = track_rep
        }

    }
})

export const {setTrackingNumber,setTrackRep} = transSlice.actions


export const selectTrackingNumber = (state) => state.trans.tracking_number
export const selectTrackRep = (state) => state.trans.track_rep


export default transSlice.reducer
