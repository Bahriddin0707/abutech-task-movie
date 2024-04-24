import { useEffect, useState } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useSearchContext } from "../hooks/useSearchContext";
import { Container } from "react-bootstrap";

// Components and Pages
import MoviesList from "./MoviesList";
import SearchMovie from "../components/SearchMovie";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useMoviesContext();
  const { search, dispatch: searchDispatch } = useSearchContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        let response;
        if (search) {
          response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=0e41e7f498173fb2dfd1d5f4018a25f9&language=en-US&query=${search}&page=1&include_adult=false`
          );
        } else {
          response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?api_key=0e41e7f498173fb2dfd1d5f4018a25f9"
          );
        }

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setIsLoading(false);
        dispatch({ type: "FETCH_MOVIES", payload: data.results });
        searchDispatch({ type: "SEARCH_MOVIE", payload: search });
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, [dispatch, search, searchDispatch]);

  return (
    <div className="home py-5">
      <Container>
        <h2 className="mb-5 text-success text-center">Mashhur filmlar</h2>

        <SearchMovie />

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <MoviesList />
        )}
      </Container>
    </div>
  );
}

export default Home;
