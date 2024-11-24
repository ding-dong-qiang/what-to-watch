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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Movie Recommender</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter a keyword (e.g., 'dog')"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchRecommendations}
          disabled={!keyword || isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Loading...' : 'Recommend'}
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(movie => (
            <div key={movie.id} className="border rounded-md p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
              <p className="text-sm mb-2">{movie.overview}</p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieRecommender

