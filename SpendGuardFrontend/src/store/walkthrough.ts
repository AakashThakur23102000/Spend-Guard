import { createSlice } from "@reduxjs/toolkit";

const WalkthroughSlice = createSlice({
    name: "walkthrough",
    initialState: {
        isFirstTime: false,
    },
    reducers: {
        updateWalkthrough: (state, action) => {
            state.isFirstTime = action.payload;
        }
    }
})

export const { updateWalkthrough } = WalkthroughSlice.actions;
export default WalkthroughSlice.reducer;