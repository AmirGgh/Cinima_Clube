import { useNavigate } from 'react-router-dom';
import Movie from './Movie';
import { useGetMoviesQuery } from './moviesSlice';

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
        content = <p>"Loading..."</p>;
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
        <section>
            <h3>All Movies</h3>
            {content}
        </section>
    )
}
export default MoviesList