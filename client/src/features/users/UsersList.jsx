import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Loading from '../../components/Loading';
import GenericForm from '../../utils/genericForm';
import { styleModal } from '../../utils/theme';
import User from './User'
import { useAddUserMutation, useGetUsersQuery } from './usersSlice'

const UsersList = () => {
    const [addUser, setAddUser] = useState(false)
    const openAddUser = () => {
        setAddUser(!addUser)
    }
    const fields = [
        { label: 'username', name: 'username', type: 'text' },
        { label: 'Session time out in minutes', name: 'SessionTimeOut', type: 'number' },
    ]
    const user = { username: '', SessionTimeOut: '' }
    const {
        data: users,
        isLoading,
        isSuccess,
    } = useGetUsersQuery('getUsers')
    const [addNewUSER] = useAddUserMutation('addUser')

    const addNewUser = async (data) => {
        let newuser = {
            "username": data.username, "password": '---',
            "permissions": { "userPremiss": data.premissions },
            "user": { "firstName": '---', "lastName": '---', "SessionTimeOut": data.SessionTimeOut },
            member: { "email": '---', "city": '---', "firstName": '---', "lastName": '---' }
        }
        await addNewUSER({ body: newuser })
    }
    let content;
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = users.ids.map(id => <User key={id} id={id} />)
    }
    return (
        <Box>
            <Button sx={{ margin: '1rem' }} variant='contained' onClick={openAddUser}>Add New User</Button>
            <Modal open={addUser} onClose={openAddUser}>
                <Box sx={styleModal} >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Add New User
                    </Typography>
                    <br />
                    <GenericForm typeForm={"Add"} fields={fields} user={user} cancel={openAddUser} ditails={user} onSubmit={addNewUser} />
                </Box>
            </Modal>
            <Grid container display="flex" spacing={2}  >
                {content}
            </Grid>
        </Box>
    )
}

export default UsersList