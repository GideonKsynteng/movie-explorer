import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MovieModal from "../components/MovieModal";
import * as movieService from "../services/movie.service";

vi.mock("../services/movie.service");

const movie = {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "poster.jpg",
    Plot: "Dreams inside dreams.",
    Runtime: "148 min",
    Genre: "Sci-Fi",
    Director: "Christopher Nolan",
    Actors: "Leonardo DiCaprio",
    imdbRating: "8.8",
};

describe("MovieModal", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows loading state", () => {
        vi.mocked(movieService.getMovie).mockReturnValue(new Promise(() => {}));

        render(<MovieModal movieId="tt1375666" onClose={vi.fn()} />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("renders movie details", async () => {
        vi.mocked(movieService.getMovie).mockResolvedValue(movie as never);

        render(<MovieModal movieId="tt1375666" onClose={vi.fn()} />);

        expect(await screen.findByText("Inception")).toBeInTheDocument();

        expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();

        expect(screen.getByText(/148 min/i)).toBeInTheDocument();

        expect(screen.getByText(/Dreams inside dreams/i)).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", async () => {
        const user = userEvent.setup();

        vi.mocked(movieService.getMovie).mockResolvedValue(movie as never);

        const onClose = vi.fn();

        render(<MovieModal movieId="tt1375666" onClose={onClose} />);

        const close = await screen.findByRole("button", {
            name: /close/i,
        });

        await user.click(close);

        expect(onClose).toHaveBeenCalledOnce();
    });

    it("closes on Escape key", async () => {
        const user = userEvent.setup();

        vi.mocked(movieService.getMovie).mockResolvedValue(movie as never);

        const onClose = vi.fn();

        render(<MovieModal movieId="tt1375666" onClose={onClose} />);

        await screen.findByText("Inception");

        await user.keyboard("{Escape}");

        expect(onClose).toHaveBeenCalled();
    });

    it("shows error state", async () => {
        vi.mocked(movieService.getMovie).mockRejectedValue(
            new Error("API Error")
        );

        render(<MovieModal movieId="tt1375666" onClose={vi.fn()} />);

        expect(
            await screen.findByText(/unable to load movie/i)
        ).toBeInTheDocument();
    });

    it("renders movie poster", async () => {
        vi.mocked(movieService.getMovie).mockResolvedValue(movie as never);

        render(<MovieModal movieId="tt1375666" onClose={vi.fn()} />);

        const image = await screen.findByRole("img");

        expect(image).toHaveAttribute("src", "poster.jpg");

        expect(image).toHaveAttribute("alt", "Inception");
    });
});
