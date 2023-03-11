import { Button, Card, CardActions, CardContent, CardMedia, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from './moviesSlice';


import { styled } from '@mui/material/styles';

const Cardi = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 2
}));

const Movie = ({ movieId }) => {
    const { movie } = useGetMoviesQuery('getMovies', {
        selectFromResult: ({ data }) => ({
            movie: data?.entities[movieId]
        }),
    })
    // console.log(movie)
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
                {/* <Typography >premiered: {movie.premiered}</Typography >
                    <p className="movieCredit">
                        <Link to={`movies/${movie.id}`}>View Movie</Link>
                        summary:
                        {movie.summary}
                    </p> */}
            </CardContent>
            <CardActions>
                <Button size="small">Show More</Button>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    )
}

export default Movie