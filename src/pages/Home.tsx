import { useState } from "react";

import { searchMovies } from "../services/movie.service";
import { Movie } from "../types/movie";

import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import MovieGrid from "../components/MovieGrid";
import MovieModal from "../components/MovieModal";

import styles from "./Home.module.css";

export const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError("");

        try {
            const data = await searchMovies(query);

            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setMovies([]);
                setError(data.Error || "No movies found.");
            }
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1>Movie Explorer</h1>

                <ThemeToggle />
            </header>

            <SearchBar onSearch={handleSearch} />

            {loading && <p className={styles.message}>Loading...</p>}

            {error && <p className={styles.error}>{error}</p>}

            <MovieGrid movies={movies} onSelect={setSelectedMovie} />

            {selectedMovie && (
                <MovieModal
                    movieId={selectedMovie}
                    onClose={() => setSelectedMovie("")}
                />
            )}
        </main>
    );
};

export default Home;
