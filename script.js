let symbols = [
    'bitcoin-btc-logo',
    'ethereum-eth-logo',
    'tether-usdt-logo',
    'bnb-bnb-logo',
    'solana-sol-logo',
    'usd-coin-usdc-logo',
    'dogecoin-doge-logo',
    'tron-trx-logo',
    'toncoin-ton-logo',

    'shiba-inu-shib-logo',

    'bitcoin-cash-bch-logo',

    'polygon-matic-logo',
    'uniswap-uni-logo',

    'aave-aave-logo',
    'smooth-love-potion-slp-logo',

];


let pathToImg = 'logos/'
let cards = [];
let flippedCards = [];
let matchedCards = [];

let moves = 0;
let timer;
let timeElapsed = 0;
let isGameStarted = false;

let cardFlipRotationDuration = 500
let cardMismatchAnimDuration = 400
let cardMatchAnimDuration = 550


const gameBoard = document.getElementById('gameBoard');
const movesCounter = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
// const difficultySelect = document.getElementById('difficulty');
// const difficultySelect = document.getElementById('difficulty');
const difficultySelect = document.getElementById('difficultylvl');
const restartButton = document.getElementById('restart');

const gameInfo = document.getElementById('game-info');
const gameContainer = document.getElementById('game-container');

let isWin = false;
let isYandexGameStarted = false;


function initializeGame() {
    yandexLanguages();
    // console.log('init game')
    isGameStarted = false;
    isYandexGameStarted = false;

    isWin = false;

    moves = 0;
    movesCounter.textContent = moves;

    timeElapsed = 0;
    timerDisplay.textContent = formatTime(timeElapsed);

    // const difficultyLevel = difficultySelect.value;
    const difficultyLevel = difficultySelect.dataset.value;

    const numPairs = getNumPairs(difficultyLevel);
    symbols = shuffle(symbols);
    cards = shuffle([...symbols.slice(0, numPairs), ...symbols.slice(0, numPairs)]).map((symbol, index) => {
        return {id: index, symbol, flipped: false, matched: false};
        // return {id: index, symbol, flipped: false, matched: false, htmlDivEL: ''};
    });
    renderBoard();
    flippedCards = [];
    matchedCards = [];
    clearInterval(timer);
    // startTimer();
}

// 3*3

// switch (difficulty) {
//         case 'easy':
//             return 4; // 4 pairs, 8 cards total
//         case 'medium':
//             return 6; // 6 pairs, 12 cards total
//         case 'hard':
//             return 8; // 8 pairs, 16 cards total
//         default:
//             return 4;
//     }
function getNumPairs(difficulty) {
    switch (difficulty) {
        case 'easy':
            // return 4; // 4 pairs, 8 cards total
            return 3; // 4 pairs, 8 cards total
        case 'easyplus':
            // return 4; // 4 pairs, 8 cards total
            return 6; // 4 pairs, 8 cards total
        case 'medium':
            // return 6; // 6 pairs, 12 cards total
            return 8; // 6 pairs, 12 cards total
        case 'hard':
            return 10; // 8 pairs, 16 cards total
        case 'veryhard':
            return 12; // 8 pairs, 16 cards total
        default:
            return 4;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function calcBoardColumns(cardsNum) {
    if (cardsNum == 6) {

        //2X3

        // return 3;

        // if (window.innerHeight < 630) {
        if (window.innerHeight < 560) {
            return 3;
            // return 2;

        } else {
            return 2;

        }

        // return 3
        // return 2
    } else if (cardsNum == 16) {

        //4X4
        return 4;
    } else if (cardsNum == 20) {
        //4X5
        // return 5
        if (window.innerHeight < 487) {
            return 5;

        } else {
            return 4;

        }


    } else if (cardsNum == 24) {
        //4X6

        if (window.innerHeight < 487) {
            return 6;

        } else {
            return 4;

        }


    } else if (cardsNum == 12) {
        // 4X3
        if (window.innerHeight < 487) {
            return 4;

        } else {
            return 3;

        }
    }
}

function renderBoard() {

    gameBoard.innerHTML = '';
    // gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 1fr)`; move...  in another places!!!
    // gameBoard.style.gridTemplateColumns = `repeat(${calcBoardColumns(cards.length)}, 1fr)`;

    resizeForDesktop(cards.length, window.innerHeight, window.innerWidth);

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        let coinImg = pathToImg + card.symbol + '.svg';
        cardElement.classList.add('card');
        cardElement.classList.add('flash');

        setTimeout(() => {
            cardElement.classList.remove('flash');
            // cardElement.classList.add('flip');

        }, 310)

        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back" style="background-image: url('${coinImg}')"></div>
        `;

        card.htmlDivEL = cardElement

        cardElement.addEventListener('click', () => handleCardClick(card.id, cardElement));

        gameBoard.appendChild(cardElement);
    });
}

function handleCardClick(id, cardEl) {
    // initLeftRightConfetti();
    //             frameLeftRightConfetti();
    //             startFire()
    // startFirework();
    // frameFireworksConfetti();

    // initRandomConfetti();
    // frameRandomConfetti();

    if (isWin) {
        return;
    }

    if (!isYandexGameStarted) {
        isYandexGameStarted = true;
        gameplayStarted();
    }


    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }

    if (flippedCards.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (card.flipped || card.matched) return;


    card.flipped = true;
    card.htmlDivEL.classList.add('flip');


    flippedCards.push(card);


    if (flippedCards.length === 2) {
        moves++;
        movesCounter.textContent = moves;
        checkForMatch(cardEl);
    }
}

function checkForMatch(cardEl) {
    const [card1, card2] = flippedCards;
    if (card1.symbol === card2.symbol) {
        card1.matched = true;
        card2.matched = true;
        matchedCards.push(card1, card2);
        flippedCards = [];


        setTimeout(() => {
            window.navigator.vibrate(100);

            applyShakeAnimation(card1.id, card2.id, 'match', cardMatchAnimDuration);

        }, cardFlipRotationDuration);

        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            isGameStarted = false;
            isWin = true;

            setTimeout(() => {
                initLeftRightConfetti();
                frameLeftRightConfetti();

                isYandexGameStarted = false;
                gameplayStopped();

            }, cardMatchAnimDuration + 100);

        }
    } else {
        // setTimeout(() => {
        // applyShakeAnimation(card1.id, card2.id, 'mismatch', cardMismatchAnimDuration);
        // }, cardFlipRotationDuration);


        setTimeout(() => {

            card1.flipped = false;
            card2.flipped = false;

            card1.htmlDivEL.classList.remove('flip')
            card2.htmlDivEL.classList.remove('flip')


            flippedCards = [];

            // }, cardFlipRotationDuration + cardMismatchAnimDuration + 100);
        }, cardFlipRotationDuration + 50);


    }
}

function applyWinAnim() {

    cards.forEach(card => {
        setTimeout(() => {
            card.htmlDivEL.classList.add('win-anim');

        }, 1000);
    });
}

function applyShakeAnimation(id1, id2, type, animationDuration = 0) {
    const card1Element = gameBoard.children[id1];
    const card2Element = gameBoard.children[id2];

    card1Element.classList.add(`shake-${type}`);
    card2Element.classList.add(`shake-${type}`);


    setTimeout(() => {

        card1Element.classList.remove(`shake-${type}`);
        card2Element.classList.remove(`shake-${type}`);

    }, animationDuration);
}

function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = formatTime(timeElapsed);
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// restartButton.addEventListener('click', initializeGame);
restartButton.addEventListener('click', () => {
    if (isYandexGameStarted) {
        gameplayStopped();
    }
    // isYandexGameStarted=false;

    window.navigator.vibrate(35);
    initializeGame();

});

// difficultySelect.addEventListener('change',() => {
//     // gameplayStopped();
//     // isYandexGameStarted=false;
//
//     console.log('chanhed diff')
//     initializeGame();
//
// });


window.addEventListener('resize', () => {
    // gameBoard.style.gridTemplateColumns = `repeat(${calcBoardColumns(cards.length)}, 1fr)`;
    resizeForDesktop(cards.length, window.innerHeight, window.innerWidth)

    // console.log()
    // gameContainer.style.maxWidth = `${window.innerHeight}vh`;

});

function resizeForDesktop(cardsNum, windowInnerHeight, windowInnerWidth) {

    if (cardsNum == 6) {

        //2X3

        // return 3;

        // if (window.innerHeight < 630) {
        // if (window.innerHeight < 560) {
        if ((windowInnerHeight < windowInnerWidth) || (windowInnerHeight < 560)) {
            // if ((windowInnerHeight < windowInnerWidth) ) {
            // return 3;
            setColumnsForGrid(3);

            gameContainer.style.setProperty('max-width', '100vh');
            gameContainer.style.setProperty('width', 'calc(100vw - 36px)');
            // gameContainer.style.width = '100vh';

            gameInfo.style.maxWidth = '100vh';
            // return 2;

        } else {
            setColumnsForGrid(2);

            gameContainer.style.maxWidth = '59vh';
            // gameContainer.style.width = '59vh';
            gameContainer.style.width = '100vw';
            // gameContainer.style.width = 'calc(100vw-36px)';

            gameInfo.style.maxWidth = '59vh';
            // return 2;

        }

        // return 3
        // return 2
    } else if (cardsNum == 12) {
        // setColumnsForGrid();
        // if (window.innerHeight < 487) {
        //     return 4;
        //
        // } else {
        //     return 3;
        //
        // }
        // if (windowInnerHeight < windowInnerWidth || (windowInnerWidth < 327 && windowInnerHeight < 488)) {
        if ((windowInnerHeight < windowInnerWidth) || (windowInnerHeight < 487)) {
            setColumnsForGrid(4);
            // setWidthForGame('90vw');
            // gameContainer.style.maxWidth = '80vw';
            // gameContainer.style.maxWidth = '100vh';
            // gameContainer.style.maxWidth = `"calc(100vh-36px)"`;
            gameContainer.style.setProperty('max-width', '100vh');
            gameContainer.style.setProperty('width', 'calc(100vw - 36px)');
            // gameContainer.style.width = '100vh';

            gameInfo.style.maxWidth = '100vh';


        } else {
            setColumnsForGrid(3);
            // setWidthForGame('55vh');
            gameContainer.style.maxWidth = '59vh';
            // gameContainer.style.width = '59vh';
            gameContainer.style.width = '100vw';
            // gameContainer.style.width = 'calc(100vw-36px)';

            gameInfo.style.maxWidth = '59vh';

            // if (windowInnerWidth < 327 && windowInnerHeight < 488) {
            //     setColumnsForGrid(4);
            // }

            // gameContainer.style.maxWidth = '55vh';


        }
    } else if (cardsNum == 16) {

        // if ((windowInnerHeight < windowInnerWidth) || (windowInnerHeight < 560)) {
        // if ((windowInnerHeight < windowInnerWidth) ) {
        // return 3;
        // setColumnsForGrid(4);
        //
        // gameContainer.style.setProperty('max-width', '100vh');
        // gameContainer.style.setProperty('width', 'calc(100vw - 36px)');
        // // gameContainer.style.width = '100vh';
        //
        // gameInfo.style.maxWidth = '100vh';
        // return 2;

        // } else {
        setColumnsForGrid(4);

        gameContainer.style.maxWidth = '75vh';
        // gameContainer.style.width = '59vh';
        gameContainer.style.width = '100vw';
        // gameContainer.style.width = 'calc(100vw-36px)';

        gameInfo.style.maxWidth = '75vh';
        // return 2;

        // }

        //4X4

    } else if (cardsNum == 20) {
        //4X5
        // return 5
        // if (window.innerHeight < 487) {
        //     return 5;
        //
        // } else {
        //     return 4;
        //
        // }


        if ((windowInnerHeight < windowInnerWidth) || (windowInnerHeight < 487)) {
            setColumnsForGrid(5);
            // setWidthForGame('90vw');
            // gameContainer.style.maxWidth = '80vw';
            // gameContainer.style.maxWidth = '100vh';
            // gameContainer.style.maxWidth = `"calc(100vh-36px)"`;
            gameContainer.style.setProperty('max-width', '100vh');
            gameContainer.style.setProperty('width', 'calc(100vw - 36px)');
            // gameContainer.style.width = '100vh';

            gameInfo.style.maxWidth = '100vh';


        } else {
            setColumnsForGrid(4);
            // setWidthForGame('55vh');
            gameContainer.style.maxWidth = '62vh';
            // gameContainer.style.width = '59vh';
            gameContainer.style.width = '100vw';
            // gameContainer.style.width = 'calc(100vw-36px)';

            gameInfo.style.maxWidth = '62vh';

            // if (windowInnerWidth < 327 && windowInnerHeight < 488) {
            //     setColumnsForGrid(4);
            // }

            // gameContainer.style.maxWidth = '55vh';


        }


    } else if (cardsNum == 24) {
        //4X6

        // if (window.innerHeight < 487) {
        //     return 6;
        //
        // } else {
        //     return 4;
        //
        // }

        if ((windowInnerHeight < windowInnerWidth) || (windowInnerHeight < 487)) {
            setColumnsForGrid(6);
            // setWidthForGame('90vw');
            // gameContainer.style.maxWidth = '80vw';
            // gameContainer.style.maxWidth = '100vh';
            // gameContainer.style.maxWidth = `"calc(100vh-36px)"`;
            gameContainer.style.setProperty('max-width', '100vh');
            gameContainer.style.setProperty('width', 'calc(100vw - 36px)');
            // gameContainer.style.width = '100vh';

            gameInfo.style.maxWidth = '100vh';


        } else {
            setColumnsForGrid(4);
            // setWidthForGame('55vh');
            gameContainer.style.maxWidth = '59vh';
            // gameContainer.style.width = '59vh';
            gameContainer.style.width = '100vw';
            // gameContainer.style.width = 'calc(100vw-36px)';

            gameInfo.style.maxWidth = '59vh';

            // if (windowInnerWidth < 327 && windowInnerHeight < 488) {
            //     setColumnsForGrid(4);
            // }

            // gameContainer.style.maxWidth = '55vh';


        }


    }


}

function setWidthForGame(width) {
    gameContainer.style.maxWidth = `${width}!important`;
}


function setColumnsForGrid(columnsNum) {
    gameBoard.style.gridTemplateColumns = `repeat(${columnsNum}, 1fr)`;

}

document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select-trigger');
    const options = select.querySelector('.custom-options');
    const optionsItems = select.querySelectorAll('.custom-option');

    const diff = trigger.querySelector('span');

    // Set default option
    // const defaultOption = select.querySelector('.custom-option[data-value="default"]');
    const defaultOption = select.querySelector(`.custom-option[data-value="${diff.dataset.value}"]`);
    if (defaultOption) {
        diff.textContent = defaultOption.textContent;
        diff.dataset.value = defaultOption.dataset.value;
        defaultOption.classList.add('selected');
    }

    trigger.addEventListener('click', () => {
        select.classList.toggle('open');
    });

    optionsItems.forEach(option => {
        option.addEventListener('click', () => {
            window.navigator.vibrate(35);
            // window.navigator.vibrate(25);

            optionsItems.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            diff.textContent = option.textContent;
            diff.dataset.value = option.dataset.value;
            select.classList.remove('open');

            if (isYandexGameStarted) {
                gameplayStopped();
            }
            // isYandexGameStarted = false;

            initializeGame();
        });
    });
});


// Close the custom select if clicked outside
window.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });
});

// Function to check the tab's visibility state
function handleVisibilityChange() {
    if (document.hidden) {
        // console.log("Tab is inactive");
        if (isYandexGameStarted) {
            isYandexGameStarted = false;

            gameplayStopped();
        }

        // You can add your logic here when the tab becomes inactive
    } else {
        // console.log("Tab is active");

        if (isGameStarted) {

            isYandexGameStarted = true;
            gameplayStarted();
        }

        // You can add your logic here when the tab becomes active
    }
}

// Add an event listener for visibility change
document.addEventListener("visibilitychange", handleVisibilityChange);


// initializeGame();
