import { useEffect, useRef, useState } from "react";

import { getMovie } from "../services/movie.service";
import { MovieDetail } from "../types/movie";

import styles from "./MovieModal.module.css";

interface Props {
    movieId: string;
    onClose: () => void;
}

export const MovieModal = ({ movieId, onClose }: Props) => {
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await getMovie(movieId);

                setMovie(data);
            } catch {
                setError("Unable to load movie.");
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [movieId]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <div
            ref={overlayRef}
            className={styles.overlay}
            onClick={handleOverlayClick}
        >
            <div className={styles.modal} role="dialog" aria-modal="true">
                <button
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Close"
                >
                    x
                </button>

                {loading && <p>Loading...</p>}

                {error && <p>{error}</p>}

                {movie && (
                    <>
                        <img
                            src={
                                movie.Poster !== "N/A"
                                    ? movie.Poster
                                    : "https://placehold.co/400x600"
                            }
                            alt={movie.Title}
                        />

                        <div className={styles.content}>
                            <h2>{movie.Title}</h2>

                            <p>
                                <strong>Year:</strong> {movie.Year}
                            </p>

                            <p>
                                <strong>Rating:</strong> ⭐ {movie.imdbRating}
                            </p>

                            <p>
                                <strong>Genre:</strong> {movie.Genre}
                            </p>

                            <p>
                                <strong>Runtime:</strong> {movie.Runtime}
                            </p>

                            <p>
                                <strong>Director:</strong> {movie.Director}
                            </p>

                            <p>
                                <strong>Actors:</strong> {movie.Actors}
                            </p>

                            <p>{movie.Plot}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieModal;
