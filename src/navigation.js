let maxPage;
let page = 1;
let infiteScroll;
searchFormBtn.addEventListener("click", () => {
  location.hash = `#search=${searchFormInput.value}`;
  //console.log("heyy", location.hash, searchFormInput.value);
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});
arrowBtn.addEventListener("click", () => {
  location.hash = window.history.back();
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiteScroll);
function navigator() {
  ////console.log.log({location});
  if (infiteScroll) {
    window.removeEventListener("scroll", infiteScroll, { passive: false });
    infiteScroll = undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDatailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (infiteScroll) {
    window.addEventListener("scroll", infiteScroll, { passive: false });
  }
}
function homePage() {
  //console.log.log('HOMEEEEE');
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");
  favoriteMovieContainer.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");
  getTrendingMoviesPreview();
  getGenresPreview();
  getFavorites();
}
function categoriesPage() {
  //console.log.log('categories');
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");
  favoriteMovieContainer.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  const [_, categoryData] = location.hash.split("=");
  const [genreId, genreName] = categoryData.split("-");
  ////console.log.log(genreId);

  getMoviesByGenre(genreId, genreName);
  headerCategoryTitle.innerHTML = decodeURI(genreName);
  infiteScroll = () => getPaginatedMoviesByGenre(genreId);
}
function movieDatailsPage() {
  //console.log.log('movieDetails');
  headerSection.classList.add("header-container--long");
  // headerSection.style.background = '';
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  favoriteMovieContainer.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");
  const [_, movie_id] = location.hash.split("=");
  getMovieById(movie_id);
}
function searchPage() {
  //console.log.log('search');
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  favoriteMovieContainer.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  const [_, name_Id] = location.hash.split("=");

  getMoviesByName(name_Id);
  infiteScroll = getPaginatedMoviesByName(name_Id);
}
function trendsPage() {
  //console.log.log('TREDS');
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");
  favoriteMovieContainer.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  getTrends();
  infiteScroll = getPaginatedTrends;
}
