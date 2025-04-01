import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

// Custom hook for accessing context
export const useMovieContext = () => {
    return useContext(MovieContext);
};

// MovieProvider component
export const MovieProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    // Load favourites from localStorage on mount
    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites");
        if (storedFavs) {
            try {
                const parsedFavs = JSON.parse(storedFavs);
                if (Array.isArray(parsedFavs)) {
                    setFavourites(parsedFavs);
                } else {
                    localStorage.removeItem("favourites"); // Reset invalid data
                    setFavourites([]);
                }
            } catch (error) {
                console.error("Error parsing favourites:", error);
                localStorage.removeItem("favourites"); // Reset corrupt data
                setFavourites([]);
            }
        }
    }, []);
    
    
    // Save favourites to localStorage whenever it changes
    useEffect(() => {
        if (favourites.length > 0) {
            localStorage.setItem("favourites", JSON.stringify(favourites));
        }
    }, [favourites]);    

    // Function to add a movie to favourites
    const addToFavourites = (movie) => {
        setFavourites(prev => {
            if (prev.some(item => item.id === movie.id)) {
                return prev; // Prevent duplicate entry
            }
            const updatedFavourites = [...prev, movie];
            localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
            return updatedFavourites;
        });
    };
    

    // Function to remove a movie from favourites
    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId));
    };    

    // Function to check if a movie is in favourites
    const isFavourites = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    };

    return (
        <MovieContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, isFavourites }}>
            {children}
        </MovieContext.Provider>
    );
};
