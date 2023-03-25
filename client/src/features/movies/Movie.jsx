import { Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from './moviesSlice';


import { styled } from '@mui/material/styles';
import MovieDisplay from './MovieDisplay';
import { useState } from 'react';
import EditMovie from './EditMovie';



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

    return (
        <Card sx={{
            my: 1,
            mx: 1
        }}>
            <CardMedia
                sx={{ height: 360, width: 260 }}
                image={movie.image}
            />
            <CardContent>
                <Typography >{movie.name}</Typography >
            </CardContent>
            <CardActions>
                <Button size="small" onClick={show}>Show More</Button>
                <Button size="small" onClick={edit}>Edit</Button>
                <MovieDisplay show={show} showMovie={showMovie} movie={movie} />
                <EditMovie edit={edit} editMovie={editMovie} movie={movie} />
            </CardActions>
        </Card>
    )
}

export default Movie