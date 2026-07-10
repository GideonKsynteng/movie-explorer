import { SubmitEvent, useState } from "react";

import styles from "./SearchBar.module.css";

interface Props {
    onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!query.trim()) {
            return;
        }

        onSearch(query.trim());
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search movies"
            />

            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
