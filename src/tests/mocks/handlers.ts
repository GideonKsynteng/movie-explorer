import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("https://www.omdbapi.com/", ({ request }) => {
        const url = new URL(request.url);

        const search = url.searchParams.get("s");

        const movieId = url.searchParams.get("i");

        if (search) {
            return HttpResponse.json({
                Response: "True",

                Search: [
                    {
                        imdbID: "tt1375666",
                        Title: "Inception",
                        Year: "2010",
                        Poster: "poster.jpg",
                        Type: "movie",
                    },
                ],
            });
        }

        if (movieId) {
            return HttpResponse.json({
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
            });
        }

        return HttpResponse.json({
            Response: "False",
            Error: "Movie not found",
        });
    }),
];
