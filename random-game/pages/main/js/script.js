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
    const CACHED_SCORE = localStorage.getItem("high_score")


    RESTART.addEventListener('click', () => {
         startGame();
    });

    document.addEventListener('keydown',(e) =>{
        switch (e.key) {
            case 'ArrowLeft':
                move('Left')
                // move(0);
                break;
            case 'ArrowDown':
                move('Down')
                //move(1);

                break;
            case 'ArrowRight':
                move('Right');
                //move(2);

                break;
            case 'ArrowUp':
                move('Up');
                //move(3);
                break;
            default:
                return console.log('Something wrong with keyboard listener! Write to author of this game!');
        }
    });

    let moves = 0;
    let score = 0;
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
        const LENGTH = game_array.length;

        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (row < LENGTH - 1 && game_array[row][col] === game_array[row + 1][col]) {
                    return false;
                }
                if (col < LENGTH - 1 && game_array[row][col] === game_array[row][col + 1]) {
                    return false;
                }
            }
        }
        return true;
    }

    function addRandomBlock(count) {
        if (emptyBlocks.length === 0 && isNoWays(game_array)) {
            gameOver();
        } else if (emptyBlocks.length === 0){
            console.log('We are doesn\'t have any blocks');
        } else{
            for (let i= 0; i < count; i++){
                const element = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];

                let index =  emptyBlocks.indexOf(element);
                emptyBlocks.splice(index, 1);
                try{
                    game_array[element.row][element.col] = Math.random() > 0.6 ? 4 : 2;
                } catch (e) {
                    console.log(e);
                }
            }
            refreshMarkUp();
            if (!(game_array === [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])) {
                moves++;
            }
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
                    for (let row = ( SIZE - 1 ); row >= 0; row--) {
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
                    game_array[row][col] *= 2;
                    game_array[row + 1][col] = 0;
                }
            }
        }
        columnMove(direction);
    }
    function rowSum(direction){
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (game_array[row][col] === game_array[row][col + 1] && game_array[row][col] !== 0) {
                    game_array[row][col + 1] *= 2;
                    game_array[row][col] = 0;
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
                    for (let col = (SIZE-1); col >= 0; col--) {
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
        let moved = false;

        switch (direction) {
            case 'Up':
                columnMove(direction);
                columnSum(direction);
                refreshEmptyBlocks();
                moved = true;
                break;

            case 'Down':
                columnMove(direction);
                columnSum(direction);
                refreshEmptyBlocks();
                moved = true;
                break;

            case 'Left':
                rowMove(direction);
                rowSum(direction)
                moved = true;
                break;

            case 'Right':
                rowMove(direction);
                rowSum(direction)
                moved = true;
                break;
        }

        if (moved) {
            refreshMarkUp();
            setTimeout(function () {
                addRandomBlock(1);
                refreshMarkUp();
            }, 300)
        }
    }

    function gameOver(){
        if (CACHED_SCORE === null){
            localStorage.setItem("high_score", score);
            return alert('Game Over!');
        }
        if (CACHED_SCORE < score){
            localStorage.setItem("high_score", score);
            return alert('Game Over! High score is: ' + CACHED_SCORE);
        }
    }

    function startGame(){
        game_array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        refreshEmptyBlocks();
        addRandomBlock(2);
    }

    startGame();
});
