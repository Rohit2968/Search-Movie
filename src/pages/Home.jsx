import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"


function Home() {   // .map is used to iterate over all these movies
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const PopularMovies = await getPopularMovies()
                setMovies(PopularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies....")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault()  //Used to prevent the automatic refresh the input
        if(!searchQuery.trim()) return;
        if(loading) return;

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search For Movies...."
                    className="search-input"
                    value={searchQuery} // While on this we can't write in the form unless the below onChange func. is written
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loaing">Loading....</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) =>
                    // movie.title.toLowerCase().startsWith(searchQuery) && // Will Use API Not Manually{Above code for the page will be re-rendered upon searching based on alphabets/movie titles}
                    (
                        <MovieCard movie={movie} key={movie.id} />
                    )
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;