import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer, //albums: albumsApi.reducer, // might lead to issue if typo is there
        [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    },
});

// TEMPORARY, FOR TESTING AND LOOKING INTO THE STORE
// window.store = store;

setupListeners(store.dispatch); // 1 time step-up

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";

export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} from "./apis/albumsApi";

export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,
} from "./apis/photosApi";
