import { Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { useGetUsersQuery } from './usersSlice';
import EditUser from './EditUser';


const User = ({ id }) => {
    const { user } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })
    // console.log(user)
    const [deleteUser, setDeleteUser] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const delUser = () => {
        setDeleteUser(!deleteUser)
    }
    const edit = () => {
        setEditUser(!editUser)
    }


    return (
        <Card sx={{
            my: 1,
            mx: 1
        }}>
            <CardContent>
                <Typography >Name: {user.member.firstName} {user.member.lastName}</Typography >
                <Typography > Username: {user.username}</Typography >
                <Typography > Email: {user.member.email}</Typography >
                <Typography > City: {user.member.city}</Typography >
                <Typography > Session Time Out: {user.usersData.SessionTimeOut} minutes</Typography >
                <Typography > Created Date: {user.usersData.CreatedDate}</Typography >
                <Typography > Permissions: {user?.premissions.join(", ")}</Typography >
            </CardContent>
            <CardActions>
                <Button size="small" onClick={edit}>Edit</Button>
                <Button size="small" onClick={delUser}>Delete</Button>
                <EditUser edit={edit} editUser={editUser} user={user} />
                {/* <EditMovie edit={edit} editMovie={editMovie} movie={movie} /> */}
            </CardActions>
        </Card>
    )
}

export default User
