// This is a mock function. In a real application, you'd typically fetch this data from an API or database.
export function getRandomMovies(keyword, count) {
  const movieList = [
    `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Adventures`,
    `The Secret ${keyword}`,
    `${keyword} in Paris`,
    `${keyword} Squad`,
    `${keyword} Island`,
    `${keyword} Chronicles`,
    `The Last ${keyword}`,
    `${keyword} Empire`,
    `Return of the ${keyword}`,
    `${keyword} Nights`
  ]

  const shuffled = movieList.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

