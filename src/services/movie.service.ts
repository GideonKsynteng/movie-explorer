import api from "../api/api";
import { getCache, setCache } from "../api/cache";
import type { MovieDetail, SearchResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const searchMovies = async (query: string) => {
    const key = `search-${query}`;

    const cached = getCache<SearchResponse>(key);

    if (cached) {
        return cached;
    }

    const { data } = await api.get("", {
        params: {
            apikey: API_KEY,
            s: query,
        },
    });

    setCache(key, data);

    return data;
};

export const getMovie = async (id: string): Promise<MovieDetail> => {
    const key = `movie-${id}`;

    const cached = getCache<MovieDetail>(key);

    if (cached) {
        return cached;
    }

    const { data } = await api.get("", {
        params: {
            apikey: API_KEY,
            i: id,
            plot: "full",
        },
    });

    if (data.Response === "False") {
        throw new Error(data.Error);
    }

    setCache(key, data);

    return data;
};
