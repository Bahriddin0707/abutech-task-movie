import { useMoviesContext } from "../hooks/useMoviesContext";
import MovieCard from "../components/MovieCard";

function MoviesList() {
  const { movies } = useMoviesContext();

  return (
    <div className="movies-list">
      {movies &&
        movies.length !== 0 &&
        movies.map((movie, index) => {
          return <MovieCard movie={movie} key={index} />;
        })}
    </div>
  );
}

export default MoviesList;
