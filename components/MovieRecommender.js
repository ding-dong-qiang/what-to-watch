'use client'

import React, { useState } from 'react'
import { searchMovies, getMovieDetails, verifyApiKey } from '../app/utils/tmdbApi'

const MovieRecommender = () => {
  const [keyword, setKeyword] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && keyword && !isLoading) {
      fetchRecommendations()
    }
  }

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const fetchRecommendations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const isApiKeyValid = await verifyApiKey()
      if (!isApiKeyValid) {
        throw new Error('Invalid API Key. Please check the API key in utils/tmdbApi.js')
      }

      const searchResults = await searchMovies(keyword)

      if (searchResults.length === 0) {
        setError('No movies found for the given keyword.')
        setRecommendations([])
        return
      }

      const randomMovies = getRandomItems(searchResults, 5)

      const detailedMovies = await Promise.all(
        randomMovies.map((movie) => getMovieDetails(movie.id))
      )

      setRecommendations(detailedMovies)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setError(error.message || 'An error occurred while fetching recommendations. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      {/* Header Section */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-sans">
        Movie Recommender
      </h1>

      {/* Introduction Section */}
      <p className="text-lg text-gray-700 text-center max-w-3xl mb-8">
        Welcome to the Movie Recommender! This website helps you find amazing movies based on your search keyword. 
        Enter a word or theme, and we’ll recommend some fantastic films you can explore. Click on a movie to learn more!
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
          {isLoading ? 'Loading...' : 'Search'}
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
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{movie.overview}</p>
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
        Copyright: Ngoc Tam Nguyen, Dong Chen, Scott Yinan Fan.
      </footer>
    </div>
  )
}

export default MovieRecommender
