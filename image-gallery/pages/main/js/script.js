// task points
console.log('Требования:\n' +
    'Вёрстка +10\n' +
    'на странице есть несколько фото и строка поиска +5\n' +
    'в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n' +
    'При загрузке приложения на странице отображаются полученные от API изображения +10\n' +
    'Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n' +
    'Поиск +30\n' +
    'при открытии приложения курсор находится в поле ввода +5\n' +
    'есть placeholder +5\n' +
    'автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n' +
    'поисковый запрос можно отправить нажатием клавиши Enter +5\n' +
    'после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n' +
    'в поле ввода есть крестик, при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n' +
    'Очень высокое качество оформления приложения и/или дополнительный, не предусмотренный в задании функционал, улучшающий качество приложения +10\n' +
    'высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо\n');
// task points end

//elements on page
const GALLERY = document.getElementById('gallery');
const SEARCH_INPUT = document.getElementById('search_input');
const SEARCH_BUTTON = document.getElementById('search_button');

//api requests
const API_TOKEN = "xeky0MrK7bebHvYX-09iZZDHoHO8aqaNWY56Bpd4sXY";
const IMAGE_API = "https://api.unsplash.com";
const SEARCH_URL = IMAGE_API + "/search/photos/";
const INITIAL_QUERY = "programming";

let currentPage = 1;
let currentQuery = INITIAL_QUERY;
let totalPages = 1;
let perPageCount = 12;


function fetchImages(query = currentQuery, page = currentPage) {
    const url = SEARCH_URL + '?client_id=' + API_TOKEN + '&query=' + encodeURIComponent(query)+ '&page=' + page + '&per_page=' + perPageCount;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка:' + response.status + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            totalPages = data.total_pages;
            renderImages(data.results);
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            GALLERY.innerHTML = `<h2 class="gallery_wrapper_text">Произошла ошибка при загрузке изображений.</h2>`;
        });
}

function renderImages(images) {
    if (images.length === 0) {
        GALLERY.innerHTML = `<h2 class="gallery_wrapper_text">Нет изображений по вашему запросу.</h2>`;
        return;
    }

    GALLERY.innerHTML = images.map(image => `
        <div class="gallery_wrapper-item">
            <img src="${image.urls.small}" alt="${image.alt_description || 'Image from Unsplash API'}">
        </div>
    `).join('');
}

function handleSearch() {
    const query = SEARCH_INPUT.value.trim();
    currentQuery = query === "" ? INITIAL_QUERY : query;
    currentPage = 1;
    fetchImages();
}

SEARCH_BUTTON.addEventListener('click', handleSearch);

SEARCH_INPUT.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
    }
});
fetchImages();


