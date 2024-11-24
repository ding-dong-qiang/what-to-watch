// Export metadata for the page, which includes title and description
export const metadata = {
  // The title of the page, displayed in the browser tab or search engine previews
  title: 'Movie Recommender',
  
  // A short description of the page, useful for SEO and social sharing
  description: 'Get random movie recommendations based on keywords',
}

// Define the RootLayout component that wraps the entire page layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Declare the language of the document as English for accessibility and SEO */}
      <head>
        {/* Inject global CSS styles directly into the document's head */}
        <style>{`
          /* Define a CSS variable for monospaced fonts */
          :root {
            --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
              'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
              'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
          }
          
          /* Apply box-sizing to include padding and borders in element sizes */
          * {
            box-sizing: border-box;
            padding: 0; /* Reset padding for all elements */
            margin: 0; /* Reset margin for all elements */
          }

          /* Ensure no horizontal overflow occurs on the root HTML and body elements */
          html,
          body {
            max-width: 100vw; /* Restrict maximum width to the viewport width */
            overflow-x: hidden; /* Prevent horizontal scrolling */
          }

          /* Set default styles for the body element */
          body {
            color: rgb(var(--foreground-rgb)); /* Text color, customizable via a CSS variable */
            background: #f0f0f0; /* Light gray background color for improved readability */
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            /* Use a set of system fonts for better performance and appearance across platforms */
          }

          /* Default styling for links */
          a {
            color: inherit; /* Inherit text color for consistency */
            text-decoration: none; /* Remove underline from links */
          }
        `}</style>
      </head>
      <body>
        {/* Render the children passed to this layout */}
        {children}
      </body>
    </html>
  )
}
