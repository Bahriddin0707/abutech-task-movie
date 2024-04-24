import { useState, useEffect } from "react";

export const useFetchMovieRecommendations = (movieId) => {
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=0e41e7f498173fb2dfd1d5f4018a25f9`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setIsLoading(false);
        setRecommendations(data);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.error("Error fetching recommendations:", error.message);
      }
    };
    fetchMovie();
  }, [movieId]);

  return { recommendations, isLoading, error };
};
