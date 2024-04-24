import { createContext, useReducer } from "react";

export const MoviesContext = createContext();

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return {
        movies: action.payload,
      };

    case "SEARCH_MOVIE":
      return {
        movies: state.movies.filter((movie) => {
          return movie.original_title
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };

    default:
      return state;
  }
};

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, {
    movies: [],
  });

  return (
    <MoviesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
