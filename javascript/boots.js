function myFunction() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function instadirect(){
 window.open("https://instagram.com/_.suade/", "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    let instalinkElem = document.querySelector(".instabutton");
    if (instalinkElem) {
        instalinkElem.addEventListener("click", instadirect);
    }
});

function gotocart(){
  window.open("shop.html","_blank");
}

let cartIconElement = document.querySelector("#cart-icon")
cartIconElement.addEventListener("click",gotocart)