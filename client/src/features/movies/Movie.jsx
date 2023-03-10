import { useGetMoviesQuery } from './moviesSlice';

const Movie = ({ movieId }) => {
    const { movie } = useGetMoviesQuery('getMovies', {
        selectFromResult: ({ data }) => ({
            movie: data?.entities[movieId]
        }),
    })
    // console.log(movie)
    return (
        <article>
            <h2>{movie.name}</h2>
            <br />
            premiered: {movie.premiered}
            <p className="movieCredit">
                {/* <Link to={`movies/${movie.id}`}>View Movie</Link> */}

                summary:
                {movie.summary}
            </p>
        </article>
    )
}

export default Movie