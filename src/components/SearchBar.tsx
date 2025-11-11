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
    <div className="flex justify-center mb-10">
  <input
    type="text"
    placeholder="Search anime..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    className="w-full max-w-md px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
  />
</div>
  );
}
