import { Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography, Select } from '@mui/material';

import { useState } from 'react';
import { useGetSubscriptionsQuery, useGetMembersQuery } from './subscriptionsSlice'
import { useGetMovieByIdQuery } from '../movies/moviesSlice';
import MoviesWatched from './MoviesWatched';


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
                <hr /> <CardActions>
                    {!newSubscribe && <Button size="small" onClick={newSubs}>subscribe to new move</Button>}

                </CardActions>
                Movies Watched: {content && content}

            </CardContent>

        </Card >
    )
}

export default Subscription

// {newSubscribe &&
//     <>
//         {/* <MovieList watched={subscription?.movieWatched} /> */}
//     </>
// }

// // import Select from '@mui/joy/Select';
// // import Option from '@mui/joy/Option';

// // const MovieList = (watched) => {

// //     return (
// //         // <Select defaultValue="dog">
// //         //     <Option value="dog">Dog</Option>
// //         //     <Option value="cat">Cat</Option>
// //         // </Select>
// //     );
// // }