window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
function navigator(){
    console.log({location});
    
    if (location.hash.startsWith('#trends')){
        trendsPage()
    } else if (location.hash.startsWith('#search=')){
        searchPage()
    }else if (location.hash.startsWith('#movieDetails=')){
        movieDatailsPage()
    }else if (location.hash.startsWith('#category=')){
        categoriesPage()
    }
    else{
        homePage()
        
    }

}
function homePage(){
    console.log('HOMEEEEE');
    getTrendingMoviesPreview()
    getGenresPreview()
}
function categoriesPage(){
    console.log('categories');
}
function movieDatailsPage(){
    console.log('movieDetails');
}
function searchPage(){
    console.log('search');
}
function trendsPage(){
    console.log('TREDS');
}