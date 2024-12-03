// Base URL for The Movie Database (TMDB) API
const BASE_URL = 'https://api.themoviedb.org/3';

// API Key for authenticating requests to TMDB API
// Replace with your own API key to make this functional in a production environment.
const API_KEY = '63d5d408c8ec1385e2bbc5bdab784582';

/**
 * Verifies the API key by attempting to generate a new authentication token.
 * 
 * @returns {Promise<boolean>} - Returns `true` if the API key is valid, `false` otherwise.
 */
export const verifyApiKey = async () => {
  try {
    // API endpoint to request a new token using the API key
    const response = await fetch(
      `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );

    // Convert the response to JSON format
    const data = await response.json();

    // Check if the API call was successful
    return data.success === true;
  } catch (error) {
    // Log errors to the console for debugging
    console.error('Error verifying API key:', error);

    // Return false to indicate failure in verification
    return false;
  }
};

/**
 * Tam
 * Fetches genre list, search by category
 */
export const getGenreIdByKeyWord = async (keyword) =>{
  try {
    // API endpoint to fetch genre list
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );

    // Check if the HTTP response is successful (status 200)
    if (!response.ok) {
      // Throw an error with the response status if the API call fails
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();
    console.dir(data);
    const genre = data.genres.find(g => g.name.toLowerCase() === keyword.toLowerCase());
    if (genre) {
      console.log(`Genre ID:${genre.id}`);
      return genre.id;
    } else {
      console.log('Genre not found');
      return 0;
    }

    // Return the array of genres
    //return data.genres;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching genre list:', error);

    // Rethrow the error to be handled by the calling function
    throw error;
  }
}
export const searchMoviesByCategory = async (genreid) => {
  try {
    // Construct the API URL with the search keyword, API key, and other parameters
    //If condition search by Genre
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${encodeURIComponent(genreid)}&language=en-US&page=1&include_adult=false`
    );
    

    // Check if the HTTP response is successful (status 200)
    if (!response.ok) {
      // Throw an error with the response status if the API call fails
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();

    console.dir(data);

    // Return the array of search results
    return data.results;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error searching movies:', error);

    // Rethrow the error to be handled by the calling function
    throw error;
  }
};
/**
 * Searches for movies based on a keyword.
 * 
 * @param {string} keyword - The keyword to search for (e.g., movie title or topic).
 * @returns {Promise<Array>} - Returns an array of search results (movies).
 * @throws {Error} - Throws an error if the API call fails.
 */
export const searchMovies = async (keyword) => {
  try {
    // Construct the API URL with the search keyword, API key, and other parameters
    //If condition search by Genre
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}&language=en-US&page=1&include_adult=false`
    );
    

    // Check if the HTTP response is successful (status 200)
    if (!response.ok) {
      // Throw an error with the response status if the API call fails
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();

    //console.dir(data);

    // Return the array of search results
    return data.results;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error searching movies:', error);

    // Rethrow the error to be handled by the calling function
    throw error;
  }
};

/**
 * Fetches detailed information about a specific movie.
 * 
 * @param {number} movieId - The unique ID of the movie to fetch details for.
 * @returns {Promise<Object>} - Returns a movie object containing detailed information.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const getMovieDetails = async (movieId) => {
  try {
    // API endpoint to fetch detailed movie information by ID
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    // Check if the HTTP response is successful (status 200)
    if (!response.ok) {
      // Throw an error with the response status if the API call fails
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();
    

    // Return the detailed movie object
    return data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching movie details:', error);

    // Rethrow the error to be handled by the calling function
    throw error;
  }
};
