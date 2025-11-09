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

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!anime) return <p>No anime found.</p>;

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <button
                onClick={() => navigate(-1)} // go back to previous page
                style={{ marginBottom: "20px", padding: "8px 12px", cursor: "pointer" }}
            >
                &larr; Back
            </button>

            <h1>{anime.title}</h1>
            <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                style={{ width: "250px" }}
            />
            <p><strong>Score:</strong> {anime.score}</p>
            <p><strong>Episodes:</strong> {anime.episodes}</p>
            <p><strong>Rating:</strong> {anime.rating}</p>
            <p>{anime.synopsis}</p>
        </div>
    );
}
