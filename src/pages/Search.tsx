import SearchBar from "../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchAnime, setPage } from "../redux/animeSlice";
import AnimeCardSkeleton from "../components/AnimeCardSkeleton";
import { Link } from "react-router-dom";

function Search() {
    const dispatch = useDispatch<AppDispatch>();
    const { results, loading, error, page, totalPages, query } = useSelector(
        (state: RootState) => state.anime
    );

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(fetchAnime({ query, page: newPage }));
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl font-extrabold mb-2 tracking-wide">Anime Search</h1>
                <div className="w-24 h-1 bg-red-600 rounded-full mb-6 mx-auto"></div>
                <div className="max-w-md mx-auto mb-8">
                    <SearchBar />
                </div>

                {loading && (
                    <div className="flex flex-wrap justify-center gap-4">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <AnimeCardSkeleton key={idx} />
                        ))}
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Glassy Cards */}
                <div className="flex flex-wrap justify-center gap-5 mt-6">
                    {!loading && results.length === 0 && query && (
                        <p className="text-gray-400">No results found for "{query}"</p>
                    )}

                    {!loading &&
                        results.map((anime) => (
                            <Link
                                to={`/anime/${anime.mal_id}`}
                                key={anime.mal_id}
                                className="w-40 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-2xl border border-white/20"
                            >
                                <img
                                    src={anime.images.jpg.image_url}
                                    alt={anime.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-3">
                                    <p className="font-semibold text-sm text-white truncate">{anime.title}</p>
                                    <p className="text-gray-300 text-xs mt-1">Score: {anime.score ?? "N/A"}</p>
                                </div>
                            </Link>
                        ))}
                </div>

                {/* Pagination */}
                {query && results.length > 0 && (
                    <div className="flex justify-center items-center mt-10 gap-4">
                        {page > 1 && (
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                            >
                                Prev
                            </button>
                        )}
                        <span className="text-gray-300">
                            Page {page} of {totalPages}
                        </span>
                        {page < totalPages && (
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>

    );
}

export default Search;
