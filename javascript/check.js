let totalAmount = 0;

// Calculate the total amount from the basket
// Uncomment and use if you need to calculate the total amount dynamically
// for (let i = 0; i < basket.length; i++) {
//   let item = basket[i];
//   totalAmount += item.quantity * item.price;
// }

// Get the names of all items in the basket
// Uncomment and use if you need to dynamically get item names
// let itemNames = basket.map(item => item.name).join(', ');

// Event listener for the form submission
document.getElementById("guestCheckoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capture user input values
    let firstName = document.querySelector('input[name="first_name"]').value;
    let lastName = document.querySelector('input[name="last_name"]').value;
    let email = document.querySelector('input[name="email"]').value;

    // Generate the payment form with updated details
    let checkFormElem = document.getElementById("checkDiv");
    checkFormElem.innerHTML = `
    <form autocomplete="on" id="guestCheckoutForm" action="https://www.payfast.co.za/eng/process" method="post">
        <!-- Merchant details -->
        <input type="hidden" name="merchant_id" value="23375416">
        <input type="hidden" name="merchant_key" value="ntaeougdhd12t">
        <input type="hidden" name="return_url" value="https://your-site.com/return">
        <input type="hidden" name="cancel_url" value="https://your-site.com/cancel">
        <input type="hidden" name="notify_url" value="https://your-site.com/notify">
    
        <!-- Buyer details -->
        <input type="hidden" name="name_first" value="${firstName}">
        <input type="hidden" name="name_last" value="${lastName}">
        <input type="hidden" name="email_address" value="${email}">
    
        <!-- Transaction details -->
        <input type="hidden" name="m_payment_id" value="unique_id">
        <input type="hidden" name="amount" value="${totalAmount.toFixed(2)}">
        <input type="hidden" name="item_name" value="${itemNames}">
    
        <!-- Payment Button -->
        <div class="checkSubmit d-grid place-items-center">
            <button id="checkSubmit" type="submit" style="border: none;">Pay Now</button>
        </div>
    </form>
    `;

    // Submit the new form
    document.getElementById("guestCheckoutForm").submit();
});
