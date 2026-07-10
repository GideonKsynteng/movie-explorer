import { ReactElement } from "react";

import { render } from "@testing-library/react";

import { ThemeProvider } from "../context/ThemeContext";

export const renderWithProviders = (ui: ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
};
