// Get references to the form and movie details div
const movieForm = document.getElementById('movieForm');
const movieNameInput = document.getElementById('movieName');
const movieDetailsDiv = document.getElementById('movieDetails');
const popupMessage = document.getElementById('popupMessage'); // Added reference to the pop-up message div

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let watched = JSON.parse(localStorage.getItem('watched')) || [];
let wasteOfTime = JSON.parse(localStorage.getItem('wasteOfTime')) || [];

// Function to show the pop-up message
function showPopup(message) {
    popupMessage.innerText = message;
    popupMessage.style.opacity = '1'; // Make it fully visible
    popupMessage.style.display = 'block'; // Show the pop-up message

    // Fade out the message after 3 seconds
    setTimeout(() => {
        popupMessage.style.opacity = '0'; // Start fading out
        setTimeout(() => {
            popupMessage.style.display = 'none'; // Hide it after fade-out
        }, 500); // Wait for the fade-out transition to finish
    }, 3000);
}

// Fetch movie details when the form is submitted
movieForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const movieName = movieNameInput.value;

    try {
        const movies = await fetchMovieDetails(movieName); // Call to the fetchingdetails.js function

        // Clear previous movie details
        movieDetailsDiv.innerHTML = '';

        if (movies.length > 0) {
            movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                poster.alt = movie.title;

                const title = document.createElement('h3');
                title.innerText = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;

                const rating = document.createElement('p');
                rating.innerText = `IMDb Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`;

                const favoriteBtn = document.createElement('button');
                favoriteBtn.classList.add('favoriteBtn');
                favoriteBtn.innerHTML = '❤️';
                favoriteBtn.addEventListener('click', () => {
                    if (!favorites.some(fav => fav.id === movie.id)) {
                        favorites.push(movie);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        showPopup(`${movie.title} added to favorites!`); // Use pop-up message
                    } else {
                        showPopup(`${movie.title} is already in favorites!`); // Use pop-up message
                    }
                });

                const eyeBtn = document.createElement('button');
                eyeBtn.classList.add('eyeBtn');
                eyeBtn.innerHTML = '👁️';
                eyeBtn.addEventListener('click', () => {
                    if (!watched.some(wat => wat.id === movie.id)) {
                        watched.push(movie);
                        localStorage.setItem('watched', JSON.stringify(watched));
                        showPopup(`${movie.title} added to watched!`); // Use pop-up message
                    } else {
                        showPopup(`${movie.title} is already in watched!`); // Use pop-up message
                    }
                });

                const dislikeBtn = document.createElement('button');
                dislikeBtn.classList.add('dislikeBtn');
                dislikeBtn.innerHTML = '👎';
                dislikeBtn.addEventListener('click', () => {
                    if (!wasteOfTime.some(waste => waste.id === movie.id)) {
                        wasteOfTime.push(movie);
                        localStorage.setItem('wasteOfTime', JSON.stringify(wasteOfTime));
                        showPopup(`${movie.title} added to waste of time!`); // Use pop-up message
                    } else {
                        showPopup(`${movie.title} is already in waste of time!`); // Use pop-up message
                    }
                });

                movieDiv.appendChild(poster);
                movieDiv.appendChild(title);
                movieDiv.appendChild(rating);
                movieDiv.appendChild(favoriteBtn);
                movieDiv.appendChild(eyeBtn);
                movieDiv.appendChild(dislikeBtn);

                movieDetailsDiv.appendChild(movieDiv);
            });
        } else {
            movieDetailsDiv.innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        movieDetailsDiv.innerHTML = '<p>Error fetching movie data.</p>';
    }

    movieNameInput.value = ''; // Clear input
});
