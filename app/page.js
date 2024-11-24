// Import the MovieRecommender component that will be displayed on the home page
import MovieRecommender from '../components/MovieRecommender'

export default function Home() {
  // The Home component is responsible for rendering the main content of the homepage
  return (
    // The <main> tag serves as the main content area of the page
    <main className="min-h-screen bg-gray-100">
      {/* MovieRecommender component is imported and rendered here */}
      <MovieRecommender />
    </main>
  )
}
