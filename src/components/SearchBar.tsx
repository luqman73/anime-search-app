import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { setQuery, setPage, fetchAnime } from "../redux/animeSlice";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState("");

  useEffect(() => {
    // debounce: wait 250ms after user stops typing
    const handler = setTimeout(() => {
      dispatch(setQuery(input));
      dispatch(setPage(1)); // reset page to 1 on new search
      if (input.trim()) {
        dispatch(fetchAnime({ query: input, page: 1 }));
      }
    }, 250);

    // cleanup: cancel previous timeout if user types again
    return () => clearTimeout(handler);
  }, [input, dispatch]);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <input
        type="text"
        placeholder="Search anime..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
    </div>
  );
}
