import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const moviesAdapter = createEntityAdapter({
    selectId: (movie) => movie._id
})

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMovies: builder.query({
            query: () => '/movies',
            transformResponse: responseData => {
                return moviesAdapter.setAll(moviesAdapter.getInitialState(), responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Movie', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Movie', id }))
            ]
        }),
        deleteMovie: builder.mutation({
            query: ({ id }) => ({
                url: `/movies/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Movie', id: arg.id }
            ]
        })
    })
})

// useGetMoviesByUserIdQuery,
export const {
    useGetMoviesQuery,
    useAddNewMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
} = extendedApiSlice




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