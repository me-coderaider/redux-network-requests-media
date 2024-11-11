import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    // FIX IT :: In case of 'DELETE', we can't just simply return 'response.data'
    // as 'response.data' might be an EMPTY-OBJECT
    // So, we'll return the 'user' which we're trying to delete.
    // return response.data;
    return user;
});

export { removeUser };
