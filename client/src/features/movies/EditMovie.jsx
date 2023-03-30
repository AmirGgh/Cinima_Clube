import { Box, Button, Chip, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import GenericForm from '../../utils/genericForm'
import { styleModal } from '../../utils/theme'
import { useDeleteMovieMutation, useUpdateMovieMutation } from './moviesSlice'
export default function EditMovie({ editMovie, edit, movie }) {
    const fields = [
        { label: 'movie name', name: 'name', type: 'text' },
        { label: 'genres', name: 'genres', type: 'text' },
        { label: 'image(link)', name: 'image', type: 'text' },
        { label: 'premiered', name: 'premiered', type: 'text' },
    ]
    const [updateMovie] = useUpdateMovieMutation()
    const [deleteMovie] = useDeleteMovieMutation()
    const updateThisMovie = async (data) => {
        if (data.genres) data.genres = data.genres.split(",")
        if (data) {
            try {
                console.log(data)
                await updateMovie({ id: movie._id, body: data }).unwrap()
            } catch (err) {
                console.error('Failed to edit the movie', err)
            }
        }

    }
    const deleteThisMovie = async () => {
        try {
            console.log({ id: movie._id });
            await deleteMovie({ id: movie._id }).unwrap()

        } catch (err) {
            console.error('Failed to delete the movie', err)
        }
    }
    return (
        <Modal open={editMovie} onClose={edit}>
            <Box sx={styleModal} >
                <Typography variant="h5" component="h2" gutterBottom>
                    {movie.name}
                </Typography>
                <br />
                <GenericForm typeForm={"Edit"} fields={fields} ditails={movie} movie={true} cancel={edit} onSubmit={updateThisMovie} />
                <Button onClick={deleteThisMovie}>delete</Button>
            </Box>
        </Modal>
    )
}
