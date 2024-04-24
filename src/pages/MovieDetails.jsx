import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MovieInfos from "../components/MovieInfos";

// Custom Hooks
import { useFetchMovie } from "../hooks/useFetchMovie";
import { useFetchMovieCredits } from "../hooks/useFetchMovieCredits";
import { useFetchMovieRecommendations } from "../hooks/useFetchMovieRecommendations";

// Components
import Loader from "../components/Loader";
import Message from "../components/Message";

// Utils
import { getDirector } from "../utils/getDirector";

// Images
const nullw185 = require("../images/nullw185.png");
const nullw500 = require("../images/nullw500.png");

function MovieDetails() {
  const { id: movieId } = useParams();
  const { movie, isLoading, error } = useFetchMovie(movieId);
  const { credits } = useFetchMovieCredits(movieId);
  const { recommendations } = useFetchMovieRecommendations(movieId);
  const { results } = recommendations;
  const { direc } = getDirector(credits.crew);

  return (
    <div className="movie-details">
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              <Col md={5}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  fluid
                />
              </Col>
              <Col md={7}>
                <MovieInfos movie={movie} crew={credits.crew} />
              </Col>
            </Row>

            <div className="recommendations my-5">
              <h2>Recommendations</h2>
              <div className="recommendations-grid my-5">
                {results ? (
                  results
                    .slice(0, 6)
                    .map(
                      ({
                        id,
                        poster_path,
                        original_title,
                        release_date,
                        vote_average,
                      }) => (
                        <div className="infos-container cursor-normal" key={id}>
                          <Image
                            src={
                              poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : `${nullw500}`
                            }
                            alt={`Movie Poster`}
                            fluid
                          />
                          <div className="infos-box">
                            <div className="infos-one">{release_date}</div>
                            <div className="infos-two">{original_title}</div>
                            <div className="infos-three">{vote_average}</div>
                          </div>
                        </div>
                      )
                    )
                ) : (
                  <Loader />
                )}
              </div>
            </div>

            <div className="cast-crew">
              <h2 className="mb-4">Cast and Crew</h2>
              <div className="cast-grid">
                {direc && (
                  <div className="cast-img infos-container">
                    <Link to={`/director/${direc.id}`}>
                      <img
                        src={
                          direc.profile_path
                            ? `https://image.tmdb.org/t/p/w185${direc.profile_path}`
                            : `${nullw185}`
                        }
                        alt={`${direc.name} (Director)`}
                      />
                      <div className="infos-box">
                        <div className="infos-one">Director</div>
                        <div className="infos-two">{direc.name}</div>
                        <div className="infos-three">{direc.job}</div>
                      </div>
                    </Link>
                  </div>
                )}

                {credits.cast
                  ? credits.cast.slice(0, 11).map((cast) => (
                      <div key={cast.id} className="cast-img infos-container">
                        <Link to={`/actor/${cast.id}`}>
                          <Image
                            src={
                              cast.profile_path
                                ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                                : `${nullw185}`
                            }
                            alt={`${cast.name} (Actor)`}
                            fluid
                          />
                          <div className="infos-box">
                            <div className="infos-one">Actor</div>
                            <div className="infos-two">{cast.name}</div>
                            <div className="infos-three">{cast.character}</div>
                          </div>
                        </Link>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="details-grid mt-5">
              <h2>Movie Facts</h2>
              <div>
                <div className="details-title">Original Title</div>
                <div className="details-value">{movie.original_title}</div>
              </div>
              <div>
                <div className="details-title">Status</div>
                <div className="details-value">
                  {movie.status ? movie.status : "Unknown"}
                </div>
              </div>
              <div>
                <div className="details-title">Release Date</div>
                <div className="details-value">
                  {movie.release_date ? movie.release_date : "-"}
                </div>
              </div>
              <div>
                <div className="details-title">Ratings</div>
                <div className="details-value">
                  {movie.vote_average ? movie.vote_average : "-"}
                </div>
              </div>
              <div>
                <div className="details-title">Runtime</div>
                <div className="details-value">
                  {Math.floor(movie.runtime / 60)}h and {movie.runtime % 60}
                  minutes
                </div>
              </div>
              <div>
                <div className="details-title">Budget</div>
                <div className="details-value">
                  $
                  {movie.budget
                    ? movie.budget
                        .toFixed(1)
                        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    : "-"}
                </div>
              </div>
              <div>
                <div className="details-title">Revenue</div>
                <div className="details-value">
                  $
                  {movie.revenue
                    ? movie.revenue
                        .toFixed(1)
                        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    : "-"}
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default MovieDetails;
