// Base URL for The Movie Database (TMDb) API
const BASE_URL = 'https://api.themoviedb.org/3'

// Function to verify if the API key is valid
export const verifyApiKey = async () => {
  try {
    // Send a request to the TMDb authentication endpoint to generate a new token using the API key
    const response = await fetch(
      `${BASE_URL}/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )

    // Parse the response as JSON
    const data = await response.json()

    // If the 'success' property of the response is true, the API key is valid
    return data.success === true
  } catch (error) {
    // If there's an error in the fetch request or response parsing, log it and return false
    console.error('Error verifying API key:', error)
    return false
  }
}

// Function to search for movies based on a keyword
export const searchMovies = async (keyword) => {
  try {
    // Construct the search URL with query parameters
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(keyword)}&language=en-US&page=1&include_adult=false`
    )

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      // If the response is not OK, throw an error with the status code
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parse the response as JSON
    const data = await response.json()

    // Return the movie results from the search
    return data.results
  } catch (error) {
    // If there's an error in the fetch request or response parsing, log it and rethrow the error
    console.error('Error searching movies:', error)
    throw error
  }
}

// Function to get detailed information about a specific movie by its ID
export const getMovieDetails = async (movieId) => {
  try {
    // Send a request to get detailed information about the movie using its ID
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    )

    // Check if the response is successful (status code 200)
    if (!response.ok) {
      // If the response is not OK, throw an error with the status code
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parse the response as JSON to extract the movie details
    const data = await response.json()

    // Return the movie details
    return data
  } catch (error) {
    // If there's an error in the fetch request or response parsing, log it and rethrow the error
    console.error('Error fetching movie details:', error)
    throw error
  }
}
