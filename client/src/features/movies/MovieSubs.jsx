import { Typography } from '@mui/material'
import React from 'react'
import { useGetMembersQuery } from '../subscriptions/subscriptionsSlice'

export default function MovieSubs({ id, date }) {
    const { member } = useGetMembersQuery('getMembers', {
        selectFromResult: ({ data }) => ({
            member: data?.entities[id]
        }),
    })

    return (
        <Typography key={member?.firstName}>{member?.firstName} {member?.lastName} - {date}</Typography>
    )
}

{/* <>
    <Chip label={label} variant="outlined" />
</> */}