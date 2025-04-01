import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
    const { favourites } = useMovieContext();

    if (favourites.length > 0) { // Ensure there are movies before displaying
        return (
            <div className="favourites">
                <h2>Your Favourites</h2>
                <div className="movies-grid">
                    {favourites.map((movie) => ( // Use () to return JSX
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favourites-empty">
            <h2>No Favourite Movies Yet</h2>
            <p>Start Adding movies to your favourite list</p>
        </div>
    );
}

export default Favourites;
