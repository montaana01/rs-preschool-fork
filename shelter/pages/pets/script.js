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
        createPagination(PETS);
    })
    .catch(error => console.error('Error while getting data from JSON:',error));
// get data from json end

//Pagination for pets page
function createPagination(PETS) {
    const PAGINATION_CONTAINER = document.querySelector('.our_friends_wrapper');

    let currentPage = 0;
    let pages = generatePages(PETS);

    function generatePages(PETS) {
        const TOTAL_PAGES = calculateTotalPages();
        let pages = [];
        for (let i = 0; i < TOTAL_PAGES; i++) {
            pages.push(getRandomPets(PETS, 8));
        }
        return pages;
    }

    function calculateTotalPages() {
        if (window.innerWidth >= 1280) return 6;
        if (window.innerWidth >= 768) return 8;
        return 16;
    }

    function getRandomPets(PETS, count) {
        const SHUFFLED_PETS = [...PETS].sort(() => Math.random() - 0.5);
        return SHUFFLED_PETS.slice(0, count);
    }

    function renderPage(pageIndex) {
        PAGINATION_CONTAINER.innerHTML = '';
        pages[pageIndex].forEach(pet => {
            const PET_ELEMENT = createPetCard(pet);
            PAGINATION_CONTAINER.appendChild(PET_ELEMENT);
        });
        updatePaginationButtons();
    }

    function createPetCard(PET) {
        const CARD = document.createElement('div');
        CARD.classList.add('our_friends_wrapper-item');
        CARD.innerHTML = `
            <img src="./../../assets/images/carousel/${PET.img}" alt="${PET.name}">
            <h4>${PET.name}</h4>
            <button class="border" data-name="${PET.name}">Learn more</button>
        `;
        return CARD;
    }

    function updatePaginationButtons() {
        document.querySelector('.our_friends_carousel-item.number span').textContent = currentPage + 1;
        document.querySelector('.our_friends_carousel-item.start').classList.toggle('disabled', currentPage === 0);
        document.querySelector('.our_friends_carousel-item.prev').classList.toggle('disabled', currentPage === 0);
        document.querySelector('.our_friends_carousel-item.end').classList.toggle('disabled', currentPage === pages.length - 1);
        document.querySelector('.our_friends_carousel-item.next').classList.toggle('disabled', currentPage === pages.length - 1);
    }

    document.querySelector('.our_friends_carousel-item.start').addEventListener('click', () => {
        currentPage = 0;
        renderPage(currentPage);
    });

    document.querySelector('.our_friends_carousel-item.prev').addEventListener('click', () => {
        if (currentPage > 0) currentPage--;
        renderPage(currentPage);
    });

    document.querySelector('.our_friends_carousel-item.next').addEventListener('click', () => {
        if (currentPage < pages.length - 1) currentPage++;
        renderPage(currentPage);
    });

    document.querySelector('.our_friends_carousel-item.end').addEventListener('click', () => {
        currentPage = pages.length - 1;
        renderPage(currentPage);
    });

    renderPage(currentPage);

    window.addEventListener('resize', () => {
        const NEW_TOTAL_PAGES = calculateTotalPages();
        if (NEW_TOTAL_PAGES !== pages.length) {
            pages = generatePages(PETS);
            currentPage = Math.min(currentPage, pages.length - 1);
            renderPage(currentPage);
        }
    });
}


