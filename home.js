import { games } from './data/games.js';
import {wishlist} from './data/wishlist.js';
function renderHeader(){
  let headerHTML = ``;
  headerHTML += `
    <section class = "header-left-section">
    <a class = "header-logo-link" href = "/">
      <div class = "logo">DAWG</div>
    </a>
    </section>
    <section class = "header-middle-section">
      <input class = "search-bar" type = "text" placeholder = "Search">
    </section>
    <section class = "header-right-section">
      <div class = "custom-label">
        <label for="genre-filter">Genre:</label>
        <select class = "custom-select" id = "genre-filter">
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Indie">Indie</option>
          <option value="Puzzle">Puzzle</option>
          <option value="RPG">RPG</option>
          <option value="Racing">Racing</option>
          <option value="Shooter">Shooter</option>
          <option value="Sports">Sports</option>
          <option value="Strategy">Strategy</option>
        </select>
      </div>
    </section>
  `;
}
function renderLibrary() {

  let libraryHTML = ``;
  games.forEach((game) => {
    libraryHTML += `
      
      <div class = "library-game-container">
        <div class = "library-game-thumbnail-container">
          <img class = "library-game-thumbnail" src = "${game.background_image}">
          <button class = "add-to-wishlist">
            <img class = "plus-icon" src = "icons/plus-icon.svg">
          </button>
        </div>
        <p class = "library-name">${game.name}</p>
      </div>
    `;
  });
}
function renderWishlist(){
  let wishlistHTML = ``;
  wishlist.forEach((game) =>{
    wishlistHTML += `
      <div class = "wishlist-game-container">
        <div class = "ordering-container">
          <span class = "order">1</span>
          <div class = "triangle-buttons">                       
            <button class = "up-button">
              <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5,15.5l-6-7l-6,7H18.5z" fill="white"/>
              </svg>
            </button>
            <button class = "down-button">
              <svg width="190" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5,8.5l6,7l6-7H6.5z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
        <div class = "wishlist-game-thumbnail-container">
          <img class = "wishlist-game-thumbnail" src = "${game.background_image}">
        </div>
        <div class = "wishlist-game-details">
          <p class = "wishlist-name">${game.name}</p>          
          <div class = "game-tags-container">
            <span class = "genre">${game.genres[0]}</span>
            <span class = "tag">${game.tags[0]}</span>
            <span class = "tag">${game.tags[1]}</span>
            <span class = "tag">${game.tags[2]}</span>
            <span class = "tag">${game.tags[3]}</span>
          </div>
          <span class = "date-added">Added On: ${game.date_added}</span>
          <div class = "ratings-container">
            <span class = "rating">Rating: </span>
            <img class = "stars" src = "./ratings/rating-45.png">
            <img class = "esrb-thumbnail" src = "./esrb-ratings/M.svg">
          </div>
          <span class = "released">Release Date: 2013-09-17</span>
        </div>
        <button class="delete-button" aria-label="Delete">
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
}
renderHeader();
renderLibrary();
renderWishlist();