export const metadata = {
  title: 'Movie Recommender',
  description: 'Get random movie recommendations based on keywords',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
              'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
              'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
          }
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
          html,
          body {
            max-width: 100vw;
            overflow-x: hidden;
          }
          body {
            color: rgb(var(--foreground-rgb));
            background: #f0f0f0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}

