import { MovieCreditsContext } from "../context/MovieCreditsContext";
import { useContext } from "react";

export const useCreditsContext = () => {
  const context = useContext(MovieCreditsContext);

  if (!context) {
    throw Error("useMoviesContext must be used inside an MovieCreditsProvider");
  }

  return context;
};
