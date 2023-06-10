const API_KEY = "api_key=bfabd6b67cd9f0b109626047ffb82a74"
const BASE_URL = "https://api.themoviedb.org/3"

//page numbers
let pagenum = 1
//page number change number


const form = document.getElementById('form')
const search = document.getElementById('search')
const searchUrl = BASE_URL + '/search/movie?'+API_KEY
const clear = document.getElementById('clear')
const add_more = document.getElementById('add_more')


function updateURL(pagenum){
    let API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&page='+pagenum+'&' + API_KEY
    return API_URL
}

API_URL = updateURL(1)

receiveMovie(API_URL)

function receiveMovie(url){

    fetch(url).then(response => response.json()).then((data) => {
        displayMovie(data.results)
    })
    
}
function clearDisplay(){
    const sub = document.querySelector(".container")
    sub.innerHTML=""
}


function displayMovie(data){

    data.forEach(movie => {
        
        const {original_title,vote_average,poster_path,overview} = movie
        const movieEl= document.createElement("div")
        movieEl.setAttribute("class","box")
        //create a new html file. 
        movieEl.innerHTML += `
                            <img class="poster" src="https://image.tmdb.org/t/p/original/${poster_path}">
                            <div class="movie-info">
                                <p class="vote_average">✨${vote_average}</p>
                                <p class="movie_title">${original_title}</p>
                                
                            </div>
                            <div class="overview">
                                ${overview}
                            </div>
                        `
        let addMovie = document.querySelector(".container")
        // console.log(addMovie)
        addMovie.appendChild(movieEl)
        
    });
  

}

// search function

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = search.value

    if(searchInput){
        receiveMovie(searchUrl+'&query='+searchInput)

    }else{
        receiveMovie(API_URL)
    }
})
 

clear.addEventListener('click', (e) => {
    clearDisplay()
    pagenum = 1
    API_URL = updateURL(pagenum)
    receiveMovie(API_URL)
})

add_more.addEventListener('click', (e) =>{
    pagenum++
    console.log(pagenum)
    API_URL = updateURL(pagenum)

    receiveMovie(API_URL)
})
    

