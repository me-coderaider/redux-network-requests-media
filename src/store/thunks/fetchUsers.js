import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// NOTE -- 1st arguement -- 'users/fetch' is the 'base type' and w
// 2nd argument -- an arrow function, where we actually fetch our data basically the request.
const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get("http://localhost:3005/users");

    // DEV ONLY!!! -- Adding a pause
    await pause(1000);

    return response.data;
});

// DEV ONLY!!! -- Adding a pause
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchUsers };
