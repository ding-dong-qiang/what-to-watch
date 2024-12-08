// This is a mock function that generates a list of movie titles based on a keyword.
// In a real-world application, you'd typically fetch movie data from an API or a database.
export function getRandomMovies(keyword, count) {
  // Define a hardcoded list of movie titles incorporating the provided keyword.
  const movieList = [
    `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Adventures`, // Capitalize the first letter of the keyword
    `The Secret ${keyword}`, // Combine "The Secret" with the keyword
    `${keyword} in Paris`, // A themed title with "in Paris"
    `${keyword} Squad`, // A squad-themed title
    `${keyword} Island`, // A title indicating an island adventure
    `${keyword} Chronicles`, // Chronicles themed title
    `The Last ${keyword}`, // A dramatic title with "The Last"
    `${keyword} Empire`, // An empire-themed title
    `Return of the ${keyword}`, // A returning-themed title
    `${keyword} Nights` // A nights-themed title
  ]

  // Shuffle the movie list to add randomness.
  // This uses `sort` with a random comparison function. It generates a random value between -0.5 and 0.5 to rearrange elements.
  const shuffled = movieList.sort(() => 0.5 - Math.random())

  // Slice the shuffled list to return the desired number of movies, as specified by `count`.
  return shuffled.slice(0, count)
}
