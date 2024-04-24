import { useCreditsContext } from "../hooks/useCreditsContext";

// Utils
import { movieRunTime } from "../utils/MovieRunTime";
import { getDirector } from "../utils/getDirector";

function MovieInfos({ movie, crew }) {
  let result = movieRunTime(movie.runtime);
  let { directorName } = getDirector(crew);
  let { credits } = useCreditsContext();

  return (
    <div className="movie-infos">
      <h1 className="movie-title">{movie.original_title}</h1>
      <div className="movie__info-container">
        <span className="movie-date">{movie.release_date}</span>
        <span className="movie-vote">{movie.vote_average}</span>
        <span className="movie-runtime">
          {result.hours + " h " + result.minutes + "minutes"}
        </span>
      </div>
      <div className="movie-genres">
        <p>Genres:</p>{" "}
        {movie.genres &&
          movie.genres.length !== 0 &&
          movie.genres.map((genre, index) => {
            return <span key={index}>{`${genre.name}, `}</span>;
          })}
      </div>

      <div style={{ fontSize: 20 }}>{movie.overview}</div>
      <div className="my-4">
        <span className="director-job">Director</span>{" "}
        <span className="director-name"> {directorName}</span>
      </div>

      <div>
        <span className="main-cast">Main Cast</span>{" "}
        {credits &&
          credits.cast &&
          credits.cast.length !== 0 &&
          credits.cast.map((cast, i) =>
            i < 11 ? (
              <span key={cast.cast_id}>
                {i !== 10 ? `${cast.name}, ` : `${cast.name}`}
              </span>
            ) : null
          )}
      </div>
    </div>
  );
}

export default MovieInfos;
