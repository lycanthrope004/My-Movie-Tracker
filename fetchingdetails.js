// Fetch movie details function
async function fetchMovieDetails(movieName) {
    const apiKey = 'aec7e6e667721b7daae53d1c6bfedcf9'; // Replace with your TMDb API key
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw new Error('Failed to fetch movie data.');
    }
}
