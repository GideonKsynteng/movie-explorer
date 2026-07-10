import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts",
        css: true,

        coverage: {
            provider: "v8",

            reporter: ["text", "html"],

            reportsDirectory: "./coverage",

            include: ["src/**/*.{ts,tsx}"],

            exclude: ["src/tests/**", "src/main.tsx", "**/*.d.ts"],

            thresholds: {
                lines: 80,
                statements: 80,
                branches: 70,
                functions: 80,
            },
        },
    },
});
