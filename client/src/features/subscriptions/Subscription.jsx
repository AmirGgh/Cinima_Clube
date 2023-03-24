import { Button, Card, CardActions, CardContent, Typography, Select, FormControl, InputLabel, MenuItem, Box } from '@mui/material';

import { useState } from 'react';
import { useGetSubscriptionsQuery, useGetMembersQuery } from './subscriptionsSlice'
import { useGetMoviesQuery } from '../movies/moviesSlice';
import MoviesWatched from './MoviesWatched';
import Loading from '../../components/Loading';
import Movie from '../movies/Movie';

const MovieList = ({ newSubs, moviesWatched }) => {
    const {
        data: movies,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetMoviesQuery('getMovies')


    const [newMovie, setNewMovie] = useState('');

    const handleChange = (event) => {
        setNewMovie(event.target.value);
        console.log(event.target.value)
    };
    let content;
    if (isLoading) {
        content = <Loading />
    }

    const filterMovieIds = movies?.ids.filter((id) => !moviesWatched?.includes(id))
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
                    movies.entities[id].name

                </Select>
            </FormControl>
            <br />
            <Button onClick={newSubs}>cancel</Button>
            <Button onClick={newSubs}>subscribe</Button>
        </Box>
    );
}
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
    if (subscription) {
        content = subscription?.movieWatched.map((id, index) => <MoviesWatched date={subscription.dateWatched[index]} key={id} id={id} />)
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
                    {newSubscribe && <MovieList newSubs={newSubs} moviesWatched={subscription?.movieWatched} />}
                </CardActions>
                Movies Watched: {content && content}

            </CardContent>

        </Card >
    )
}

export default Subscription

