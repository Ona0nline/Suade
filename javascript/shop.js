function myFunction() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function cartDisplay() {
  let cartElem = document.querySelector(".cart-overlay");
  if (cartElem.style.display === "none" || cartElem.style.display === "") {
    cartElem.style.display = "block";
  } else {
    cartElem.style.display = "none";
  }
}
function gotocart() {
  // Open the cart.html page in a new tab or window
  window.open("cart.html", "_blank");
}

// -----------------------------scroll thing black-----------------------------

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/* ----- SHOPPING CART ----- */
let shop = document.getElementById('shop');

const storeItems = [
  {
    id: 'fhgh1',
    name: 'SS1 BLACK TEE',
    price: 320,
    img: "images/black front.jpg"
  },
  {
    id: 'fhgh2',
    name: 'SS2 BLACK SPIDER TEE',
    price: 200,
    img: "images/suade black back.jpg"
  },
  {
    id: 'fhgh3',
    name: 'SS1 &SS2 BLACK TEE',
    price: 450,
    img: "images/black together.jpg"
  },
  {
    id: 'fhgh4',
    name: 'SS4 Bond Shirt',
    price: 100,
    img: "images/black pull jpg.jpg"
  },
];

// Generates the shop
// Instead of  wriring repetetive HTML code for the add to cart section we can write it once in js along with using objects to make our work eaiser
// I'm facing difficulties because of the way you made your shoping cart 
let generateShop = ()=>{
  return (shop.innerHTML = storeItems.map((x)=>{
    let {id,name,price,img} = x;
    return `
  <div class="mySlides fade" id=product-id-${id}>
    <img src="${img}" style="width:100%">

    <h2 class="name">${name}</h2>

    <form id="cart-form">
      <legend>Size</legend>
      <select>
        <option value="">Select a size</option>
        <option value="xs">XS</option>
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
        <option value="xl">XL</option>
      </select>
      
      <br/>

      <div class="quantity">
        <h3 class="price">R ${price}</h3>

        <div class="add-minus">
          <p id="minus">-</p>
          <p id="num-items" id=${id}>0</p>
          <p id="minus">+</p>
        </div>
      </div>

      <div class="cart-action">
        <button>Add to Cart</button><br/>
        <a href="cart.html" target="_blank">View Cart</a>
      </div>
    </form>
  </div>
  `}).join(''))
};

generateShop()
generateShop()
generateShop()
generateShop()