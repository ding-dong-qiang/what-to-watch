// Import the NextResponse utility from Next.js to handle server responses
import { NextResponse } from 'next/server'

// Get the TMDB (The Movie Database) API key from environment variables
const TMDB_API_KEY = process.env.TMDB_API_KEY

// Define the GET function to handle incoming HTTP GET requests
export async function GET(request) {
  // Parse the request URL to access query parameters
  const { searchParams } = new URL(request.url)
  
  // Extract the 'keyword' query parameter from the URL
  const keyword = searchParams.get('keyword')

  // Validate if the 'keyword' parameter exists
  if (!keyword) {
    // Return a 400 Bad Request response if 'keyword' is missing
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 })
  }

  try {
    // Make a GET request to the TMDB API to search for movies matching the keyword
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(keyword)}&language=en-US&page=1&include_adult=false`
    )
    
    // Parse the JSON response from the TMDB API
    const data = await response.json()

    // Check if the response indicates an error (non-2xx status code)
    if (!response.ok) {
      // Throw an error with the TMDB error message or status text
      throw new Error(`TMDB API error: ${data.status_message || response.statusText}`)
    }

    // Extract the first 5 movie results and map them to a simplified format
    const movies = data.results
      .slice(0, 5) // Limit to the first 5 results
      .map(movie => ({
        // Include relevant fields for each movie
        title: movie.title, // Movie title
        overview: movie.overview, // Short description of the movie
        releaseDate: movie.release_date, // Release date
        voteAverage: movie.vote_average // Average user rating
      }))

    // Return the simplified list of movies as a JSON response
    return NextResponse.json(movies)
  } catch (error) {
    // Log the error details to the server console for debugging
    console.error('Error fetching movie recommendations:', error)

    // Return a 500 Internal Server Error response with an error message
    return NextResponse.json({ error: 'Failed to fetch movie recommendations' }, { status: 500 })
  }
}
