import { getGame } from "./games.js";
export let wishlist = JSON.parse(localStorage.getItem('wishlist'));
if (!wishlist){
  wishlist = [{
    id: 3498,
    dateAdded: "4-1-2026"
  },
  {
    id: 3328,
    dateAdded: "4-1-2026"
  },
  {
    id: 4200,
    dateAdded: "3-21-2026"
  },
  {
    id: 4291,
    dateAdded: "3-31-2026"
  }];
  
}
export function addToWishlist(gameId){
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  wishlist.push({
    id: Number(gameId),
    dateAdded: `${month}-${day}-${year}`
  });
  saveToStorage();
}
export function deleteFromWishlist(gameId){
  let newWishlist = [];
 const id = Number(gameId);
  wishlist.forEach((game) =>{
    if(id !== game.id){
      newWishlist.push(game);
    }
  });
  wishlist = newWishlist;
  saveToStorage();
  
}
function saveToStorage(){
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}