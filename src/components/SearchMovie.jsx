import { useSearchContext } from "../hooks/useSearchContext";

function SearchMovie() {
  const { search, dispatch } = useSearchContext();

  const searchHandle = (e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
    localStorage.setItem("search", JSON.stringify(e.target.value));
  };

  return (
    <div className="search-movie mb-5">
      <input
        className="text-light"
        type="text"
        placeholder="Qidirish..."
        onChange={(e) => searchHandle(e)}
        value={search}
      />
    </div>
  );
}

export default SearchMovie;
