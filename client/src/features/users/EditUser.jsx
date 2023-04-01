import { Box, Chip, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { redirect } from 'react-router-dom'
import GenericForm from '../../utils/genericForm'
import { styleModal } from '../../utils/theme'
import { useUpdateMemberMutation } from '../subscriptions/subscriptionsSlice'
import { useGetJsonDataQuery, useUpdateJsonDataMutation, useUpdateJsonPremiMutation } from './usersSlice'

export default function EditUser({ editUser, edit, user, member }) {
    const fields = [
        { label: 'First Name', name: 'firstName', type: 'text' },
        { label: 'Last Name', name: 'lastName', type: 'text' },
        { label: 'Session time out in minutes', name: 'SessionTimeOut', type: 'number' },
    ]
    const fieldsAdmin = [
        { label: 'Session time out in minutes', name: 'SessionTimeOut', type: 'number' },
    ]
    const { userJsonData } = useGetJsonDataQuery('getJsonPremi', {
        selectFromResult: ({ data }) => ({
            userJsonData: data?.entities[user._id]
        }),
    })
    const userDitails = { firstName: member?.firstName, lastName: member?.lastName, SessionTimeOut: userJsonData?.SessionTimeOut }
    // console.log(member)

    const [updateJsonPremi] = useUpdateJsonPremiMutation()
    const [updateMember] = useUpdateMemberMutation()
    const [updateJsonData] = useUpdateJsonDataMutation()
    const updateUser = async (data) => {
        if (data.firstName?.length > 0) {
            await updateMember({ id: member?._id, body: { firstName: data.firstName } }).unwrap()
            await updateJsonData({ id: user._id, body: { ...userJsonData, firstName: data.firstName } }).unwrap()
        }
        if (data.lastName?.length > 0) {
            await updateMember({ id: member?._id, body: { lastName: data.lastName } }).unwrap()
            await updateJsonData({ id: user._id, body: { ...userJsonData, lastName: data.lastName } }).unwrap()
        }
        if (+data.SessionTimeOut > 0) {
            await updateJsonData({ id: user._id, body: { ...userJsonData, SessionTimeOut: +data.SessionTimeOut } }).unwrap()
        }
        if (data?.premissions && data.premissions.length > 0) {
            console.log({ id: user._id, body: { id: user._id, userPremiss: data.premissions } })
            await updateJsonPremi({ id: user._id, body: { id: user._id, userPremiss: data.premissions } }).unwrap()
        }
    }
    return (
        <Modal open={editUser} onClose={edit}>
            <Box sx={styleModal} >
                {member ?
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Edit {member.firstName || 'Admin'}
                        </Typography>
                        <br />
                        <GenericForm typeForm={"Edit"} fields={fields} cancel={edit} user={user} ditails={userDitails} onSubmit={updateUser} />
                    </>
                    :
                    <>
                        <Typography variant="h5" component="h2" gutterBottom>Edit Admin</Typography>
                        <br />
                        <GenericForm typeForm={"Edit"} fields={fieldsAdmin} cancel={edit} user={user} ditails={userDitails} onSubmit={updateUser} />
                    </>
                }
            </Box>
        </Modal>
    )
}
