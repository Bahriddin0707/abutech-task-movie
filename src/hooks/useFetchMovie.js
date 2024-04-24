import { useState, useEffect } from "react";

export const useFetchMovie = (movieId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=0e41e7f498173fb2dfd1d5f4018a25f9&language=en-US`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await response.json();
        setIsLoading(false);
        setMovie(data);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.error("Error fetching movie:", error.message);
      }
    };
    fetchMovie();
  }, [movieId]);

  return { movie, isLoading, error };
};
