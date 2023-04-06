import { Grid } from '@mui/material';
import Movie from './Movie';
import { useGetMoviesQuery } from './moviesSlice';

import Loading from '../../components/Loading';
const MoviesList = () => {

    const {
        data: movies,
        isLoading,
        isSuccess,
    } = useGetMoviesQuery('getMovies')


    let content;
    if (isLoading) {
        content = <Loading />
    }
    else if (isSuccess) {
        content = movies.ids.map(movieId => <Movie key={movieId} movieId={movieId} />)
    }
    return (
        <Grid container display="flex" spacing={2}  >
            {content}
        </Grid>
    )
}
export default MoviesList