function myFunction() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const product = [
  {
    id:0,
    image: 'images/black front',
    title:  'black tee',
    price: 320
  },

  {
    id:1,
    image: 'images/white front.jpg',
    title:  'white tee',
    price: 320
  }

/*   slides[slideIndex-1].style.display = "block"; */
 /*  */
}

/* ----- SHOPPING CART ----- */
let addBlackItem  = document.getElementById('add-item');
let size = document.getElementById('size');
let quantity = document.getElementById('quantity');


// Everytime we select any item its going to store the data inside of the basket
let basket = JSON.parse(localStorage.getItem('itemData')) || [];
let numItems = Number(quantity.value)
console.log(numItems)

let storeItemsData = [
  {
    name: 'SS1 BLACK TEE',
    price: 320.00,
    quantity: numItems,
    img: "images/black front.jpg"
  }
]

// Adds item to cart
addBlackItem.onclick = ()=>{
  storeItemsData[0].quantity = quantity.value

  // Searching for the items bane
  let search = basket.find((x)=> x.id === basket.name);

  // If its not found push the below info to basket and save it
  if(search === undefined){
    basket.push({
      name: 'SS1 BLACK TEE',
      price: 320.00 * storeItemsData[0].quantity,
      quantity: Number(quantity.value),
      img: "images/black front.jpg"
    });
  } else{ // If the item is already in the basket run the code below
    search.quantity += 1
    search.price += storeItemsData.price;
  }
  
  // Save basket info to local storage
  localStorage.setItem('itemData', JSON.stringify(basket));
};

]

