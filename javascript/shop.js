// Function to toggle the display of links
function myFunction() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function instaDirect2(){
 window.open("https://instagram.com/_.suade/", "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    let instaElem = document.querySelector("#instaIcon");
    if (instaElem) {
        instaElem.addEventListener("click", instaDirect2);
    }
});

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

// Calculate the total amount from the basket
document.getElementById("guestCheckoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    totalAmountCheck = basket.reduce((total, item) => total + item.price, 0).toFixed(2); // Ensure two decimal places
    itemNames = basket.map(item => item.name).join(', ');

    let firstName = document.querySelector('input[name="first_name"]').value.trim();
    let lastName = document.querySelector('input[name="last_name"]').value.trim();
    let email = document.querySelector('input[name="email"]').value.trim();
    let uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (!itemNames) {
        alert("Item names are required.");
        return;
    }

    if (!totalAmountCheck || !firstName || !lastName || !email) {
        alert("All fields must be filled out.");
        return;
    }

    let checkFormElem = document.querySelector("#checkDiv");
    checkFormElem.innerHTML = `
    <form autocomplete="on" id="newGuestCheckoutForm" action="https://www.payfast.co.za/eng/process" method="post">
        <input type="hidden" name="merchant_id" value="23375416">
        <input type="hidden" name="merchant_key" value="ntaeougdhd12t">

        <input type="hidden" name="return_url" value="https://your-site.com/return">
        <input type="hidden" name="cancel_url" value="https://your-site.com/cancel">
        <input type="hidden" name="notify_url" value="https://your-site.com/notify">
        
        <input type="hidden" name="name_first" value="${firstName}">
        <input type="hidden" name="name_last" value="${lastName}">
        <input type="hidden" name="email_address" value="${email}">
        <input type="hidden" name="m_payment_id" value="${uniqueId}">
        <input type="hidden" name="amount" value="${totalAmountCheck}">
        <input type="hidden" name="item_name" value="${itemNames}">
        <input type="hidden" name="signature" value="${generateSignature(data)}">

        <div class="checkSubmit d-grid place-items-center">
            <button id="checkSubmit" type="submit" style="border: none;">Pay Now</button>
        </div>
    </form>
    `;

    document.getElementById("newGuestCheckoutForm").submit();
});

function generateSignature(data) {
    const orderedData = Object.keys(data)
        .sort()
        .map(key => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');
    return CryptoJS.MD5(orderedData).toString();
}

// Ensure that the data object matches the fields you need to include in the signature
const data = {
    merchant_id: '23375416',
    merchant_key: 'ntaeougdhd12t',
    amount: '100.00',
    item_name: 'Test Item',
    // Add other fields here as needed
};

// Initialising YOCO SDK 
// const yoco = new YocoSDK({
//   publicKey:pk_test_b688b8898o0JoRP73944;
// })

// An "inline" payment form is a type of payment form that is embedded directly within a webpage, 
// rather than being a separate page or pop-up. This means that customers can enter their payment 
// details (like their credit or debit card information) directly on the page they are already on,
//  without being redirected to another page or window.

// const inline = new yoco.inline({
//   layout: 'field',
//   amountInCents: 1000,
//   currency: ZAR

// })

// inline.mount('#card-frame');

// document.getElementById("#payment-form").addEventListener("click",function(event){
//   event.preventDefault();
  // A payment token is a secure, temporary reference that represents a customer's payment information, 
  // like their credit or debit card details, during a transaction. We are generation one here
  // inline.createToken().then(function(result){
  //   if(result.error){
  //      console.error('Error:', result.error);
  //   }else{
  //     const token = result.token
  //     console.log('Token created:', token);
            // Send token to your server to process payment
//     }
//   }).catch(function (error) {
//         console.error('Error creating token:', error);
//     });


// })