"use client"
// Import necessary modules from React and utility functions from tmdbApi.

import React, { useState } from 'react'
import { searchMovies, getMovieDetails, verifyApiKey, getGenreIdByKeyWord,searchMoviesByCategory } from '../app/utils/tmdbApi'

// Define the MovieRecommender component, which handles the movie recommendation functionality.

const MovieRecommender = () => {
  // State variables for keyword, recommendations, loading status, and error handling.

  const [keyword, setKeyword] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Update the keyword state when the input value changes.

  const handleInputChange = (e) => {
    setKeyword(e.target.value)
  }

  // Trigger the fetchRecommendations function when the Enter key is pressed.

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && keyword && !isLoading) {
      fetchRecommendations()
    }
  }

  // Randomly select a specified number of items from an array.

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Fetch movie recommendations based on the entered keyword.

  const fetchRecommendations = async () => {
    // Set loading to true and clear any previous errors.

    setIsLoading(true)
    setError(null)

    try {
      // Verify if the API key is valid.

      const isApiKeyValid = await verifyApiKey()
      if (!isApiKeyValid) {
        throw new Error('Invalid API Key. Please check the API key in utils/tmdbApi.js')
      }

      // Search for movies based on the keyword.


      //Tam: Update 03/12 about condition to search if keyword equal 
      //category search by Category else by keywords
      const genreId = await getGenreIdByKeyWord(keyword)
      let rs = "";
      if(genreId == 0){
        rs = await searchMovies(keyword)
      }else{
        rs = await searchMoviesByCategory(genreId)
      }
      const searchResults = rs;

      
      

      

      // Handle case where no movies are found.

      if (searchResults.length === 0) {
        setError('No movies found for the given keyword.')
        setRecommendations([])
        return
      }

      // Randomly select up to 5 movies from the search results.

      const randomMovies = getRandomItems(searchResults, 5)
      

      // Fetch detailed information for each selected movie.

      const detailedMovies = await Promise.all(
        randomMovies.map((movie) => getMovieDetails(movie.id))
      )

      // Update the recommendations state with the detailed movie information.

      setRecommendations(detailedMovies)
    } catch (error) {
      // Handle any errors that occur during the process.

      console.error('Error fetching recommendations:', error)
      setError(error.message || 'An error occurred while fetching recommendations. Please try again.')
    } finally {
      // Set loading to false after the process completes.

      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      {/* Header Section */}

      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-sans">
        What To Watch
      </h1>

      {/* Introduction Section */}

      <p className="text-lg text-gray-700 text-left max-w-3xl mb-8">
        Welcome to the WhatToWatch! When you&apos;re unsure what movie to watch,
        we&apos;ve got you covered with some great options!
        <br/>
        <br/>Enter a genre or theme, and we&apos;ll randomly recommend 5 fantastic films you can choose. Click on
        a movie to learn more!
      </p>

      {/* Search Bar Section */}

      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Add keypress handler for Enter key
          placeholder="Enter a keyword (e.g., 'dog')"
          className="flex-grow px-4 py-3 text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchRecommendations}
          disabled={!keyword || isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Spin the Wheel!"}
        </button>
      </div>

      {/* Error Message Section */}

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Recommendations Section */}

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {recommendations.map((movie) => (
            <a
              key={movie.id}
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://image.tmdb.org/t/p/w500/efM2btJol7vOlJPSjIc0mbcHvb7.jpg"
                }
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {movie.release_date}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {movie.overview}
                </p>
                <div className="flex items-center text-yellow-400">
                  <span className="mr-1">★</span>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Footer Section */}

      <footer className="mt-12 text-center text-gray-500 text-sm">
        Copyright: Ngoc Tam Nguyen, Dong Chen, Yinan Fan.
      </footer>
    </div>
  );
}

export default MovieRecommender
