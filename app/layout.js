// Import global styles for the application
import '../app/globals.css'

// Metadata for the page, used for SEO purposes and page title
export const metadata = {
  title: 'Movie Recommender', // The title that will appear in the browser tab
  description: 'Get random movie recommendations based on keywords', // A brief description of the page
}

export default function RootLayout({ children }) {
  // The RootLayout component is responsible for defining the basic structure of the page
  return (
    // The <html> tag specifies the language of the page content
    <html lang="en">
      {/* The <body> tag wraps the content of the page, which is passed as 'children' */}
      <body>{children}</body>
    </html>
  )
}
