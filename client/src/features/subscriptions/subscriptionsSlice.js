import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";
// slice of members and subscriptions
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
        updateMember: builder.mutation({
            query: initialMember => ({
                url: `/Members/${initialMember.id}`,
                method: 'PUT',
                body: initialMember.body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Member', id: arg.id }
            ]
        }),
        addNewSubscription: builder.mutation({
            query: initialSubscriptions => ({
                url: '/subscriptions',
                method: 'POST',
                body: initialSubscriptions.body
            }),
            invalidatesTags: [
                { type: 'Subscription', id: "LIST" }
            ]
        }),

        updateSubscriptions: builder.mutation({
            query: initialSubscriptions => ({
                url: `/subscriptions/${initialSubscriptions.id}`,
                method: 'PUT',
                body: initialSubscriptions.body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Subscription', id: arg.id }
            ]
        }),

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

export const {
    useGetSubscriptionsQuery,
    useGetMembersQuery,
    useAddNewSubscriptionMutation,
    useUpdateSubscriptionsMutation,
    useUpdateMemberMutation,
    useDeleteSubscriptionMutation,
} = extendedApiSlice




