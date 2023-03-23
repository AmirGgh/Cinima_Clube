import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const subscriptionsAdapter = createEntityAdapter(
    {
        selectId: (subscription) => subscription.memberID
    }
)
const membersAdapter = createEntityAdapter(
    {
        selectId: (member) => member._id
    }
)

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubscriptions: builder.query({
            query: () => '/subscriptions',
            transformResponse: responseData => {

                return subscriptionsAdapter.setAll(subscriptionsAdapter.getInitialState(), responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Subscription', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Subscription', id }))
            ]
        }),
        getMembers: builder.query({
            query: () => '/members',
            transformResponse: responseData => {

                return membersAdapter.setAll(membersAdapter.getInitialState(), responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Member', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Member', id }))
            ]
        }),
        // getSubscriptionByMemberId: builder.query({
        //     query: (memberId) => `/subscriptions/?memberID=${memberId}`,
        //     transformResponse: (responseData) => {
        //         // transform the response as needed
        //         return responseData;
        //     },
        //     providesTags: (result, error, arg) => [
        //         { type: 'Subscription', id: result ? result._id : arg },
        //     ],
        // }),
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
    useAddNewSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} = extendedApiSlice




