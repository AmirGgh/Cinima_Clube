import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users/allUsers',
            transformResponse: responseData => {
                const entities = responseData.data;
                return usersAdapter.setAll(usersAdapter.getInitialState(), entities);
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice


