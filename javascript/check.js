

let basket = JSON.parse(localStorage.getItem('itemData')) || [];
let totalAmount = 0;
console.log(basket)
for (let i = 0; i < basket.length; i++) {
  let item = basket[i];
  totalAmount += item.quantity * item.price;
}

// Get the names of all items in the basket
let itemNames = basket.map(item => item.name).join(', ');
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

let checkDivelem = document.querySelector("#checkDiv")
checkDivelem.innerHTML = `
<form id="checkForm" class="collapse" action="https://www.payfast.co.za/eng/process" method="post">
          <!-- Merchant details -->
          <input type="hidden" name="merchant_id" value="23375416">
          <input type="hidden" name="merchant_key" value="ntaeougdhd12t">
          <input type="hidden" name="return_url" value="https://your-site.com/return">
          <input type="hidden" name="cancel_url" value="https://your-site.com/cancel">
          <input type="hidden" name="notify_url" value="https://your-site.com/notify">
        
          <!-- Buyer details -->
          <input type="hidden" name="name_first" value="First Name">
          <input type="hidden" name="name_last" value="Last Name">
          <input type="hidden" name="email_address" value="email@example.com">
        
          <!-- Transaction details -->
          <input type="hidden" name="m_payment_id" value="unique_id">
          <input type="hidden" name="amount" value="${totalAmount}">
          <input type="hidden" name="item_name" value="${itemNames}">
        
          <!-- Payment Button -->
          <button type="submit">Pay Now</button>
        </form>
`