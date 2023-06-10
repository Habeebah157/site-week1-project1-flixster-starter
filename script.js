const API_KEY = "api_key=bfabd6b67cd9f0b109626047ffb82a74"
const BASE_URL = "https://api.themoviedb.org/3"

//page numbers
let pagenum = 1
//page number change number

//variables
const form = document.getElementById('form')
const search = document.getElementById('search-input')
const searchUrl = BASE_URL + '/search/movie?'+API_KEY
const clear = document.getElementById('clear')
const add_more = document.getElementById('load-more-movies-btn')
const openModal = document.querySelector('open_overview')
const closeModal = document.querySelector('close_overview')
const modal = document.querySelector('.modal')

//updates the url based on page number
function updateURL(pagenum){
    let API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&page='+pagenum+'&' + API_KEY
    return API_URL
}

API_URL = updateURL(1)

receiveMovie(API_URL)

//calls the api

function receiveMovie(url){

    fetch(url).then(response => response.json()).then((data) => {
        displayMovie(data.results)
    })
    
}

//clears display so div would be empty
function clearDisplay(){
    const sub = document.querySelector(".movies-grid")
    sub.innerHTML=""
}

//displays the movie by using a forloop to go through json
function displayMovie(data){

    data.forEach(movie => {
        
        const {original_title,vote_count,poster_path,overview} = movie
        const movieEl= document.createElement("div")
        movieEl.setAttribute("class","movie-card")
        //create a new html file. 
        movieEl.innerHTML += `
                            <img alt="${original_title}" class="movie-poster" src="https://image.tmdb.org/t/p/original/${poster_path}">
                            <div class="movie-info">
                                <p class="vote_average">✨${vote_count}</p>
                                <p class="movie-title">${original_title}</p>
                                
                            </div>
                            
                            <dialogclass="modal" id="modal">
                                <h3>Overview</h3>
                                
                                ${overview}
                               
                            </dialog>
                            
                            
                        `
        let addMovie = document.querySelector(".movies-grid")
        // console.log(addMovie)
        addMovie.appendChild(movieEl)
        
    });
  

}

// search function

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = search.value
    clearDisplay()

    if(searchInput){
        receiveMovie(searchUrl+'&query='+searchInput)

    }else{
        receiveMovie(API_URL)
    }
})
 
//clear the input and return to original
clear.addEventListener('click', (e) => {
    clearDisplay()
    pagenum = 1
    API_URL = updateURL(pagenum)
    receiveMovie(API_URL)
    search.value = ""
})

//when add more is pressed, add more movies
add_more.addEventListener('click', (e) =>{
    pagenum++
    console.log(pagenum)
    API_URL = updateURL(pagenum)

    receiveMovie(API_URL)
})



