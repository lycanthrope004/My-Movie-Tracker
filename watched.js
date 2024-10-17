const watchedDetailsDiv = document.getElementById('watchedDetails');
let watched = JSON.parse(localStorage.getItem('watched')) || [];

if (watched.length > 0) {
    watched.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        poster.alt = movie.title;

        const title = document.createElement('h3');
        title.innerText = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;

        const rating = document.createElement('p');
        rating.innerText = `IMDb Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`;

        // Add "❌" button to remove the movie from Watched list
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '❌';
        removeBtn.addEventListener('click', () => {
            // Remove movie from the watched array
            watched.splice(index, 1);

            // Update local storage
            localStorage.setItem('watched', JSON.stringify(watched));

            // Remove the movie div from the DOM
            movieDiv.remove();
        });

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(rating);
        movieDiv.appendChild(removeBtn); // Append the remove button

        watchedDetailsDiv.appendChild(movieDiv);
    });
} else {
    watchedDetailsDiv.innerHTML = '<p>No watched movies found.</p>';
}
