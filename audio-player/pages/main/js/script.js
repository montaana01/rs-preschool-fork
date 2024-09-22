// task points
console.log(
    'Вёрстка +10\n' +
    'вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, (прогресса пока нет) отображается название и автор трека +5\n' +
    'в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n' +
    'Кнопка Play/Pause +10\n' +
    'есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5\n' +
    'внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n' +
    'При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n' +
    'При смене аудиотрека меняется изображение - обложка аудиотрека +10\n' +
    'Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n' +
    'Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n' +
    'Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n' +
    'высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо'
);
// task points end

// player controls
const PLAY = document.getElementById('play');
const PAUSE = document.getElementById('pause');
const FORWARD = document.getElementById('forward');
const BACKWARD = document.getElementById('backward');
const PLAYER_MAIN = document.querySelector('.player_item_wrapper_main')
const AUDIO = document.querySelector('audio');
const SINGER = document.querySelector('h2');
const SONG_NAME = document.querySelector('h3');
const COVER_IMAGE = document.querySelector('.player_item_wrapper_image img');

// get tracks from json
let audios = [];
    fetch('./../../assets/audio.json')
    .then(response => response.json())
    .then(data => {
        audios = data;
        getAudio(0);
    });

let currentTrack = 0;
let playerState = "pause";

function getAudio(index) {
    const TRACK = audios[index];
    AUDIO.src = TRACK.audioFile;
    SINGER.textContent = TRACK.artist;
    SONG_NAME.textContent = TRACK.title;
    COVER_IMAGE.src = TRACK.imageFile;
    AUDIO.load();
}

PLAY.addEventListener('click', () => {
    AUDIO.play();
    playerState = "play";
    PLAY.classList.toggle('player_item_none')
    PAUSE.classList.toggle('player_item_none')
});

PAUSE.addEventListener('click', () => {
    AUDIO.pause();
    playerState = "pause";
    PAUSE.classList.toggle('player_item_none')
    PLAY.classList.toggle('player_item_none')
});
FORWARD.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % audios.length;
    getAudio(currentTrack);
    switch(playerState) {
        case "play":
            AUDIO.play();
            break;
    }

});
BACKWARD.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + audios.length) % audios.length;
    getAudio(currentTrack);
    switch(playerState) {
        case "play":
            AUDIO.play();
            break;
    }
});

const BAR = document.createElement('input');
BAR.classList.add('player_item_wrapper_progress_bar')
BAR.type = 'range';
BAR.min = 0;
BAR.max = 100;
BAR.value = 0;

//PLAYER_MAIN.parentNode.insertBefore(BAR, PLAYER_MAIN);
PLAYER_MAIN.appendChild(BAR);

BAR.addEventListener('input', () => {
    AUDIO.currentTime = (BAR.value / 100) * AUDIO.duration;
});

