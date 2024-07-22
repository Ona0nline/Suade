// Burger menu
document.addEventListener('DOMContentLoaded', function () {
        const menuToggle = document.querySelector('.bmenu');
        const navMenu = document.querySelector('.nav-menu');

        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
        });
    });
  
  function instalink(){
    window.open("https://www.instagram.com/_.suade/", "_blank");
  }
  