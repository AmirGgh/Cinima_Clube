import { Box, Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from './moviesSlice';


import { styled } from '@mui/material/styles';
import MovieDisplay from './MovieDisplay';
import { useState } from 'react';
import EditMovie from './EditMovie';
import MovieSubs from './MovieSubs';



const Movie = ({ movieId }) => {
    const { movie } = useGetMoviesQuery('getMovies', {
        selectFromResult: ({ data }) => ({
            movie: data?.entities[movieId]
        }),
    })
    // console.log(movie)
    const [showMovie, setShowMovie] = useState(false)
    const [editMovie, setEditMovie] = useState(false)
    const show = () => {
        setShowMovie(!showMovie)
    }
    const edit = () => {
        setEditMovie(!editMovie)
    }
    // console.log(movie)
    return (
        <Card sx={{
            my: 1,
            mx: 1
        }} key={movie._id}>
            <CardMedia
                sx={{ height: 360, width: 260 }}
                image={movie.image}
            />
            <CardContent>
                <Typography paragraph key={movie.name}>{movie.name}</Typography >
                <Typography paragraph key={movie.image}>Members wached:</Typography >
            </CardContent>

            <CardActions>
                <Button size="small" onClick={show}>Show More</Button>
                <Button size="small" onClick={edit}>Edit</Button>
                <MovieDisplay show={show} showMovie={showMovie} movie={movie} />
                <EditMovie edit={edit} editMovie={editMovie} movie={movie} />
            </CardActions>
            {movie?.subsWatches.length > 0 && <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                maxWidth: 220,
                borderRadius: 3,
                fontSize: '10rem'
            }}>
                {movie?.subsWatches.map((memb) => (
                    <MovieSubs key={memb.email} id={memb.memberID} date={memb.date} />
                ))}
            </Box>}
        </Card>
    )
}

export default Movie