

$(document).ready(function() {
    const apiKey = 'eba8b9a7199efdcb0ca1f96879b83c44';
    const apiURL = 'https://api.themoviedb.org/3';
    const moviesContainer = $('#movies');

    function fetchMovies(endpoint) {
        $.get(`${apiURL}${endpoint}?api_key=${apiKey}`, function(data) {
            moviesContainer.empty();
            data.results.forEach(movie => {
                const movieElement = `
                    <div class="movie">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title || movie.name}">
                        <div class="movie-info">
                            <h3>${movie.title || movie.name}</h3>
                            <p>${movie.overview}</p>
                            <p>Rating: ${movie.vote_average}</p>
                            <p>Release Date: ${movie.release_date || movie.first_air_date}</p>
                        </div>
                    </div>
                `;
                moviesContainer.append(movieElement);
            });
        }).fail(function() {
            console.error('Error fetching data from the API.');
        });
    }

    $('#now-playing').click(function() { fetchMovies('/movie/now_playing'); });
    $('#popular').click(function() { fetchMovies('/movie/popular'); });
    $('#top-rated').click(function() { fetchMovies('/movie/top_rated'); });
    $('#trending').click(function() { fetchMovies('/trending/all/day'); });
    $('#upcoming').click(function() { fetchMovies('/movie/upcoming'); });

    $('#contact-us').click(function() {
        $('#movies').hide();
        $('#contact-form').show();
    });

    // Load default trending movies on page load
    fetchMovies('/trending/all/day');
});





