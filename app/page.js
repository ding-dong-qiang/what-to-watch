'use client'

// Import the useState hook from React to manage component state
import { useState } from 'react'

// This function simulates fetching random movies based on a keyword (mock implementation)
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

  // Shuffle the movie list to add randomness
  const shuffled = movieList.sort(() => 0.5 - Math.random())
  // Return a slice of the shuffled list containing the number of items requested by `count`
  return shuffled.slice(0, count)
}

export default function Home() {
  // State for the keyword entered by the user
  const [keyword, setKeyword] = useState('')
  
  // State for storing the list of movie recommendations
  const [movies, setMovies] = useState([])
  
  // State for managing the loading state while fetching data
  const [loading, setLoading] = useState(false)
  
  // State for storing any error messages
  const [error, setError] = useState(null)

  // Function to fetch movie recommendations
  const getRecommendations = async () => {
    // Exit early if the keyword is empty
    if (!keyword) return

    // Set loading to true and clear any previous errors
    setLoading(true)
    setError(null)

    try {
      // Here, instead of calling an API, we'll use the mock function `getRandomMovies`
      // It generates a new random set of movie titles based on the provided keyword.
      const randomMovies = getRandomMovies(keyword, 5)  // Get 5 random movies
      setMovies(randomMovies) // Update state with the new movie list
    } catch (error) {
      // Log the error for debugging and update the error state with a user-friendly message
      console.error('Error fetching recommendations:', error)
      setError('Failed to fetch recommendations. Please try again.')
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false)
    }
  }

  // Render the main UI
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Page title */}
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Movie Recommender</h1>

      {/* Input field and button for entering a keyword */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {/* Input for the keyword */}
        <input
          type="text"
          value={keyword} // Controlled input bound to the keyword state
          onChange={(e) => setKeyword(e.target.value)} // Update state on user input
          placeholder="Enter a keyword (e.g., 'dog')" // Placeholder text for guidance
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        {/* Button to trigger the getRecommendations function */}
        <button 
          onClick={getRecommendations} 
          disabled={loading} // Disable the button while loading
          style={{
            backgroundColor: loading ? '#ccc' : '#0070f3', // Change color based on loading state
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer' // Change cursor style while loading
          }}
        >
          {loading ? 'Loading...' : 'Get Recommendations'} {/* Display loading text while fetching */}
        </button>
      </div>

      {/* Display error message if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the list of movie recommendations if available */}
      {movies.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {movies.map((movie, index) => (
            // Render each movie as a list item with styling
            <li key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
              {/* Movie title */}
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{movie.title}</h2>

              {/* Movie release date */}
              <p style={{ fontSize: '14px', color: '#666' }}>Release Date: {movie.releaseDate}</p>

              {/* Movie rating */}
              <p style={{ fontSize: '14px', color: '#666' }}>Rating: {movie.rating}/10</p>

              {/* Movie overview/description */}
              <p style={{ marginTop: '10px' }}>{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
