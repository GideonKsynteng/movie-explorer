export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

export interface SearchResponse {
    Search: Movie[];
    Response: string;
    Error?: string;
}

export interface MovieDetail extends Movie {
    Plot: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    imdbRating: string;
    Response?: string;
    Error?: string;
}
