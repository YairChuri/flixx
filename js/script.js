const global = {
    currentPage: window.location.pathname,
}
async function displaySlider() {
  const { results } = await fetchData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  })
}
const displayShowDetails = async () => {
    const show_id = window.location.search.split('=')[1];
    const show = await fetchData(`tv/${show_id}`)
    displayBackgroundImage('show', show.backdrop_path)
    const div = document.createElement('div');
    div.innerHTML =`
          <div class="details-top">
          <div>
            <img
            ${
            show.poster_path ? `
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
            `
            : `
            < img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>${show.type}</li>
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => company.name).join(' | ')}</div>
        </div>`
  document.getElementById('show-details').appendChild(div)
}
const displayMovieDetails = async () => {
    const movie_id = window.location.search.split('=')[1];
    const movie = await fetchData(`movie/${movie_id}`)
    displayBackgroundImage('movie', movie.backdrop_path)
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
          <div>
            <img
            ${
            movie.poster_path ? `
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />
            `
            : `
            < img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
            }
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${Math.floor(movie.runtime/60)} hours ${movie.runtime %60} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(' | ')}</div>
        </div>
    `
    document.getElementById('movie-details').appendChild(div)
}

const displayPopularShows = async () => {
    const { results } = await fetchData('tv/popular')
    const popularShows = document.getElementById('popular-shows')

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${show.backdrop_path ? `
            <img
              src="https://image.tmdb.org/t/p/w500${show.backdrop_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            } 
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        `
        popularShows.appendChild(div)
    })
}

const displayPopularMovies = async () => {
    const { results } = await fetchData('movie/popular')
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
const displayBackgroundImage = (type, backgroundPath) => {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';
    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv)
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv)        
    }
}

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show')
}
const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show')
}
const fetchData = async (endpoint) => {


    const API_KEY = 'a955f4210b2a51b4e13ca79e780ba501'
    const API_URL = 'https://api.themoviedb.org/3/'
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    
    const data = await response.json()
    hideSpinner();
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
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
        displaySlider();
            displayPopularMovies();
            break
        case '/search.html':
            console.log('Search')
            break
        case '/shows.html':
            displayPopularShows();
            break
        case '/movie-details.html':
            displayMovieDetails();
            break
        case '/tv-details.html':
            displayShowDetails();
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)

