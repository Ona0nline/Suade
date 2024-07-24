function myFunction() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function gotocart() {
  // Open the cart.html page in a new tab or window
  window.open("cart.html", "_blank");
}


function instaDirect(){
 window.open("https://instagram.com/_.suade/", "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    let instalinkElem = document.querySelector(".instaButton");
    if (instalinkElem) {
        instalinkElem.addEventListener("click", instaDirect);
    }
});