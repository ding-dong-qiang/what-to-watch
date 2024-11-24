// Export metadata for the page, including title and description
export const metadata = {
  title: 'Movie Recommender',
  description: 'Get random movie recommendations based on keywords',
}

// Define the RootLayout component that wraps the entire page layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind handles global styles, so no need for custom styles here */}
      </head>
      <body className="bg-gray-100 text-gray-900 font-sans antialiased">
        {/* Render children inside the layout */}
        {children}
      </body>
    </html>
  )
}
