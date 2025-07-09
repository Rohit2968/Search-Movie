import { RANDOM_TITLES } from "./randomTitles";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(RANDOM_TITLES[0])}`);
  const data = await response.json();
  return data.Response === "True" ? data.Search : [];
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.Response === "True" ? data.Search : [];
};

export { API_KEY, BASE_URL };
