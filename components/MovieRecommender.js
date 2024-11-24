'use client'  // This directive ensures that this code is executed on the client-side only, in Next.js

import React, { useState } from 'react'  // Import React and useState hook for managing state
import { searchMovies, getMovieDetails, verifyApiKey } from '../app/utils/tmdbApi'  // Import functions to interact with TMDB API

const MovieRecommender = () => {
  // Declare state variables using useState hook
  const [keyword, setKeyword] = useState('')  // Stores the search keyword input by the user
  const [recommendations, setRecommendations] = useState([])  // Stores the movie recommendations
  const [isLoading, setIsLoading] = useState(false)  // Indicates whether the app is fetching data from the API
  const [error, setError] = useState(null)  // Stores any error messages if API calls fail

  // Handles input changes in the search bar
  const handleInputChange = (e) => {
    setKeyword(e.target.value)  // Updates the keyword state when user types
  }

  // Randomly selects a specified number of items from the array
  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random())  // Shuffle the array randomly
    return shuffled.slice(0, count)  // Return the first 'count' items from the shuffled array
  }

  // Fetches movie recommendations from the API based on the entered keyword
  const fetchRecommendations = async () => {
    setIsLoading(true)  // Set loading state to true before fetching
    setError(null)  // Reset any previous errors
    try {
      const isApiKeyValid = await verifyApiKey()  // Verifies if the API key is valid
      if (!isApiKeyValid) {
        throw new Error('Invalid API Key. Please check your environment variables.')  // Throws error if API key is invalid
      }

      // Searches for movies based on the keyword
      const searchResults = await searchMovies(keyword)
      if (searchResults.length === 0) {
        setError('No movies found for the given keyword.')  // Sets error if no results are found
        setRecommendations([])  // Clears any previous recommendations
        return
      }

      // Selects 5 random movies from the search results
      const randomMovies = getRandomItems(searchResults, 5)
      // Fetches detailed information for each selected movie
      const detailedMovies = await Promise.all(
        randomMovies.map(movie => getMovieDetails(movie.id))
      )
      setRecommendations(detailedMovies)  // Sets the detailed movies as recommendations
    } catch (error) {
      console.error('Error fetching recommendations:', error)  // Logs any errors in the console
      setError(error.message || 'An error occurred while fetching recommendations. Please try again.')  // Sets the error message in the state
    } finally {
      setIsLoading(false)  // Set loading state to false after API call completion
    }
  }

  return (
    // Main container for the MovieRecommender component with Tailwind CSS classes
    <div className="container mx-auto px-8 py-12 bg-white text-black font-sans">
      {/* Heading of the movie recommender */}
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-tight">
        Movie Recommender
      </h1>
      
      {/* Search input and button for fetching movie recommendations */}
      <div className="flex mb-8">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}  // Updates state when user types in the input
          placeholder="Search for movies..."
          className="flex-grow p-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={fetchRecommendations}  // Triggers the fetchRecommendations function when clicked
          disabled={!keyword || isLoading}  // Disables the button if the keyword is empty or if the app is loading
          className="bg-blue-600 text-white px-6 py-4 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 shadow-lg"
        >
          {isLoading ? 'Loading...' : 'Recommend'}  {/* Displays 'Loading...' when the app is fetching data, otherwise 'Recommend' */}
        </button>
      </div>

      {/* Displays error message if there is any error */}
      {error && <div className="text-red-600 mb-8 text-lg">{error}</div>}

      {/* Displays movie recommendations if available */}
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Loops through the movie recommendations and displays each movie */}
          {recommendations.map(movie => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Displays the movie poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  // Uses the movie's poster image URL
                alt={movie.title}  // Alt text for accessibility
                className="w-full h-80 object-cover"  // Ensures the image covers the area while maintaining aspect ratio
              />
              <div className="p-6">
                {/* Movie title */}
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{movie.title}</h2>
                {/* Movie release date */}
                <p className="text-sm text-gray-600 mb-4">{movie.release_date}</p>
                {/* Movie overview */}
                <p className="text-sm text-gray-700 mb-4">{movie.overview}</p>
                {/* Movie rating */}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieRecommender
