const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
const API_URL_TRENDING = "/trending/movie/week";
const API_URL_GENRES = "/genre/movie/list";
const API_URL_GENRESEARCH = "/discover/movie";
const API_URL_NAMESEARCH = "/search/movie";
const API_URL_MOVIEDETAILS = "/movie/";

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //console.log({entry})
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});
function printMovies(movies, container, lazyLoad = false) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = `movie=${movie.id}`;
    });
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoader ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute("src", "src/images/noload.jpg");
      const movieNameContainer = document.createElement("span");
      const movieNameText = document.createTextNode(
        `${movieImg.getAttribute("alt")}`
      );
      movieContainer.appendChild(movieNameContainer);
      movieNameContainer.appendChild(movieNameText);
    });
    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}
function createGenres(genres, container) {
  container.innerHTML = "";
  // //console.log.log(genres)
  genres.forEach((genre) => {
    const genreContainer = document.createElement("div");
    genreContainer.classList.add("category-container");

    const genreTitle = document.createElement("h3");
    genreTitle.classList.add("category-title");
    genreTitle.setAttribute("id", "id" + genre.id);
    genreTitle.addEventListener("click", () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    });
    // //console.log.log(genre.id,genre.name);

    const genreTitleText = document.createTextNode(genre.name);
    genreTitle.appendChild(genreTitleText);
    genreContainer.appendChild(genreTitle);
    container.appendChild(genreContainer);
  });
}
async function getTrendingMoviesPreview() {
  const { status, data } = await api(API_URL_TRENDING);
  //console.log(status,data)
  const movies = data.results;
  printMovies(movies, trendingMoviesPreviewList, true);
}
async function getGenresPreview() {
  const { status, data } = await api(API_URL_GENRES);
  const genres = data.genres;
  createGenres(genres, categoriesPreviewList);
}
// getTrendingMoviesPreview()
// getGenresPreview()

async function getMoviesByGenre(id) {
  const { status, data } = await api(API_URL_GENRESEARCH, {
    params: {
      with_genres: id,
    },
  });
  //console.log.log(status, data)
  const moviesResults = data.results;
  //console.log.log(moviesResults)
  printMovies(moviesResults, genericSection, true);
}
async function getMoviesByName(query) {
  //console.log("get in ", query);
  const { status, data } = await api(API_URL_NAMESEARCH, {
    params: {
      query: query,
    },
  });
  //console.log("B", { status }, data.results);
  ////console.log.log(status,data)
  printMovies(data.results, genericSection, true);
}
async function getTrends() {
  const { status, data } = await api(API_URL_TRENDING);
  const movies = data.results;
  //console.log.log(status,data)
  headerCategoryTitle.innerHTML = "Tendencias";
  printMovies(movies, genericSection, true);
}
async function getMovieById(id) {
  const { status, data: movie } = await api(API_URL_MOVIEDETAILS + id);
  //console.log.log(status,movie)
  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  headerSection.style.background = `url(${movieImgUrl})`;
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;
  //console.log.log(movie.genres)
  createGenres(movie.genres, movieDetailCategoriesList);
  getRelatedmMoviesById(id);
}
async function getRelatedmMoviesById(id) {
  const { status, data } = await api(
    API_URL_MOVIEDETAILS + id + "/recommendations"
  );
  //console.log.log(status,data)
  printMovies(data.results, relatedMoviesContainer, true);
}
