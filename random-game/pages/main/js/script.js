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

    RESTART.addEventListener('click', () => {
         startGame();
    });

    document.addEventListener('keydown',(e) =>{
        switch (e.key) {
            case 'ArrowLeft':
                console.log('Move Left')
                break;
            case 'ArrowDown':
                console.log('Move Down')
                break;
            case 'ArrowRight':
                console.log('Move Right')
                break;
            case 'ArrowUp':
                console.log('Move Up')
                break;
            default:
                return console.log('Something wrong with keyboard listener! Write to author of this game!');
        }
    });

    let count = 0;
    let game_array = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    let emptyBlocks = [];


    function refreshEmptyBlocks(){
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (game_array[row][col] === 0) {
                    emptyBlocks.push({ row, col });
                }
            }
        }
    }

    const GAME_BLOCKS = Array.from(GAME_WRAPPER.getElementsByClassName('game_block'));

    function getWrapperElement(row, col) {
        return GAME_BLOCKS[row * 4 + col];
    }

    function addRandomBlock(count){
        if (emptyBlocks.length === 0){
            gameOver();
        }

        for (let i= 0; i < count; i++){
            const element = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];

            let index =  emptyBlocks.indexOf(element);
            emptyBlocks.splice(index, 1);
            game_array[element.row][element.col] = Math.random() > 0.6 ? 4 : 2;
        }

        refreshMarkUp();
    }

    function refreshMarkUp(){
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const BLOCK = getWrapperElement(row, col);
                const VALUE = game_array[row][col];
                BLOCK.textContent = VALUE !== 0 ? VALUE : '';
                BLOCK.className = 'game_block';

                if (VALUE !== 0) {
                    BLOCK.classList.add('active', `c${VALUE}`);
                }
                count += VALUE;
            }
        }
        COUNTER.textContent = count;
    }

    function gameOver(){
        return alert('Game Over!');
    }

    function startGame(){
        refreshEmptyBlocks();
        addRandomBlock(2);
    }

    startGame();
});
