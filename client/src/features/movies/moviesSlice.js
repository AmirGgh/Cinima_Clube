import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const moviesAdapter = createEntityAdapter()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMovies: builder.query({
            query: () => '/movies',
            transformResponse: responseData => {
                const movies = responseData.map(movie => ({ ...movie, id: movie._id }))
                return moviesAdapter.setAll(moviesAdapter.getInitialState(), movies)
            },
            providesTags: (result, error, arg) => [
                { type: 'Movie', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Movie', id }))
            ]
        }),
        getMovieById: builder.query({
            query: id => `/movies/?id=${id}`,
            transformResponse: responseData => {
                const movie = { ...responseData, id: responseData._id }
                return moviesAdapter.setAll(moviesAdapter.getInitialState(), movie)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Movie', id }))
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
