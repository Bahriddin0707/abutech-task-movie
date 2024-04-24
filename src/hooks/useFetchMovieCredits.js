import { useState, useEffect } from "react";
import { useCreditsContext } from "./useCreditsContext";

export const useFetchMovieCredits = (movieId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState("");
  const { dispatch } = useCreditsContext();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=0e41e7f498173fb2dfd1d5f4018a25f9`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await response.json();
        setIsLoading(false);
        setCredits(data);
        dispatch({ type: "FETCH_CREDITS", payload: data });
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.error("Error fetching movie:", error.message);
      }
    };
    fetchMovie();
  }, [movieId, dispatch]);

  return { credits, isLoading, error };
};
