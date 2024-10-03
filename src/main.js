



const API_URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/week?api_key='+ API_KEY
const API_URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+ API_KEY
const API_KEY_GITHUB = process.env.API_KEY;
async function getTrendingMoviesPreview() {
    const res = await fetch(API_URL_TRENDING);
    const data = await res.json();
  
    const movies = data.results;
    movies.forEach(movie => {
      const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
      
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
  
      movieContainer.appendChild(movieImg);
      trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
  }


  async function getGenresPreview() {
    const res = await fetch(API_URL_GENRES);
    const data = await res.json();
  
    const genres = data.genres;
    // console.log(genres)
    genres.forEach(genre => {
      const categoriesPreviewGenresContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
      
      const genreContainer = document.createElement('div');
      genreContainer.classList.add('category-container');
  
      const genreTitle = document.createElement('h3');
      genreTitle.classList.add('category-title');
      genreTitle.setAttribute('id', 'id'+genre.id);
      // console.log(genre.id,genre.name);
      
      const genreTitleText = document.createTextNode(genre.name);
      genreTitle.appendChild(genreTitleText)
      genreContainer.appendChild(genreTitle);
      categoriesPreviewGenresContainer.appendChild(genreContainer)
      
    });
  }
  getTrendingMoviesPreview()
  getGenresPreview()