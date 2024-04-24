import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          fluid
        />

        <div className="movie__card-overlay">
          <span>{movie.release_date}</span>
          <h3>{movie.original_title}</h3>
          <p>
            Average vote: <span>{movie.vote_average}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
