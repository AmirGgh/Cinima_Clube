import { Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { useGetSubscriptionByIdQuery, useGetMembersQuery } from './subscriptionsSlice'




const Subscription = ({ id }) => {
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[id]
        }),
    })
    // console.log(member)

    const {
        data: subscriptions,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetSubscriptionByIdQuery(member.id);
    // const { ids, entities } = subscriptions
    // console.log({ ids, entities })
    // const [deleteMember, setDeleteMember] = useState(false)
    // const [editMember, setEditMember] = useState(false)
    // const delMember = () => {
    //     setDeleteMember(!deleteMember)
    // }
    // const edit = () => {
    //     setEditMember(!editMember)
    // }


    return (
        <Card sx={{
            my: 1,
            mx: 1
        }}>
            <CardContent>
                <Typography > First Name: {member.firstName}{member.lastName}</Typography >
                <Typography > Email: {member.email}</Typography >
                <Typography > City: {member.city}</Typography >
                <hr />
                <Typography > Movies Watched</Typography >

            </CardContent>
            <CardActions>
                {/* <Button size="small" onClick={edit}>Edit</Button>
                <Button size="small" onClick={delUser}>Delete</Button>
                <EditUser edit={edit} editUser={editUser} user={user} />
                <EditMovie edit={edit} editMovie={editMovie} movie={movie} /> */}
            </CardActions>
        </Card >
    )
}

export default Subscription
