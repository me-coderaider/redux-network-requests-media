import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY!!! -- Adding a pause
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        fetchFn: async (...args) => {
            // REMOVE FOR PRODUCTION
            await pause(1000);
            return fetch(...args); // adding to override the fetch() used by RTK-Q
        },
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    // return [{ type: "Album", id: album.userId }]; // replacing with CLEVER TAG implementation
                    return [{ type: "Album", id: album.id }]; // replacing with CLEVER TAG implementation
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: "DELETE",
                    };
                },
            }),
            addAlbum: builder.mutation({
                // invalidatesTags: ["Album"], // providing dyamic query and avoid excessing results
                invalidatesTags: (result, error, user) => {
                    // return [{ type: "Album", id: user.id }]; // replacing with CLEVER TAG implementation
                    return [{ type: "UsersAlbums", id: user.id }];
                },

                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        },
                    };
                },
            }),
            fetchAlbums: builder.query({
                // providesTags: ["Album"], // providing dyamic query and avoid excessing results
                providesTags: (result, error, user) => {
                    // return [{ type: "Album", id: user.id }]; // replacing with CLEVER TAG implementation

                    const tags = result.map((album) => {
                        // little grouping of tags one for each album
                        return { type: "Album", id: album.id };
                    });
                    tags.push({ type: "UsersAlbums", id: user.id });
                    return tags;
                },

                query: (user) => {
                    return {
                        url: "/albums",
                        params: {
                            userId: user.id,
                        },
                        method: "GET",
                    };
                },
            }),
        };
    },
});

export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
