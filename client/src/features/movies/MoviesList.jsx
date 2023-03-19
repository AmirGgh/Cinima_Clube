import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Movie from './Movie';
import { useGetMoviesQuery } from './moviesSlice';

import Loading from '../../components/Loading';
const MoviesList = () => {
    const navigate = useNavigate()

    const {
        data: movies,
        isLoading,
        isSuccess,
        isError,
        error,
        isUninitialized
    } = useGetMoviesQuery('getMovies')


    let content;
    if (isLoading) {
        content = <Loading />
    }
    else if (isSuccess) {
        content = movies.ids.map(movieId => <Movie key={movieId} movieId={movieId} />)
    } else if (isError) {
        content = <p>{error}</p>;
    } else if (isUninitialized) {
        navigate('/')
        return
    }
    return (
        <Grid container display="flex" spacing={2}  >
            {content}
        </Grid>
    )
}
export default MoviesList