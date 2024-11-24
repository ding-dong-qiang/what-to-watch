'use client'

import { useState } from 'react'

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
      const response = await fetch(`/api/recommend?keyword=${encodeURIComponent(keyword)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setMovies(data)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setError('Failed to fetch recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Movie Recommender</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword (e.g., 'dog')"
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button 
          onClick={getRecommendations} 
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movies.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie, index) => (
            <li key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{movie.title}</h2>
              <p style={{ fontSize: '14px', color: '#666' }}>Release Date: {movie.releaseDate}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>Rating: {movie.voteAverage}/10</p>
              <p style={{ marginTop: '10px' }}>{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

