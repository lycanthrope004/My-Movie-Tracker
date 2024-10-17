const wasteOfTimeDetailsDiv = document.getElementById('wasteOfTimeDetails');
let wasteOfTime = JSON.parse(localStorage.getItem('wasteOfTime')) || [];

if (wasteOfTime.length > 0) {
    wasteOfTime.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        poster.alt = movie.title;

        const title = document.createElement('h3');
        title.innerText = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;

        const rating = document.createElement('p');
        rating.innerText = `IMDb Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`;

        // Add "❌" button to remove the movie from Waste of Time list
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '❌';
        removeBtn.addEventListener('click', () => {
            // Remove movie from the wasteOfTime array
            wasteOfTime.splice(index, 1);

            // Update local storage
            localStorage.setItem('wasteOfTime', JSON.stringify(wasteOfTime));

            // Remove the movie div from the DOM
            movieDiv.remove();
        });

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(rating);
        movieDiv.appendChild(removeBtn); // Append the remove button

        wasteOfTimeDetailsDiv.appendChild(movieDiv);
    });
} else {
    wasteOfTimeDetailsDiv.innerHTML = '<p>No movies found in this category.</p>';
}
