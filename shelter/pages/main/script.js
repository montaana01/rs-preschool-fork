//hamburger menu
const HAMBURGER = document.getElementById("header_hamburger");
const HEADER_CONTAINER = document.getElementById('header_container');
const OVERFLOW = document.getElementById('overflow');
const OVERLAY = document.getElementById("header_overlay");
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
//hamburger end

//get data from json
fetch('./../../assets/pets.json')
    .then(response => response.json())
    .then(data => {
        const PETS = data;
        //if we have pets in json we use functions to create pets cards
        //here some functions
        createCarousel(PETS);
    })
    .catch(error => console.error('Error while getting data from JSON:',error));
// get data from json end

//how many cards we need show on page
function getPetsCount(){
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1280) return 2;
    return 3;
}

const CAROUSEL = document.querySelector('.pets_wrapper');

function generateCards(PETS, currentPets){
    let remainingPets = PETS.filter(PET => !currentPets.includes(PET));
    const MAX_CAROUSEL_COUNT = getPetsCount();

    let newPets = [];
    while (newPets.length < MAX_CAROUSEL_COUNT){
        const RANDOM_INDEX = Math.floor(Math.random() * remainingPets.length)
        newPets.push(remainingPets.splice(RANDOM_INDEX, 1)[0])
    }
    return newPets;
}

function createCarousel(PETS){
    let currentPets = generateCards(PETS,[]);

    function renderCards(PETS){
        CAROUSEL.innerHTML = '';
        PETS.forEach(PET => {
            const CARD = document.createElement("div");
            CARD.classList.add("pets_wrapper-item");
            CARD.innerHTML =`
                <img src="./../../assets/images/carousel/${PET.img}" alt="${PET.name}"/>
                <h4>${PET.name}</h4>
                <button className="border">Learn more</button>
                `;
            CAROUSEL.appendChild(CARD);
        })
    }
    renderCards(currentPets);

    //write slider arrows
    const ARROW_LEFT = document.querySelector("#pets_arrow-left");
    const ARROW_RIGHT = document.querySelector("#pets_arrow_right");

    ARROW_LEFT.addEventListener("click", () =>
    {
        currentPets = generateCards(PETS, currentPets);
        renderCards(currentPets);
    });
    ARROW_RIGHT.addEventListener("click", () => {
        currentPets = generateCards(PETS, currentPets);
        renderCards(currentPets);
    });

    window.addEventListener("resize", () => {
        renderCards(currentPets);
    });
}