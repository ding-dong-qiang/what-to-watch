"use client"
// Import necessary modules from React and utility functions from tmdbApi.
// 导入 React 的必要模块和 tmdbApi 的实用函数。
// Nhập các module cần thiết từ React và các hàm tiện ích từ tmdbApi.
import React, { useState } from 'react'
import { searchMovies, getMovieDetails, verifyApiKey, getGenreIdByKeyWord,searchMoviesByCategory } from '../app/utils/tmdbApi'

// Define the MovieRecommender component, which handles the movie recommendation functionality.
// 定义 MovieRecommender 组件，用于处理电影推荐功能。
// Định nghĩa thành phần MovieRecommender, xử lý chức năng gợi ý phim.
const MovieRecommender = () => {
  // State variables for keyword, recommendations, loading status, and error handling.
  // 关键词、推荐列表、加载状态和错误处理的状态变量。
  // Các biến trạng thái cho từ khóa, danh sách gợi ý, trạng thái tải, và xử lý lỗi.
  const [keyword, setKeyword] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Update the keyword state when the input value changes.
  // 当输入值发生变化时，更新关键词状态。
  // Cập nhật trạng thái từ khóa khi giá trị đầu vào thay đổi.
  const handleInputChange = (e) => {
    setKeyword(e.target.value)
  }

  // Trigger the fetchRecommendations function when the Enter key is pressed.
  // 按下回车键时触发 fetchRecommendations 函数。
  // Kích hoạt hàm fetchRecommendations khi nhấn phím Enter.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && keyword && !isLoading) {
      fetchRecommendations()
    }
  }

  // Randomly select a specified number of items from an array.
  // 从数组中随机选择指定数量的项目。
  // Chọn ngẫu nhiên một số mục từ mảng.
  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Fetch movie recommendations based on the entered keyword.
  // 根据输入的关键词获取电影推荐。
  // Lấy gợi ý phim dựa trên từ khóa đã nhập.
  const fetchRecommendations = async () => {
    // Set loading to true and clear any previous errors.
    // 将加载状态设置为 true 并清除之前的错误。
    // Đặt trạng thái tải là true và xóa lỗi trước đó.
    setIsLoading(true)
    setError(null)

    try {
      // Verify if the API key is valid.
      // 验证 API 密钥是否有效。
      // Kiểm tra xem khóa API có hợp lệ không.
      const isApiKeyValid = await verifyApiKey()
      if (!isApiKeyValid) {
        throw new Error('Invalid API Key. Please check the API key in utils/tmdbApi.js')
      }

      // Search for movies based on the keyword.
      // 根据关键词搜索电影。
      // Tìm kiếm phim dựa trên từ khóa.

      //Tam: Update 03/12 about condition to search if keyword equal 
      //category search by Category else by keywords
      const genreId = await getGenreIdByKeyWord(keyword)
      let rs = "";
      if(genreId == 0){
        rs = await searchMovies(keyword)
      }else{
        rs = await searchMoviesByCategory(genreId)
      }
      const searchResults = rs;

      
      

      

      // Handle case where no movies are found.
      // 处理未找到电影的情况。
      // Xử lý trường hợp không tìm thấy phim.
      if (searchResults.length === 0) {
        setError('No movies found for the given keyword.')
        setRecommendations([])
        return
      }

      // Randomly select up to 5 movies from the search results.
      // 从搜索结果中随机选择最多 5 部电影。
      // Chọn ngẫu nhiên tối đa 5 phim từ kết quả tìm kiếm.
      const randomMovies = getRandomItems(searchResults, 5)
      

      // Fetch detailed information for each selected movie.
      // 获取每部选中电影的详细信息。
      // Lấy thông tin chi tiết cho từng phim đã chọn.
      const detailedMovies = await Promise.all(
        randomMovies.map((movie) => getMovieDetails(movie.id))
      )

      // Update the recommendations state with the detailed movie information.
      // 使用详细的电影信息更新推荐状态。
      // Cập nhật trạng thái gợi ý với thông tin chi tiết của phim.
      setRecommendations(detailedMovies)
    } catch (error) {
      // Handle any errors that occur during the process.
      // 处理过程中发生的任何错误。
      // Xử lý bất kỳ lỗi nào xảy ra trong quá trình này.
      console.error('Error fetching recommendations:', error)
      setError(error.message || 'An error occurred while fetching recommendations. Please try again.')
    } finally {
      // Set loading to false after the process completes.
      // 过程完成后将加载状态设置为 false。
      // Đặt trạng thái tải về false sau khi hoàn tất.
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      {/* Header Section */}
      {/* 标题部分 */}
      {/* Phần tiêu đề */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-sans">
        Movie Recommender
      </h1>

      {/* Introduction Section */}
      {/* 介绍部分 */}
      {/* Phần giới thiệu */}
      <p className="text-lg text-gray-700 text-center max-w-3xl mb-8">
        Welcome to the Movie Recommender! This website helps you find amazing movies based on your search keyword. 
        Enter a word or theme, and we’ll recommend some fantastic films you can explore. Click on a movie to learn more!
      </p>

      {/* Search Bar Section */}
      {/* 搜索栏部分 */}
      {/* Phần thanh tìm kiếm */}
      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Add keypress handler for Enter key
          // 添加回车键处理程序。
          // Thêm trình xử lý phím Enter.
          placeholder="Enter a keyword (e.g., 'dog')"
          className="flex-grow px-4 py-3 text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchRecommendations}
          disabled={!keyword || isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Error Message Section */}
      {/* 错误消息部分 */}
      {/* Phần thông báo lỗi */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Recommendations Section */}
      {/* 推荐部分 */}
      {/* Phần gợi ý */}
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {recommendations.map((movie) => (
            <a
              key={movie.id}
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://image.tmdb.org/t/p/w500/efM2btJol7vOlJPSjIc0mbcHvb7.jpg'}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{movie.overview}</p>
                <div className="flex items-center text-yellow-400">
                  <span className="mr-1">★</span>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Footer Section */}
      {/* 页脚部分 */}
      {/* Phần chân trang */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Copyright: Ngoc Tam Nguyen, Dong Chen, Scott Yinan Fan.
      </footer>
    </div>
  )
}

export default MovieRecommender
