import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import MovieCard from "../components/MovieCard";

const movie = {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "poster.jpg",
    Type: "movie",
};

describe("MovieCard", () => {
    it("renders movie information", () => {
        render(<MovieCard movie={movie} onSelect={vi.fn()} />);

        expect(screen.getByText("Inception")).toBeInTheDocument();

        expect(screen.getByText("2010")).toBeInTheDocument();

        expect(screen.getByAltText("Inception")).toBeInTheDocument();
    });

    it("calls onSelect on click", async () => {
        const user = userEvent.setup();

        const onSelect = vi.fn();

        render(<MovieCard movie={movie} onSelect={onSelect} />);

        await user.click(screen.getByRole("button"));

        expect(onSelect).toHaveBeenCalledWith(movie.imdbID);
    });

    it("supports Enter key", async () => {
        const user = userEvent.setup();

        const onSelect = vi.fn();

        render(<MovieCard movie={movie} onSelect={onSelect} />);

        const card = screen.getByRole("button");

        card.focus();

        await user.keyboard("{Enter}");

        expect(onSelect).toHaveBeenCalledWith(movie.imdbID);
    });

    it("shows placeholder image when poster is unavailable", () => {
        render(
            <MovieCard
                movie={{
                    ...movie,
                    Poster: "N/A",
                }}
                onSelect={vi.fn()}
            />
        );

        const image = screen.getByRole("img");

        expect(image).toHaveAttribute(
            "src",
            expect.stringContaining("placehold.co")
        );
    });
});
