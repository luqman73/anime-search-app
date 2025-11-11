import { useParams, useNavigate } from "react-router-dom"; // add useNavigate
import { useEffect, useState } from "react";
import axios from "axios";

interface AnimeDetailType {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
    score: number;
    synopsis: string;
    episodes: number;
    rating: string;
}

export default function AnimeDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // initialize navigate
    const [anime, setAnime] = useState<AnimeDetailType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axios
            .get(`https://api.jikan.moe/v4/anime/${id}`)
            .then((res) => setAnime(res.data.data))
            .catch(() => setError("Failed to fetch anime details"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 px-6">
                {/* Pulsing card skeleton */}
                <div className="w-96 h-64 bg-gray-800 rounded-xl shadow-lg animate-pulse mb-6"></div>

                {/* Loading text */}
                <p className="text-gray-400 text-lg animate-pulse">Loading...</p>
            </div>
        );
    }


    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!anime) return <p>No anime found.</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-10 flex justify-center">
            <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">

                {/* Poster / Image */}
                <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-lg shadow-lg object-cover self-start"
                />

                {/* Anime Details */}
                <div className="flex-1 flex flex-col">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start mb-6 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors font-medium"
                    >
                        ← Back
                    </button>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">{anime.title}</h1>

                    {/* Info Row */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-gray-700 px-3 py-1 rounded text-sm font-medium">Score: {anime.score}</span>
                        <span className="bg-gray-700 px-3 py-1 rounded text-sm font-medium">Episodes: {anime.episodes}</span>
                        <span className="bg-gray-700 px-3 py-1 rounded text-sm font-medium">Rating: {anime.rating}</span>
                    </div>

                    {/* Synopsis */}
                    <div className="text-gray-300 text-sm md:text-base leading-relaxed overflow-auto max-h-96">
                        {anime.synopsis || "Synopsis not available."}
                    </div>
                </div>
            </div>
        </div>

    );

}
