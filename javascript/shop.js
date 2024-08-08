// Function to toggle the display of links
function myFunction() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Elements for adding items to the cart
// Elements for adding items to the cart
let addBlackItem = document.getElementById('addblack');
let addWhiteItem = document.getElementById('addwhite');
let sizeBlack = document.getElementById('size-black');
let quantityBlack = document.getElementById('quantity-black');
let sizeWhite = document.getElementById('size-white');
let quantityWhite = document.getElementById('quantity-white');

// Retrieve basket from localStorage or initialize an empty basket
let basket = JSON.parse(localStorage.getItem('itemData')) || [];

// Store items data
let storeItemsData = [
  {
    name: 'SS1 BLACK TEE',
    price: 320.00,
    img: "images/black front.jpg"
  },
  {
    name: 'SS1 WHITE TEE',
    price: 320.00,
    img: "images/white front.jpg"
  }
];

// Function to add items to the cart
let addItemToCart = (itemName, size, quantity) => {
  let selectedSize = size.options[size.selectedIndex].value;
  let numItems = Number(quantity.value);
  let item = storeItemsData.find(item => item.name === itemName);

  // Check if the item is found in storeItemsData
  if (!item) {
    console.error(`Item ${itemName} not found in storeItemsData`);
    return;
  }

  // Search for the item in the basket
  let search = basket.find(x => x.name === item.name && x.size === selectedSize);

  // If the item isn't in there, add it in otherwise if it is in there, add on to it
  if (search === undefined) {
    basket.push({
      name: item.name,
      price: item.price * numItems,
      quantity: numItems,
      size: selectedSize.toUpperCase(),
      img: item.img
    });
  } else {
    search.quantity += numItems;
    search.price += item.price * numItems;
  }

  // Save basket info to localStorage
  localStorage.setItem('itemData', JSON.stringify(basket));
  // Update cart display
  generateCartItems();
};

// Event listeners for adding items to the cart
addBlackItem.onclick = () => addItemToCart('SS1 BLACK TEE', sizeBlack, quantityBlack);
addWhiteItem.onclick = () => addItemToCart('SS1 WHITE TEE', sizeWhite, quantityWhite);

// Function to update the cart display
let generateCartItems = () => {
  let cartContainer = document.getElementById('update-cart-container');
  if (basket.length !== 0) {
    cartContainer.innerHTML = basket.map((x, index) => {
      let { name, price, size, quantity, img } = x;
      return `
        <div class="container-fluid update-cart-container mb-3">
          <div class="row p-2">
            <div class="col-12 col-md-4">
              <img src="${img}" class="img-fluid" alt="${name}">
            </div>
            <div class="col-12 col-md-8">
              <p class="h4">${name}</p>
              <p class="h3">R${price}</p>
              <p>Size: ${size}</p>
              <div class="d-flex align-items-center">
                <button data-index="${index}" class="btn btn-danger btn-sm me-2 remove">-</button>
                <p id="num-items" class="mb-0 me-2">${quantity}</p>
                <button data-index="${index}" class="btn btn-success btn-sm add">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Attach event listeners to remove and add buttons
    document.querySelectorAll('.remove').forEach(button => {
      button.addEventListener('click', removeItem);
    });

    document.querySelectorAll('.add').forEach(button => {
      button.addEventListener('click', addItem);
    });
  } else {
    cartContainer.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button id="homeBTN" type="button" class="btn btn-dark">Back to Home</button>
      </a>
    `;
  }
};

// Function to remove an item from the cart
let removeItem = (event) => {
  let index = event.target.dataset.index;
  let item = basket[index];
  item.quantity--;

  if (item.quantity <= 0) {
    basket.splice(index, 1);
  } else {
    item.price -= storeItemsData.find(data => data.name === item.name).price;
  }

  localStorage.setItem('itemData', JSON.stringify(basket));
  generateCartItems();
};

// Function to add more of an item to the cart
let addItem = (event) => {
  let index = event.target.dataset.index;
  let item = basket[index];
  item.quantity++;
  item.price += storeItemsData.find(data => data.name === item.name).price;

  localStorage.setItem('itemData', JSON.stringify(basket));
  generateCartItems();
};

// Clear cart function
let clearCart = () => {
  basket = [];
  localStorage.setItem('itemData', JSON.stringify(basket));
  generateCartItems();
};

// Event listener for clearing the cart
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Initial call to populate cart if there are items
generateCartItems();
