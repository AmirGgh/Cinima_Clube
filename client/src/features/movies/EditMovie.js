import { Box, Chip, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import GenericForm from '../../utils/genericForm'
import { styleModal } from '../../utils/theme'
export default function EditMovie({ editMovie, edit, movie }) {
    const fields = [
        { label: 'movie name', name: 'name', type: 'text' },
        { label: 'genres', name: 'genres', type: 'text' },
        { label: 'image', name: 'image', type: 'text' },
        { label: 'premiered', name: 'premiered', type: 'text' },
    ]

    return (
        <Modal open={editMovie} onClose={edit}>
            <Box sx={styleModal} >
                <Typography variant="h5" component="h2" gutterBottom>
                    {movie.name}
                </Typography>
                <br />
                <GenericForm typeForm={"Edit"} fields={fields} movie={true} cancel={edit} />
            </Box>
        </Modal>
    )
}
