searchFormBtn.addEventListener('click', ()=>{
    
    location.hash='#search='+searchFormInput.value;
    
})
trendingBtn.addEventListener('click', ()=>{
    location.hash='#trends'
})
arrowBtn.addEventListener('click',()=>{
    location.hash = window.history.back();
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
function navigator(){
    console.log({location});
    
    if (location.hash.startsWith('#trends')){
        trendsPage()
    } else if (location.hash.startsWith('#search=')){
        searchPage()
    }else if (location.hash.startsWith('#movie=')){
        movieDatailsPage()
    }else if (location.hash.startsWith('#category=')){
        categoriesPage()
    }
    else{
        homePage()
        
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
function homePage(){
    console.log('HOMEEEEE');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    getTrendingMoviesPreview()
    getGenresPreview()
}
function categoriesPage(){
    console.log('categories');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    const [_,categoryData] = location.hash.split('=')
    const [genreId,genreName] = categoryData.split('-')
    //console.log(genreId);
    
    getMoviesByGenre(genreId, genreName);
    headerCategoryTitle.innerHTML = decodeURI(genreName)
}
function movieDatailsPage(){
    console.log('movieDetails');
    headerSection.classList.add('header-container--long');
   // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    const [_,movie_id] = location.hash.split('=')
    getMovieById(movie_id)
    
}
function searchPage(){
    console.log('search');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    //console.log(searchFormInput.value);
    
    getMoviesByName(searchFormInput.value)
}

function trendsPage(){
    console.log('TREDS');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    getTrends()
}