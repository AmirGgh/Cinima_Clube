import { Box, Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from './moviesSlice';


import { styled } from '@mui/material/styles';
import MovieDisplay from './MovieDisplay';
import { useState } from 'react';
import EditMovie from './EditMovie';
import MovieSubs from './MovieSubs';



const Movie = ({ movieId, editPer, viewSubsPer, delPer }) => {

    const { movie } = useGetMoviesQuery('getMovies', {
        selectFromResult: ({ data }) => ({
            movie: data?.entities[movieId]
        }),
    })
    const [showMovie, setShowMovie] = useState(false)
    const [editMovie, setEditMovie] = useState(false)
    const show = () => {
        setShowMovie(!showMovie)
    }
    const edit = () => {
        setEditMovie(!editMovie)
    }
    let content
    if (movie?.subsWatches) {
        content = movie.subsWatches.map((memb) => (
            <MovieSubs key={memb.email} id={memb.memberID} date={memb.date} />
        ))
    }

    return (
        <Card sx={{
            my: 1,
            mx: 1
        }} >
            <CardMedia
                sx={{ height: 360, width: 260 }}
                image={movie.image}
            />
            <CardContent>
                <Typography paragraph >{movie.name}</Typography >
            </CardContent>

            <CardActions>
                <Button size="small" onClick={show}>Show More</Button>
                <MovieDisplay show={show} showMovie={showMovie} movie={movie} />
                {editPer && <Button size="small" onClick={edit}>Edit</Button>}
                {editPer && <EditMovie key={movie.image} delPer={delPer} edit={edit} editMovie={editMovie} movie={movie} />}
            </CardActions>
            {movie.subsWatches?.length >= 1 && viewSubsPer && <CardContent sx={{
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
                <Typography paragraph>Members wached:</Typography >
                {content && content}
            </CardContent>}
        </Card>
    )
}

export default Movie