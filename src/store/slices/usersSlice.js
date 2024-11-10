import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            // update our state object to show user that we're loading data
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // update our state object to show user that we've successfully fetched data.
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            // update our state object to show user that request failed.
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const usersReducer = usersSlice.reducer;
