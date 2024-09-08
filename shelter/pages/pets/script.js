//pets hamburger
const HAMBURGER = document.getElementById("pets_hamburger");
const HEADER_CONTAINER = document.getElementById('pets_container');
const OVERFLOW = document.getElementById('pets_overflow');
const OVERLAY = document.getElementById("pets_overlay");
const BODY = document.body;

HAMBURGER.addEventListener("click", toggleMenu);

function toggleMenu() {
    HAMBURGER.classList.toggle("hamburger_active");
    HEADER_CONTAINER.classList.toggle("header_container_active");
    OVERLAY.classList.toggle("header_overlay_active");
    OVERFLOW.classList.toggle("overflow_unset");
    BODY.classList.toggle("fixed");
}
OVERLAY.addEventListener("click", toggleMenu);

//get data from json
fetch('./../../assets/pets.json')
    .then(response => response.json())
    .then(data => {
        const PETS = data;
        //if we have pets in json we use functions to create pets cards
        //here some functions
    })
    .catch(error => console.error('Error while getting data from JSON:',error));
// get data from json end

//how many cards we need show on page
function getPetsCount(){
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1280) return 2;
    return 3;
}