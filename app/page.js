"use client"
// Import the MovieRecommender component
import MovieRecommender from '../components/MovieRecommender';

/**
 * The Home function serves as the main entry point for the application's home page.
 * It includes the MovieRecommender component and sets the layout and styling for the page.
 *
 * @returns {JSX.Element} - A React functional component rendering the home page.
 */
export default function Home() {
  return (
    // The main container for the page
    <main 
      // Sets the minimum height of the screen to ensure the page fills the viewport
      className="min-h-screen bg-gray-100" // Background color is a soft gray for a clean look
    >
      {/* Render the MovieRecommender component, which handles the movie search and display logic */}
      <MovieRecommender />
    </main>
  );
}
