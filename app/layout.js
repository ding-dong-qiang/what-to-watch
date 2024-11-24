import '../app/globals.css'

export const metadata = {
  title: 'Movie Recommender',
  description: 'Get random movie recommendations based on keywords',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

