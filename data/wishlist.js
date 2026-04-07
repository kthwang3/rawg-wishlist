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
  for (let i = 0; i < wishlist.length; i++){
    if (wishlist[i].id === Number(gameId)){
      alert('Game Already In Your Wishlist.');
      return;
    }
  }
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
export function moveUp(gameId){
  const idx = wishlist.findIndex(item => item.id === Number(gameId));
  if (idx > 0 && wishlist.length > 1){
    const tmp = wishlist[idx];
    wishlist[idx] = wishlist[idx-1];
    wishlist[idx-1] = tmp;
    saveToStorage();
  }
}
export function moveDown(gameId){
  const idx = wishlist.findIndex(item => item.id === Number(gameId));
  if(idx !== -1 && idx < wishlist.length - 1 && wishlist.length > 1){
    const tmp = wishlist[idx];
    wishlist[idx] = wishlist[idx+1];
    wishlist[idx+1] = tmp; 
    saveToStorage();
  }
}