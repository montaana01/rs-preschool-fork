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