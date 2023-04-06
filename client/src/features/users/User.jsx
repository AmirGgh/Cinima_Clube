import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { useDeleteUserJsonDataMutation, useDeleteUserMutation, useDeleteUserPremissMutation, useGetJsonDataQuery, useGetJsonPremiQuery, useGetUsersQuery } from './usersSlice';
import EditUser from './EditUser';
import { useDeleteMembersMutation, useGetMembersQuery } from '../subscriptions/subscriptionsSlice';


const User = ({ id }) => {

    const { permi } = useGetJsonPremiQuery('getJsonPremi', {
        selectFromResult: ({ data }) => ({
            permi: data?.entities[id]
        }),
    })
    const { user } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })
    const { userJsonData } = useGetJsonDataQuery('getJsonPremi', {
        selectFromResult: ({ data }) => ({
            userJsonData: data?.entities[id]
        }),
    })
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[user.memberID]
        }),
    })

    const [deleteUser] = useDeleteUserMutation('deleteUser')
    const [deleteUserPrem] = useDeleteUserPremissMutation('deleteUserPremiss')
    const [deleteUserData] = useDeleteUserJsonDataMutation('deleteUserJsonData')
    const [deleteMember] = useDeleteMembersMutation('deleteMembers')
    const [editUser, setEditUser] = useState(false)
    const delUser = async (id) => {
        console.log({ id })
        console.log({ id: member._id })
        // await deleteUserPrem({ id: id })
        // await deleteUserData({ id: id })
        await deleteMember({ id: member._id })
        await deleteUser({ id: id })
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
                {member ? <>
                    <Typography variant='h5' > {member?.firstName} {member?.lastName}</Typography >
                    <Typography > Username: {user?.username}</Typography >
                    <Typography > Email: {member?.email}</Typography >
                    <Typography > City: {member?.city}</Typography >
                </> : <>
                    <Typography variant='h5' >Admin</Typography>
                    <Typography > Username: {user?.username}</Typography >
                </>
                }
                <Typography > Session Time Out: {userJsonData?.SessionTimeOut} minutes</Typography >
                <Typography > Created Date: {userJsonData?.CreatedDate}</Typography >
                <Typography paragraph={true}> Permissions: {permi?.userPremiss.join(", ")}</Typography >
            </CardContent>
            <CardActions>
                <Button size="small" onClick={edit}>Edit</Button>
                <Button size="small" onClick={() => delUser(user._id)}>Delete</Button>
                <EditUser edit={edit} editUser={editUser} user={user} member={member} userJsonData={userJsonData} />
            </CardActions>
        </Card>
    )
}

export default User
