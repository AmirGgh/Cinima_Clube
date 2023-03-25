import { Box, Chip, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function MovieDisplay({ show, showMovie, movie }) {
    return (
        <Modal open={showMovie} onClose={show}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                }}
                onClick={show}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '45%',
                        height: '70%',
                        backgroundColor: 'black',
                        boxShadow: 24,
                        borderRadius: 1,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: '35%',
                            height: '100%',
                            backgroundImage: `url(${movie.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            left: '65%',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: 3,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            right: '35%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 3,
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            {movie.name}
                        </Typography>
                        <br />

                        <Typography variant="body3" component="p" gutterBottom>
                            {movie.premiered}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {movie.summary}
                        </Typography>
                        <br />
                        <Stack direction="row" spacing={1}>

                            {movie?.genres.map((g) => (< Chip key={g} label={g} variant="outlined" />))}

                        </Stack>

                    </Box>

                </Box>
            </Box>
        </Modal>
    )
}


// backgroundImage: `url(${movie.image})`,
// backgroundSize: 'cover',
// backgroundPosition: 'center',
// backgroundColor: 'rgba(0, 0, 0, 0.5)',

