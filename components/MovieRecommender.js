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
        throw new Error('Invalid API Key. Please check your environment variables.')
      }

      const searchResults = await searchMovies(keyword)
      if (searchResults.length === 0) {
        setError('No movies found for the given keyword.')
        setRecommendations([])
        return
      }

      const randomMovies = getRandomItems(searchResults, 5)
      const detailedMovies = await Promise.all(
        randomMovies.map(movie => getMovieDetails(movie.id))
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
    <div className="container mx-auto px-8 py-12 bg-white text-black font-sans">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-tight">
        Movie Recommender
      </h1>
      
      <div className="flex mb-8">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="flex-grow p-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={fetchRecommendations}
          disabled={!keyword || isLoading}
          className="bg-blue-600 text-white px-6 py-4 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 shadow-lg"
        >
          {isLoading ? 'Loading...' : 'Recommend'}
        </button>
      </div>

      {error && <div className="text-red-600 mb-8 text-lg">{error}</div>}

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recommendations.map(movie => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{movie.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{movie.release_date}</p>
                <p className="text-sm text-gray-700 mb-4">{movie.overview}</p>
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
