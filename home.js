import { games, getGame, loadGamesFetch, getGenres } from './data/games.js';
import {wishlist, addToWishlist, deleteFromWishlist, moveUp, moveDown} from './data/wishlist.js';
function renderHeader(){
  const genres = getGenres();
  let genresHTML = ``;
  const url = new URL (window.location.href);
  let searchValue = url.searchParams.get('search') ?? '';
  let selectedGenre = url.searchParams.get('filter') ?? '';
  
  genres.forEach((genre) => {
    if (genre !== selectedGenre){
      genresHTML += `<option value="${genre}">${genre}</option>`;
    }
    else{
      genresHTML += `<option value="${genre}" selected>${genre}</option>`;
    }
    
  });
  let headerHTML = ``;
  headerHTML += `
    <section class = "header-left-section">
    <a class = "header-logo-link" href = "index.html">
      <div class = "logo">DAWG</div>
    </a>
    </section>
    <section class = "header-middle-section">
      <input class = "search-bar js-search-bar" type = "text" placeholder = "${(searchValue !==  '') ? searchValue : 'Search'}">
    </section>
    <section class = "header-right-section">
      <div class = "custom-label">
        <label for="genre-filter">Genre:</label>
        <select class = "custom-select" id = "genre-filter">
          <option value="Select">Select a Genre</option>
          ${genresHTML}
        </select>
      </div>
    </section>
  `;
  document.querySelector('.js-header').innerHTML = headerHTML;
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) =>{
    if (event.key === 'Enter'){
      searchValue = document.querySelector('.js-search-bar').value.toLowerCase();
      //updatePreferences('search', searchValue);
      window.location.href = `index.html?search=${searchValue}&filter=${selectedGenre}`;
    }
   
  });
  
  const genreFilter = document.getElementById('genre-filter');
  genreFilter.addEventListener('change', () => {
    selectedGenre = genreFilter.value;
    //updatePreferences('genre', selectedGenre);
    if (selectedGenre === 'Select'){
      window.location.href = `index.html?search=${searchValue}&filter=${''}`;
    } else{
      window.location.href = `index.html?search=${searchValue}&filter=${selectedGenre}`;
    }
    
  });
  
}
function renderLibrary() {
  const url = new URL (window.location.href);
  const search = url.searchParams.get('search');
  const filter = url.searchParams.get('filter');
  let filteredGames = games;

  if (search && search !== ''){
    filteredGames = filteredGames.filter((game) =>{
      return game.name.toLowerCase().includes(search) 
        || game.tags.some((keyword) => keyword.toLowerCase().includes(search) 
        || game.genres.some((keyword) => keyword.toLowerCase().includes(search)));
    });
  }
  if (filter && filter !== ''){
    filteredGames = filteredGames.filter((game) =>{
      return game.genres.includes(filter);
    });
  }
  

  let libraryHTML = ``;
  filteredGames.forEach((game) => {
    libraryHTML += `
      
      <div class = "library-game-container">
        <div class = "library-game-thumbnail-container">
          <img class = "library-game-thumbnail" src = "${game.background_image}">
          <button class = "add-to-wishlist js-add-to-wishlist" data-game-id = "${game.id}">
            <img class = "plus-icon js-added-${game.id}" src = "icons/plus-icon.svg">
            <img class = "checkmark-icon js-added-${game.id}" src = "icons/checkmark.svg">
          </button>
        </div>
        <p class = "library-name">${game.name}</p>
      </div>
    `;
  });
  document.querySelector('.js-games-grid').innerHTML = libraryHTML;
  const checkmarkTimeouts = {};
  document.querySelectorAll('.js-add-to-wishlist').forEach((button) =>{
    button.addEventListener('click', () =>{
      const gameId = button.dataset.gameId;

      const checkElements = document.querySelectorAll(`.js-added-${gameId}`);
      checkElements.forEach((element) =>{
        element.classList.add('added-to-wishlist-visible');
      });
      
      const previousTimeoutId = checkmarkTimeouts[gameId];
      if(checkmarkTimeouts){
        clearTimeout(previousTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        checkElements.forEach((element) =>{
          element.classList.remove('added-to-wishlist-visible');
        });
      }, 2000);

      checkmarkTimeouts[gameId] = timeoutId;
      addToWishlist(gameId);
      renderWishlist();
    });
  });
  
}
function renderWishlist(){
  let wishlistHTML = ``;
  wishlist.forEach((game,index) =>{

    const gameId = game.id;
    const matchingGame = getGame(gameId);
    const dateAdded = game.dateAdded;
    if (!matchingGame) {
      return;
    }

    wishlistHTML += `
      <div class = "wishlist-game-container">
        <div class = "ordering-container">
          <span class = "order">${index += 1}</span>
          <div class = "triangle-buttons">                       
            <button class = "up-button js-up-button" data-game-id = "${gameId}">
              <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5,15.5l-6-7l-6,7H18.5z" fill="white"/>
              </svg>
            </button>
            <button class = "down-button js-down-button" data-game-id = "${gameId}">
              <svg width="190" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5,8.5l6,7l6-7H6.5z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
        <div class = "wishlist-game-thumbnail-container">
          <img class = "wishlist-game-thumbnail" src = "${matchingGame.background_image}">
        </div>
        <div class = "wishlist-game-details">
          <p class = "wishlist-name">${matchingGame.name}</p>          
          <div class = "game-tags-container">
            <span class = "genre">${matchingGame.genres[0]}</span>
            <span class = "tag">${matchingGame.tags[0]}</span>
            <span class = "tag">${matchingGame.tags[1]}</span>
            <span class = "tag">${matchingGame.tags[2]}</span>
            <span class = "tag">${matchingGame.tags[3]}</span>
          </div>
          <span class = "date-added">Added On: ${dateAdded}</span>
          <div class = "ratings-container">
            <span class = "rating">Rating: </span>
            <img class = "stars" src = "./ratings/rating-${(Math.round(matchingGame.rating * 2)/2)* 10}.png">
            <img class = "esrb-thumbnail" src = "./esrb-ratings/${matchingGame.esrb_rating ?? 'null'}.svg">
          </div>
          <span class = "released">Release Date: ${matchingGame.released}</span>
        </div>
        <button class="delete-button js-delete-button" data-game-id = "${gameId}" aria-label="Delete">
          <svg class="delete-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    `;
  });
  document.querySelector('.js-wishlist-grid').innerHTML = wishlistHTML;
  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () =>{
      const gameId = button.dataset.gameId
      deleteFromWishlist(gameId);
      renderWishlist();
    });
  });
  document.querySelectorAll('.js-up-button').forEach((button) => {
    button.addEventListener('click', () =>{
      const gameId = button.dataset.gameId;
      moveUp(gameId);
      renderWishlist();
    })
  });
  document.querySelectorAll('.js-down-button').forEach((button) => {
    button.addEventListener('click', () =>{
      const gameId = button.dataset.gameId;
      moveDown(gameId);
      renderWishlist();
    })
  });
}
async function loadPage(){
  try{
    await loadGamesFetch();
  } catch (error){
    console.log(`Unexpected Error: ${error}`);
  }
  renderHeader();
  renderLibrary();
  renderWishlist();
  console.log("i got here!");
}
loadPage();
