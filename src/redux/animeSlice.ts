import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Anime {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
    score: number;
}

interface AnimeState {
    results: Anime[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    query: string;
}

const initialState: AnimeState = {
    results: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    query: "",
};

// Async thunk to fetch anime
export const fetchAnime = createAsyncThunk(
    "anime/fetchAnime",
    async ({ query, page }: { query: string; page: number }) => {
        const res = await axios.get("https://api.jikan.moe/v4/anime", {
            params: { q: query, page, sfw: true },
        });

        return {
            results: res.data.data,
            totalPages: res.data.pagination?.last_visible_page || 1,
        };
    }
);

const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnime.fulfilled, (state, action: PayloadAction<{ results: Anime[]; totalPages: number }>) => {
                state.loading = false;
                state.results = action.payload.results; // no filtering
                state.totalPages = action.payload.totalPages;
            })

            .addCase(fetchAnime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const { setQuery, setPage } = animeSlice.actions;
export default animeSlice.reducer;
