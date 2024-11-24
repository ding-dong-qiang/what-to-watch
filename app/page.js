'use client'

import { useState } from 'react'

function getRandomMovies(keyword, count) {
  const movieList = [
    { title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Adventures`, releaseDate: '2024-01-01', rating: '7.8', overview: `A thrilling adventure with a dog named ${keyword}.` },
    { title: `The Secret ${keyword}`, releaseDate: '2023-05-15', rating: '8.2', overview: `A mysterious adventure involving the secret life of a ${keyword}.` },
    { title: `${keyword} in Paris`, releaseDate: '2025-07-22', rating: '6.9', overview: `Join a ${keyword} on its journey through the streets of Paris.` },
    { title: `${keyword} Squad`, releaseDate: '2024-08-30', rating: '7.5', overview: `A squad of dogs with incredible powers saves the day.` },
    { title: `${keyword} Island`, releaseDate: '2026-02-12', rating: '7.0', overview: `A thrilling escape on an island populated by strange creatures, including ${keyword}.` },
    { title: `${keyword} Chronicles`, releaseDate: '2023-11-18', rating: '8.0', overview: `The epic story of a dog named ${keyword} and its adventures across the globe.` },
    { title: `The Last ${keyword}`, releaseDate: '2023-12-05', rating: '7.4', overview: `The last known ${keyword} on Earth fights for survival in a dystopian world.` },
    { title: `${keyword} Empire`, releaseDate: '2025-06-09', rating: '7.2', overview: `A ${keyword} battles to reclaim its empire in an epic struggle.` },
    { title: `Return of the ${keyword}`, releaseDate: '2024-03-25', rating: '6.8', overview: `A beloved ${keyword} returns to save the world from a great evil.` },
    { title: `${keyword} Nights`, releaseDate: '2024-09-14', rating: '7.1', overview: `Mystery unfolds at night in a city where a ${keyword} is the only clue.` }
  ]

  const shuffled = movieList.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRecommendations = async () => {
    if (!keyword) return
    setLoading(true)
    setError(null)

    try {
      const randomMovies = getRandomMovies(keyword, 5)
      setMovies(randomMovies)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setError('Failed to fetch recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-5">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-5">Movie Recommender</h1>

      {/* Input field and button */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword (e.g., 'dog')"
          className="flex-grow px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={getRecommendations}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movie recommendations */}
      {movies.length > 0 && (
        <ul className="space-y-4">
          {movies.map((movie, index) => (
            <li key={index} className="border border-gray-300 rounded p-4">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-500">Release Date: {movie.releaseDate}</p>
              <p className="text-sm text-gray-500">Rating: {movie.rating}/10</p>
              <p className="mt-2">{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
