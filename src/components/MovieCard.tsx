import { KeyboardEvent, useState } from "react";

import { Movie } from "../types/movie";

import styles from "./MovieCard.module.css";

interface Props {
    movie: Movie;
    onSelect: (id: string) => void;
}

const FALLBACK_POSTER = "https://placehold.co/300x450?text=No+Image";

export const MovieCard = ({ movie, onSelect }: Props) => {
    const [poster, setPoster] = useState(
        movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER
    );

    const openMovie = () => {
        onSelect(movie.imdbID);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openMovie();
        }
    };

    return (
        <article
            className={styles.card}
            tabIndex={0}
            role="button"
            aria-label={movie.Title}
            onClick={openMovie}
            onKeyDown={handleKeyDown}
        >
            <img
                src={poster}
                onError={() => setPoster(FALLBACK_POSTER)}
                alt={movie.Title}
            />

            <div className={styles.content}>
                <h3>{movie.Title}</h3>

                <p>{movie.Year}</p>
            </div>
        </article>
    );
};

export default MovieCard;
