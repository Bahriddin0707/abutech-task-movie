import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        search: action.payload,
      };
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, {
    search: "",
  });

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem("search"));

    if (search) {
      dispatch({ type: "SET_SEARCH", payload: search });
    }
  }, []);

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Define prop types for MovieContextProvider component
SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
