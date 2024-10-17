const favoritesDetailsDiv = document.getElementById('favoritesDetails');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

if (favorites.length > 0) {
    favorites.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        poster.alt = movie.title;

        const title = document.createElement('h3');
        title.innerText = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;

        const rating = document.createElement('p');
        rating.innerText = `IMDb Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`;

        // Create ❌ button for removing movie from favorites
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '❌';
        removeBtn.classList.add('removeBtn');
        removeBtn.addEventListener('click', () => {
            favorites.splice(index, 1); // Remove the movie from the array
            localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
            movieDiv.remove(); // Remove the movie from the DOM
        });

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(rating);
        movieDiv.appendChild(removeBtn); // Append the remove button

        favoritesDetailsDiv.appendChild(movieDiv);
    });
} else {
    favoritesDetailsDiv.innerHTML = '<p>No favorite movies found.</p>';
}
