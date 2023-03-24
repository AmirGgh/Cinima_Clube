import { Box, Chip, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import GenericForm from '../../utils/genericForm'
import { styleModal } from '../../utils/theme'
export default function EditUser({ editUser, edit, user }) {
    const fields = [
        { label: 'First Name', name: 'firstName', type: 'text' },
        { label: 'Last Name', name: 'lastName', type: 'text' },
        { label: 'Session time out in minutes', name: 'SessionTimeOut', type: 'number' },
    ]
    const fieldsAdmin = [
        { label: 'Session time out in minutes', name: 'SessionTimeOut', type: 'number' },
    ]
    return (
        <Modal open={editUser} onClose={edit}>
            <Box sx={styleModal} >
                {user.member ?
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Edit {user?.member.firstName || 'Admin'}
                        </Typography>
                        <br />
                        <GenericForm typeForm={"Edit"} fields={fields} cancel={edit} user={user} />
                    </>
                    :
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>Edit Admin</Typography>
                        <br />
                        <GenericForm typeForm={"Edit"} fields={fieldsAdmin} cancel={edit} user={user} />
                    </>
                }
            </Box>
        </Modal>
    )
}
