import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter({
    selectId: (user) => user._id
})
const permissionAdapter = createEntityAdapter()
const userJsonDataAdapter = createEntityAdapter()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll(usersAdapter.getInitialState(), responseData);
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        updatePassUser: builder.mutation({
            query: initialUser => ({
                url: `/users/${initialUser.id}`,
                method: 'PUT',
                body: initialUser.body
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        getJsonPremi: builder.query({
            query: () => '/jsonPremi',
            transformResponse: responseData => {
                return permissionAdapter.setAll(permissionAdapter.getInitialState(), responseData);
            },
            providesTags: (result, error, arg) => [
                { type: 'Permission', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Permission', id }))
            ]
        }),
        updateJsonPremi: builder.mutation({
            query: initialJsonPremi => ({
                url: `/jsonPremi/${initialJsonPremi.id}`,
                method: 'PUT',
                body: initialJsonPremi.body
            }),
            invalidatesTags: [
                { type: 'Permission', id: "LIST" }
            ]
        }),
        getJsonData: builder.query({
            query: () => '/JsonData',
            transformResponse: responseData => {
                return userJsonDataAdapter.setAll(userJsonDataAdapter.getInitialState(), responseData);
            },
            providesTags: (result, error, arg) => [
                { type: 'JsonUser', id: "LIST" },
                ...result.ids.map(id => ({ type: 'JsonUser', id }))
            ]
        }),
        updateJsonData: builder.mutation({
            query: initialJsonData => ({
                url: `/JsonData/${initialJsonData.id}`,
                method: 'PUT',
                body: initialJsonData.body
            }),
            invalidatesTags: [
                { type: 'JsonData', id: "LIST" }
            ]
        }),
        addUser: builder.mutation({
            query: initialUsers => ({
                url: `/users`,
                method: 'POST',
                body: initialUsers.body
            }),
            invalidatesTags: [
                { type: 'NewUsers', id: "LIST" }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUserPremiss: builder.mutation({
            query: ({ id }) => ({
                url: `/jsonPremi/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUserJsonData: builder.mutation({
            query: ({ id }) => ({
                url: `/JsonData/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetUsersQuery,
    useUpdatePassUserMutation,
    useGetJsonPremiQuery,
    useGetJsonDataQuery,
    useUpdateJsonPremiMutation,
    useUpdateJsonDataMutation,
    useAddUserMutation,
    useDeleteUserMutation,
    useDeleteUserPremissMutation,
    useDeleteUserJsonDataMutation,
} = usersApiSlice


