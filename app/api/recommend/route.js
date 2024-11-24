import { NextResponse } from 'next/server'

const TMDB_API_KEY = process.env.TMDB_API_KEY

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(keyword)}&language=en-US&page=1&include_adult=false`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${data.status_message || response.statusText}`)
    }

    const movies = data.results
      .slice(0, 5)
      .map(movie => ({
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average
      }))

    return NextResponse.json(movies)
  } catch (error) {
    console.error('Error fetching movie recommendations:', error)
    return NextResponse.json({ error: 'Failed to fetch movie recommendations' }, { status: 500 })
  }
}

