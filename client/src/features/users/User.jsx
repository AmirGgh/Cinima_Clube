import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
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
                {user.member ? <>
                    <Typography variant='h5' > {user.member.firstName} {user.member.lastName}</Typography >
                    <Typography > Username: {user.username}</Typography >
                    <Typography > Email: {user.member.email}</Typography >
                    <Typography > City: {user.member.city}</Typography >
                </> : <>
                    <Typography variant='h5' >Admin</Typography>
                    <Typography > Username: {user.username}</Typography >
                </>
                }
                <Typography > Session Time Out: {user.usersData.SessionTimeOut} minutes</Typography >
                <Typography > Created Date: {user.usersData.CreatedDate}</Typography >
                <Typography paragraph={true}> Permissions: {user?.premissions.join(", ")}</Typography >
            </CardContent>
            <CardActions>
                <Button size="small" onClick={edit}>Edit</Button>
                <Button size="small" onClick={delUser}>Delete</Button>
                <EditUser edit={edit} editUser={editUser} user={user} />
            </CardActions>
        </Card>
    )
}

export default User
