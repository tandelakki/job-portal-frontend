import { createSlice } from "@reduxjs/toolkit";
const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null,
        
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload
        },
        clearApplicants: (state) => {
            state.applicants = []
        }
    }
})
export const { setAllApplicants, clearApplicants } = applicationSlice.actions
export default applicationSlice.reducer