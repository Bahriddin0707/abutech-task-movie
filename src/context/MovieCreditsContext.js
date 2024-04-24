import { createContext, useReducer } from "react";

export const MovieCreditsContext = createContext();

export const creditsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CREDITS":
      return {
        credits: action.payload,
      };

    default:
      return state;
  }
};

export const MovieCreditsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(creditsReducer, {
    credits: null,
  });

  return (
    <MovieCreditsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MovieCreditsContext.Provider>
  );
};
