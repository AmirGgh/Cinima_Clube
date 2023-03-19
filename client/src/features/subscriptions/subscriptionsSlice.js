import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const subscriptionsAdapter = createEntityAdapter()
const membersAdapter = createEntityAdapter()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubscriptions: builder.query({
            query: () => '/subscriptions',
            transformResponse: responseData => {
                const subscriptions = responseData.map(subscription => ({ ...subscription, id: subscription._id }))
                return subscriptionsAdapter.setAll(subscriptionsAdapter.getInitialState(), subscriptions)
            },
            providesTags: (result, error, arg) => [
                { type: 'Subscription', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Subscription', id }))
            ]
        }),
        getMembers: builder.query({
            query: () => '/members',
            transformResponse: responseData => {
                const members = responseData.map(members => ({ ...members, id: members._id }))
                return membersAdapter.setAll(membersAdapter.getInitialState(), members)
            },
            providesTags: (result, error, arg) => [
                { type: 'Member', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Member', id }))
            ]
        }),
        getSubscriptionById: builder.query({
            query: id => `/subscriptions/?id=${id}`,
            transformResponse: responseData => {
                const subscription = { ...responseData, id: responseData._id }
                return subscriptionsAdapter.setAll(subscriptionsAdapter.getInitialState(), subscription)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Subscription', id }))
            ]
        }),
        // addNewMovie: builder.mutation({
        //     query: initialMovie => ({
        //         url: '/movies',
        //         method: 'POST',
        //         body: movie
        //     }),
        //     invalidatesTags: [
        //         { type: 'Movie', id: "LIST" }
        //     ]
        // }),
        // updateMovie: builder.mutation({
        //     query: initialMovie => ({
        //         url: `/movies/${initialMovie.id}`,
        //         method: 'PUT',
        //         body: movie
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'Movie', id: arg.id }
        //     ]
        // }),
        // deleteMovie: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `/movies/${id}`,
        //         method: 'DELETE',
        //         body: id
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'Movie', id: arg.id }
        //     ]
        // })
    })
})

// useGetMoviesByUserIdQuery,
export const {
    useGetSubscriptionsQuery,
    useGetMembersQuery,
    useGetSubscriptionByIdQuery,
    useAddNewSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} = extendedApiSlice
