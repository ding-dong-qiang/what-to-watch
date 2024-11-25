// Define the base URL for API requests to The Movie Database (TMDb)
const BASE_URL = 'https://api.themoviedb.org/3';

// Retrieve the API key from environment variables (it should be set in your environment)
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Check if the API key is set, and log an error if it's missing
if (!API_KEY) {
  console.error('TMDB API key is not set. Please check your environment variables.');
}

/**
 * Function to verify if the TMDB API key is valid.
 * Sends a request to the authentication endpoint to check if the API key works.
 * @returns {boolean} - Returns true if the API key is valid, false otherwise.
 */
export const verifyApiKey = async () => {
  // If there's no API key, return false immediately
  if (!API_KEY) return false;

  try {
    // Make a request to get a new authentication token using the API key
    const response = await fetch(
      `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
    // Parse the JSON response from the API
    const data = await response.json();
    
    // Return true if the response indicates the key is valid (success === true)
    return data.success === true;
  } catch (error) {
    // Log any errors that occur during the fetch request or response parsing
    console.error('Error verifying API key:', error);
    return false;
  }
};

/**
 * Function to search for movies based on a keyword.
 * Sends a request to the TMDB search API to find movies matching the given keyword.
 * @param {string} keyword - The search term used to look for movies.
 * @returns {Array} - An array of movie results.
 * @throws {Error} - Throws an error if the API key is missing or the request fails.
 */
export const searchMovies = async (keyword) => {
  // If no API key is provided, throw an error
  if (!API_KEY) throw new Error('API key is not set');

  try {
    // Make a request to the search endpoint, passing the keyword, language, and other query parameters
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}&language=en-US&page=1&include_adult=false`
    );

    // If the response status is not OK, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response from the API
    const data = await response.json();

    // Return the list of movie results from the response data
    return data.results;
  } catch (error) {
    // Log any errors that occur during the fetch request or response parsing
    console.error('Error searching movies:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Function to retrieve detailed information about a specific movie by its ID.
 * Sends a request to the TMDB movie details endpoint to fetch movie details.
 * @param {number} movieId - The ID of the movie whose details are to be fetched.
 * @returns {Object} - An object containing movie details.
 * @throws {Error} - Throws an error if the API key is missing or the request fails.
 */
export const getMovieDetails = async (movieId) => {
  // If no API key is provided, throw an error
  if (!API_KEY) throw new Error('API key is not set');

  try {
    // Make a request to the movie details endpoint using the movie ID
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    // If the response status is not OK, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response from the API
    const data = await response.json();

    // Return the detailed movie data from the response
    return data;
  } catch (error) {
    // Log any errors that occur during the fetch request or response parsing
    console.error('Error fetching movie details:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
