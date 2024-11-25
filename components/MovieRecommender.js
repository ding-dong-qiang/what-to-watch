'use client'

import React, { useState } from 'react'
import { searchMovies, getMovieDetails, verifyApiKey } from '../app/utils/tmdbApi'

const MovieRecommender = () => {
  // State to store the search keyword entered by the user
  const [keyword, setKeyword] = useState('')

  // State to store the list of movie recommendations
  const [recommendations, setRecommendations] = useState([])

  // State to manage the loading status while fetching data
  const [isLoading, setIsLoading] = useState(false)

  // State to store any errors that occur during the fetch process
  const [error, setError] = useState(null)

  /**
   * Updates the search keyword state as the user types into the input field.
   * @param {Object} e - The event object from the input field.
   */
  const handleInputChange = (e) => {
    setKeyword(e.target.value)
  }

  /**
   * Selects a specified number of random items from an array.
   * @param {Array} array - The source array.
   * @param {Number} count - The number of items to select.
   * @returns {Array} - A new array containing the randomly selected items.
   */
  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random()) // Shuffle the array randomly
    return shuffled.slice(0, count) // Return the first 'count' items
  }

  /**
   * Fetches movie recommendations based on the user's keyword.
   * Utilizes TMDB API for searching and retrieving movie details.
   */
  const fetchRecommendations = async () => {
    setIsLoading(true) // Set loading state to true while fetching
    setError(null) // Clear any previous error messages

    try {
      // Verify the validity of the API key before making requests
      const isApiKeyValid = await verifyApiKey()
      if (!isApiKeyValid) {
        throw new Error('Invalid API Key. Please check the API key in utils/tmdbApi.js')
      }

      // Search for movies matching the keyword
      const searchResults = await searchMovies(keyword)

      // If no movies are found, display an error message
      if (searchResults.length === 0) {
        setError('No movies found for the given keyword.')
        setRecommendations([]) // Clear previous recommendations
        return
      }

      // Randomly select 5 movies from the search results
      const randomMovies = getRandomItems(searchResults, 5)

      // Fetch detailed information for the selected movies
      const detailedMovies = await Promise.all(
        randomMovies.map((movie) => getMovieDetails(movie.id))
      )

      // Update the recommendations state with the detailed movie data
      setRecommendations(detailedMovies)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setError(error.message || 'An error occurred while fetching recommendations. Please try again.')
    } finally {
      setIsLoading(false) // Reset the loading state
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      {/* Header Section */}
      {/* Displays the main title of the application */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-sans">
        Movie Recommender
      </h1>

      {/* Search Bar Section */}
      {/* Input field for entering a keyword and a button to trigger the recommendation search */}
      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange} // Updates the keyword state on input
          placeholder="Enter a keyword (e.g., 'dog')"
          className="flex-grow px-4 py-3 text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchRecommendations} // Fetches recommendations on click
          disabled={!keyword || isLoading} // Disable button if keyword is empty or loading
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {/* Button displays "Loading..." while the fetch is in progress */}
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Error Message Section */}
      {/* Displays an error message if there's an issue fetching recommendations */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Recommendations Section */}
      {/* Displays movie recommendations in a responsive grid layout */}
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {recommendations.map((movie) => (
            <div
              key={movie.id} // Unique identifier for each movie
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Movie Poster */}
              {/* Dynamically loads the movie poster image from the TMDB API */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title} // Alt text for accessibility
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                {/* Movie Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {movie.title}
                </h2>

                {/* Release Date */}
                <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>

                {/* Overview */}
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {movie.overview} {/* Displays a brief overview of the movie */}
                </p>

                {/* Rating */}
                <div className="flex items-center text-yellow-400">
                  <span className="mr-1">★</span>
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
