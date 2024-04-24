import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// context
import { MovieContextProvider } from "./context/MovieContext";
import { SearchContextProvider } from "./context/SearchContext";
import { MovieCreditsProvider } from "./context/MovieCreditsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <MovieContextProvider>
        <MovieCreditsProvider>
          <App />
        </MovieCreditsProvider>
      </MovieContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);

reportWebVitals();
