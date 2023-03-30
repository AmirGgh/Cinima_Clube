import { Button, Card, CardActions, CardContent, Typography, Select, FormControl, InputLabel, MenuItem, Box } from '@mui/material';

import { useState } from 'react';
import { useGetSubscriptionsQuery, useGetMembersQuery, useAddNewSubscriptionMutation, useUpdateSubscriptionsMutation, useUpdateMemberMutation } from './subscriptionsSlice'
import { useGetMoviesQuery, useUpdateMovieMutation } from '../movies/moviesSlice';
import MoviesWatched from './MoviesWatched';
import Loading from '../../components/Loading';

const MovieList = ({ newSubs, subscribeID, memberID, memberSubs, subscriptionWatched }) => {
    console.log(subscribeID)
    const {
        data: movies,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetMoviesQuery('getMovies')
    const [newSubscribe] = useAddNewSubscriptionMutation()// in subscriptions
    const [updateSubscribe] = useUpdateSubscriptionsMutation()// in subscriptions
    const [updateMovieSubscriptions] = useUpdateMovieMutation() // in movie

    const [newMovie, setNewMovie] = useState('');

    const handleChange = (event) => {
        setNewMovie(event.target.value);
    };


    const subscribeMovie = async () => {
        const date = new Date().toDateString();
        if (!memberSubs) {
            try {
                const subs = await newSubscribe({ body: { memberID: memberID, movieWatched: [{ movieID: newMovie, date }] } }).unwrap()
                if (subs) {

                    await updateMovieSubscriptions({ id: newMovie, body: { subsWatches: { movieID: newMovie, date } } }).unwrap()
                }
            } catch (err) {
                console.error('Failed to edit the subscribe', err)
            }
        } else if (!!memberSubs) {
            console.log("subs exist!")
        }
        newSubs()
    }

    let content;
    if (isLoading) {
        content = <Loading />
    }


    const filterMovieIds = movies?.ids.filter((id) => !subscriptionWatched?.movieWatched?.find((mWatch) => mWatch.movieID === id))

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">New Movie</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={newMovie}
                    label="Movie"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>{newMovie}</em>
                    </MenuItem>
                    {
                        filterMovieIds?.map((id, index) => (<MenuItem key={index} value={movies.entities[id]._id}>{movies.entities[id].name}</MenuItem>))
                    }

                </Select>
            </FormControl>
            <br />
            <Button onClick={newSubs}>cancel</Button>
            <Button onClick={subscribeMovie}>subscribe</Button>
        </Box>
    );
}
//------------------------------------------------------------------------------------------------------------------------------------------
const Subscription = ({ id }) => {
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[id]
        }),
    })
    const { subscription, isSuccess } = useGetSubscriptionsQuery('getSubscriptions', {
        selectFromResult: ({ data }) => ({
            subscription: data?.entities[member._id]
        }),
    })
    const [newSubscribe, setNewSubscribe] = useState(false)
    const newSubs = () => {
        setNewSubscribe(!newSubscribe)
    }

    let content
    if (subscription?.movieWatched) {
        content = subscription.movieWatched.map((movie, index) => <MoviesWatched date={movie.date} key={movie.movieID} id={movie.movieID} />)
    }
    return (
        <Card sx={{
            my: 1,
            mx: 1
        }} >
            <CardContent>
                <Typography > First Name: {member.firstName}{member.lastName}</Typography >
                <Typography > Email: {member.email}</Typography >
                <Typography > City: {member.city}</Typography >
                <hr />
                <CardActions>
                    {!newSubscribe && <Button size="small" onClick={newSubs}>subscribe to new move</Button>}
                    {newSubscribe && <MovieList newSubs={newSubs} memberID={id} subscriptionWatched={subscription} />}
                </CardActions>
                Movies Watched: {content && content}
            </CardContent>
        </Card >
    )
}

export default Subscription

