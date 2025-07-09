import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
    const { addToFavourites, removeFromFavourites, isFavourites } = useMovieContext();
    const favourite = isFavourites(movie.imdbID);

    function onFavClick(e) {
        e.preventDefault();
        if (favourite) removeFromFavourites(movie.imdbID);
        else addToFavourites(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
                    alt={movie.Title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback.jpg";
                    }}
                />
                <div className="movie-overlay">
                    <button
                        className={`favourite-btn ${favourite ? "active" : ""}`}
                        onClick={onFavClick}
                    >
                        {favourite ? "★" : "☆"}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}

export default MovieCard;
