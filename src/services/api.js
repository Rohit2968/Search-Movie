import { RANDOM_TITLES } from "./randomTitles";
const API_KEY = "2652509";
const BASE_URL = "https://www.omdbapi.com/";

export const getPopularMovies = async () => {
  const promises = RANDOM_TITLES.map(async (title) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
    const data = await response.json();
    return data.Response === "True" ? data : null;
  });

  const results = await Promise.all(promises);
  return results.filter(movie => movie); // Filter out failed results
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.Response === "True" ? data.Search : [];
};
