import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
    it("renders input and button", () => {
        render(<SearchBar onSearch={vi.fn()} />);

        expect(
            screen.getByRole("textbox", {
                name: /search movies/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /search/i,
            })
        ).toBeInTheDocument();
    });

    it("updates the input value", async () => {
        const user = userEvent.setup();

        render(<SearchBar onSearch={vi.fn()} />);

        const input = screen.getByRole("textbox");

        await user.type(input, "Batman");

        expect(input).toHaveValue("Batman");
    });

    it("calls onSearch when clicking Search", async () => {
        const user = userEvent.setup();

        const onSearch = vi.fn();

        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByRole("textbox");

        await user.type(input, "Batman");

        await user.click(screen.getByRole("button"));

        expect(onSearch).toHaveBeenCalledTimes(1);

        expect(onSearch).toHaveBeenCalledWith("Batman");
    });

    it("calls onSearch when pressing Enter", async () => {
        const user = userEvent.setup();

        const onSearch = vi.fn();

        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByRole("textbox");

        await user.type(input, "Inception{Enter}");

        expect(onSearch).toHaveBeenCalledWith("Inception");
    });

    it("does not search empty input", async () => {
        const user = userEvent.setup();

        const onSearch = vi.fn();

        render(<SearchBar onSearch={onSearch} />);

        await user.click(screen.getByRole("button"));

        expect(onSearch).not.toHaveBeenCalled();
    });

    it("ignores whitespace input", async () => {
        const user = userEvent.setup();

        const onSearch = vi.fn();

        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByRole("textbox");

        await user.type(input, "     ");

        await user.click(screen.getByRole("button"));

        expect(onSearch).not.toHaveBeenCalled();
    });
});
