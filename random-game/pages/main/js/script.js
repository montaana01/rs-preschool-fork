console.log('Вёрстка +10\n' +
    'реализован интерфейс игры +5\n' +
    'в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n' +
    'Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10\n' +
    'Реализовано завершение игры при достижении игровой цели +10\n' +
    'По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10\n' +
    'Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10\n' +
    'Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10\n' +
    'Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n' +
    'высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо'
);
// start task
document.addEventListener('DOMContentLoaded', () => {
    const GAME_WRAPPER = document.getElementById('wrapper');
    const RESTART = document.getElementById('restart');
    const COUNTER = document.getElementById('score');
    const SIZE = 4; //size of game section
    const CACHED_SCORE = JSON.parse(localStorage.getItem("high_scores")) || [];

    const MODAL = document.getElementById('modal');
    const CLOSE = document.getElementById('close');
    const MODAL_H2 = MODAL.querySelector('h2');
    const MODAL_H3 = document.getElementById('h3');
    const RESTART_MODAL = document.getElementById('restart_modal');
    const MODAL_HIGH_SCORE = document.getElementById('high_score');
    const MOVES = document.getElementById('count_moves');
    const TIME = document.getElementById('spent_time');
    const MODAL_SCORE = document.getElementById('modal_score');
    const INFO = document.getElementById('info');

    const UP = document.getElementById('up');
    const DOWN = document.getElementById('down');
    const LEFT = document.getElementById('left');
    const RIGHT = document.getElementById('right');

    const POPUP = document.querySelector('.game_popup');

    window.setTimeout(()=>{
        console.log(POPUP);
        POPUP.classList.toggle('active_popup')
    }, 500);
    window.setTimeout(() => {
        POPUP.classList.toggle('active_popup');
    }, 5000);

    document.addEventListener('keydown',(e) =>{
        switch (e.key) {
            case 'ArrowLeft':
                move('Left')
                break;
            case 'ArrowDown':
                move('Down')
                break;
            case 'ArrowRight':
                move('Right');
                break;
            case 'ArrowUp':
                move('Up');
                break;
            default:
                return console.log('Something wrong with keyboard listener! Write to author of this game!');
        }
    });

    let complete = false;
    let isGameComplete = false;
    let moves = 0;
    let score = 0;
    let timer_interval = null;
    let total_seconds = 0;
    let game_array = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let emptyBlocks = [];

    function refreshEmptyBlocks(){
        emptyBlocks = [];
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (game_array[row][col] === 0) {
                    try {
                        emptyBlocks.push({ row, col });
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }

    const GAME_BLOCKS = Array.from(GAME_WRAPPER.getElementsByClassName('game_block'));

    function getWrapperElement(row, col) {
        return GAME_BLOCKS[row * SIZE + col];
    }

    function isNoWays(game_array) {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (row < SIZE - 1 && game_array[row][col] === game_array[row + 1][col]) {
                    return false;
                }
                if (col < SIZE - 1 && game_array[row][col] === game_array[row][col + 1]) {
                    return false;
                }
            }
        }
        return true;
    }

    function addRandomBlock(count) {
        refreshEmptyBlocks();
        if (emptyBlocks.length === 0 && isNoWays(game_array)) {
            gameOver();
        } else if (emptyBlocks.length === 0){
            console.log('We are doesn\'t have any blocks');
        } else{
            for (let i= 0; i < count; i++){
                if (emptyBlocks.length === 0) break;

                const randomIndex = Math.floor(Math.random() * emptyBlocks.length);
                const element = emptyBlocks[randomIndex];

                game_array[element.row][element.col] = Math.random() > 0.6 ? 4 : 2;
                emptyBlocks.splice(randomIndex, 1);
            }
            refreshMarkUp();
        }
    }

    function refreshMarkUp(){
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                const BLOCK = getWrapperElement(row, col);
                const VALUE = game_array[row][col];
                BLOCK.textContent = VALUE !== 0 ? VALUE : '';
                BLOCK.className = 'game_block';

                if (VALUE !== 0) {
                    BLOCK.classList.add('active', `c${VALUE}`);
                }
            }
        }
        COUNTER.textContent = score;
    }


    function columnMove(direction){
        for (let col = 0; col < SIZE; col++) {
            let temp_col = [];
            for (let row = 0; row < SIZE; row++) {
                if (game_array[row][col] !== 0) {
                    temp_col.push(game_array[row][col]);
                }
            }
            let index = 0;

            switch(direction){
                case 'Up':
                    for (let row = 0; row < SIZE; row++) {
                        if (index < temp_col.length) {
                            game_array[row][col] = temp_col[index];
                            index++;
                        } else {
                            game_array[row][col] = 0;
                        }
                    }
                    break;
                case 'Down':
                    for (let row = SIZE - 1; row >= 0; row--) {
                        if (index < temp_col.length) {
                            game_array[row][col] = temp_col[index];
                            index++;
                        } else {
                            game_array[row][col] = 0;
                        }
                    }
                    break;
                default:
                    return 'Unexpected direction:'+ direction;
            }
        }
    }

    function columnSum(direction){
        for (let col = 0; col < SIZE; col++) {
            for (let row = 0; row < SIZE - 1; row++) {
                if (game_array[row][col] === game_array[row + 1][col] && game_array[row][col] !== 0) {
                    if(direction === 'Up'){
                        game_array[row][col] *= 2;
                        score += game_array[row][col];
                        game_array[row + 1][col] = 0;
                        if (game_array[row][col] === 2048 && !isGameComplete){
                            complete = true;
                        }
                    } else if(direction === 'Down'){
                        game_array[row + 1][col] *= 2;
                        score += game_array[row + 1][col];
                        game_array[row][col] = 0;
                        if (game_array[row + 1][col] === 2048 && !isGameComplete){
                            complete = true;
                        }
                    }
                }
            }
        }
        columnMove(direction);
    }
    function rowSum(direction){
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE - 1; col++) {
                if (game_array[row][col] === game_array[row][col + 1] && game_array[row][col] !== 0) {
                    if(direction === 'Left'){
                        game_array[row][col] *= 2;
                        score += game_array[row][col];
                        if (game_array[row][col] === 2048 && !isGameComplete){
                            complete = true;
                        }
                        game_array[row][col + 1] = 0;
                    } else if(direction === 'Right'){
                        game_array[row][col + 1] *= 2;
                        if (game_array[row][col + 1] === 2048 && !isGameComplete) {
                            complete = true
                        }
                        score += game_array[row][col + 1];
                        game_array[row][col] = 0;
                    }
                }
            }
        }
        rowMove(direction);
    }

    function rowMove(direction){
        for (let row = 0; row < SIZE; row++) {
            let temp_row = [];
            for (let col = 0; col < SIZE; col++) {
                if (game_array[row][col] !== 0) {
                    temp_row.push(game_array[row][col]);
                }
            }
            let index = 0;

            switch(direction){
                case 'Right':
                    for (let col = SIZE - 1; col >= 0; col--) {
                        if (index < temp_row.length) {
                            game_array[row][col] = temp_row[index];
                            index++;
                        } else {
                            game_array[row][col] = 0;
                        }
                    }
                    break;
                case 'Left':
                    for (let col = 0; col < SIZE; col++) {
                        if (index < temp_row.length) {
                            game_array[row][col] = temp_row[index];
                            index++;
                        } else {
                            game_array[row][col] = 0;
                        }
                    }
                    break;
                default:
                    return 'Unexpected direction:'+ direction;
            }
        }
    }


    function move(direction){
        const BEFORE = JSON.stringify(game_array);
        let moved = false;

        switch (direction) {
            case 'Up':
                columnMove(direction);
                columnSum(direction);
                refreshEmptyBlocks();
                break;

            case 'Down':
                columnMove(direction);
                columnSum(direction);
                refreshEmptyBlocks();
                break;

            case 'Left':
                rowMove(direction);
                rowSum(direction)
                refreshEmptyBlocks();
                break;

            case 'Right':
                rowMove(direction);
                rowSum(direction)
                refreshEmptyBlocks();
                break;
        }

        const AFTER = JSON.stringify(game_array);
        if (BEFORE !== AFTER) {
            moved = true;
        }

        if (moved) {
            moves++;
            refreshMarkUp();
            setTimeout(function () {
                addRandomBlock(1);
                refreshMarkUp();
                if (isNoWays(game_array) && emptyBlocks.length === 0) {
                    gameOver();
                }
                if (complete && !isGameComplete){
                    stopTimer();
                    showModal('Win');
                    isGameComplete = true;
                }
            }, 300)
        }
    }

    function showModal(situation){
        switch (situation) {
            case 'Win':
                MODAL_H2.innerHTML = 'Well Done! You reach 2048!';
                RESTART_MODAL.textContent = 'CONTINUE';
                break;
            case 'Loose':
                MODAL_H2.innerHTML = 'GAME OVER!';
                RESTART_MODAL.textContent = 'RESTART';
                break;
            case 'Info':
                const MODAL_WRAPPER = document.getElementById('modal_wrapper');

                const TOP_TABLE = document.getElementById("top_table");
                const SCORE_MODAL = document.querySelector('.game_modal_wrapper_high-score')
                const STATS_MODAL = document.querySelector('.game_modal_wrapper_stats')
                MODAL_WRAPPER.removeChild(TOP_TABLE);
                MODAL_WRAPPER.removeChild(SCORE_MODAL);
                MODAL_WRAPPER.removeChild(STATS_MODAL);

                MODAL_H2.innerHTML = 'Rules of 2048 game:';
                MODAL_H3.innerHTML = 'Игрок перемещает плитки с помощью клавиш стрелок на клавиатуре (&#8678; &#8679; &#8680; &#8681;). \n • При каждом ходе все плитки перемещаются в указанном направлении. А также добавляется либо 2 либо 4.\n • Если две плитки с одинаковым числом сталкиваются, они объединяются и их значения складываются.\n • Цель — создать плитку с числом 2048.\n • При поялвении плитки со значением 2048 появляется всплывающее окно, символизирующее победу, также там отображается топ 10 очков и количество ходов.';
                RESTART_MODAL.textContent = 'CONTINUE';
                break;
        }
        MODAL_SCORE.textContent = score;
        MOVES.textContent = moves;
        TIME.textContent = formatTime(total_seconds);
        if (CACHED_SCORE.length > 0) {
            MODAL_HIGH_SCORE.textContent = CACHED_SCORE[0].score;
        } else {
            MODAL_HIGH_SCORE.textContent = score;
        }
        MODAL.style.display = "block";
    }

    function gameOver() {
        stopTimer();
        updateHighScores(score, total_seconds, moves);
        showModal('Loose');
    }

    function startGame(){
        game_array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        score = 0;
        moves = 0;
        complete = false;
        isGameComplete = false;
        startTimer();
        refreshEmptyBlocks();
        refreshMarkUp();
        addRandomBlock(2);
    }

    function startTimer(seconds) {
        clearInterval(timer_interval);
        !seconds ? total_seconds = 0 : total_seconds = seconds;
        timer_interval = setInterval(() => {
            total_seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer_interval);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(total_seconds / 60);
        const seconds = total_seconds % 60;
        TIME.textContent = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    function updateTopTable() {
        const TOP_TABLE = document.querySelector("#top_table tbody");
        TOP_TABLE.innerHTML = '';

        const TOP_SCORES = CACHED_SCORE.slice(0, 10);

        TOP_SCORES.forEach((entry, index) => {
            const ROW = document.createElement('tr');
            const NUMBER_TOP = document.createElement('td');
            const SCORE_TOP = document.createElement('td');
            const DATE_TOP = document.createElement('td');
            const MOVES_TOP = document.createElement('td');

            NUMBER_TOP.textContent = index + 1;
            SCORE_TOP.textContent = entry.score;
            DATE_TOP.textContent = entry.date;
            MOVES_TOP.textContent = entry.moves;

            ROW.appendChild(NUMBER_TOP);
            ROW.appendChild(SCORE_TOP);
            ROW.appendChild(DATE_TOP);
            ROW.appendChild(MOVES_TOP);

            TOP_TABLE.appendChild(ROW);
        });
    }


    function updateHighScores(SCORE, total_seconds, moves) {
        const currentDate = new Date();
        const NEW_SCORE = {
            score: SCORE,
            time: formatTime(total_seconds),
            moves: moves,
            date: currentDate.toLocaleDateString()
        };
        CACHED_SCORE.push(NEW_SCORE);
        CACHED_SCORE.sort((a, b) => b.score - a.score);
        const TOP_SCORES = CACHED_SCORE.slice(0, 10);
        localStorage.setItem("high_scores", JSON.stringify(TOP_SCORES));

        updateTopTable();
    }

    function formatTime(total_seconds) {
        const minutes = Math.floor(total_seconds / 60);
        const seconds = total_seconds % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    RESTART.addEventListener('click', () => {
        startGame();
    });

    CLOSE.addEventListener('click', () => {
        MODAL.style.display = "none";
    });

    RESTART_MODAL.addEventListener('click', () => {
        RESTART_MODAL.disabled = true;

        if (complete) {
            MODAL.style.display = "none";
            startTimer(total_seconds);
        } else {
            MODAL.style.display = "none";
            startGame();
        }

        RESTART_MODAL.disabled = false;
    });

    UP.addEventListener('click', () =>{
        move('Up');
    });
    DOWN.addEventListener('click', () =>{
        move('Down');
    });
    LEFT.addEventListener('click', () =>{
        move('Left');
    });
    RIGHT.addEventListener('click', () =>{
        move('Right');
    });

    INFO.addEventListener('click', () =>{
        showModal('Info');
    })
    window.addEventListener('click', (e) => {
        if (e.target === MODAL) {
            MODAL.style.display = "none";
        }
    });

    startGame();
});
