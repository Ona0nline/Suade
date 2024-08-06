// Gets Items from
let basket = JSON.parse(localStorage.getItem('itemData')) || [];
let cartContainer = document.getElementById('cart-container');

console.log(basket)

// Generates the cart item
let generateCartItems = ()=>{
    if(basket.length !== 0){
        // Map is an array method that creates a new array based off of the manipulation of the array
        // it's being used on
        return (cartContainer.innerHTML = basket.map((x) =>{
            let {name, price, quantity, img} = x;
            let search = basket.find((y)=>y.name === name) || [];
            console.log(search)
            return `
                <div class="cart-container">
                    <div class="cart-item">
                        <img width="100" src="images/black front.jpg" alt="">
                    
                        <div class="details">
                            <div class="name-price">
                            <h3 id="name">${search.name}</h3>
                        </div>
                    
                        <div class="quant">
                            <div class="price">
                                <h3 id="price">R${search.price}</h3>
                            </div>
                    
                            <div class="buttons">
                                <p id="remove">-</p>
                                <p id="num-items">${search.quantity}</p>
                                <p id="add">+</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            
            `
        }).join(""))
    } else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2> Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBTN">Back to Home</button>
        </a>
        `;
    }
  };
generateCartItems();