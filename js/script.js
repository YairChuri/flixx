const global = {
    currentPage: window.location.pathname,
}

const displayPopularMovies = async () => {
    const { results } = await fetchMovieData('movie/popular')
    console.log(results)
    const popularMovies = document.getElementById('popular-movies')

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
            movie.poster_path ? `
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
            `
            : `
            < img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `
        popularMovies.appendChild(div)
    })
}

const fetchMovieData = async (endpoint) => {
    const API_KEY = 'a955f4210b2a51b4e13ca79e780ba501'
    const API_URL = 'https://api.themoviedb.org/3/'

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    
    const data = await response.json()
    return data;
}

const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break
        case '/search.html':
            console.log('Search')
            break
        case '/shows.html':
            console.log('TV Shows')
            break
        case '/movie-details.html':
            console.log('Movie details')
            break
        case '/tv-details.html':
            console.log('TV show details')
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
