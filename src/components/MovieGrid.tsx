import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

import styles from "./MovieGrid.module.css";

interface Props {
    movies: Movie[];
    onSelect: (id: string) => void;
}

export const MovieGrid = ({ movies, onSelect }: Props) => {
    if (movies.length === 0) {
        return <div className={styles.empty}>Search for a movie to begin.</div>;
    }

    return (
        <section className={styles.grid}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onSelect={onSelect}
                />
            ))}
        </section>
    );
};

export default MovieGrid;
