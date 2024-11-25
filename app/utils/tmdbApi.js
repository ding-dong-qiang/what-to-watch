const BASE_URL = 'https://api.themoviedb.org/3';

// Check if the API key is available
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
if (!API_KEY) {
  console.error('TMDB API key is not set. Please check your environment variables.');
}

export const verifyApiKey = async () => {
  if (!API_KEY) return false;
  try {
    const response = await fetch(
      `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying API key:', error);
    return false;
  }
};

export const searchMovies = async (keyword) => {
  if (!API_KEY) throw new Error('API key is not set');
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}&language=en-US&page=1&include_adult=false`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  if (!API_KEY) throw new Error('API key is not set');
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

