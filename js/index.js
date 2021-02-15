import GemPuzzle from './puzzle'
import msToTime from './timer'
import showModal from './modal'
import '../babel'
import '../styles/styles.css'
import '../styles/less.less'
import '../styles/scss.scss'

let time = 0;
let gameTime;
const tagGame = document.createElement('div');
const infoWindow = document.createElement('div');
const movesInner = document.createElement('div');
const timeInner = document.createElement('div');
const restartBtn = document.createElement('button');

tagGame.id = 'puzzle-wrapper';
infoWindow.id = 'info';
restartBtn.id = 'rest-btn';

document.body.append(tagGame);
document.body.append(infoWindow);
document.body.append(restartBtn);

document.getElementById('info').append(movesInner);
document.getElementById('info').append(timeInner);

movesInner.innerHTML = "Movements: " + 0;
timeInner.innerHTML = "Time: 00:00:00";
restartBtn.innerHTML = "Restart Game";

function showTime() {
    timeInner.innerHTML = "Time: " + msToTime(time);
    time += 1000;
    gameTime = setTimeout(showTime, 1000);
}

let randomPic = Math.floor(Math.random() * Math.floor(40));

let gemPuzzle = new GemPuzzle(
    document.querySelector('#puzzle-wrapper'),
    `img/${randomPic}.jpg`,
    600
);

function restart() {
    gemPuzzle.shuffle();
    movesInner.innerHTML = "Movements: " + 0;
    clearTimeout(gameTime);
    time = 0;
    timeInner.innerHTML = "Time: 00:00:00";
    gemPuzzle.numberOfMovements = 0;
}

restartBtn.addEventListener('click', restart);

gemPuzzle.onSwap = function(movements){
    movesInner.innerHTML = "Movements: " + movements;
    if(movements === 1) {
        showTime();
    }
};

gemPuzzle.onFinished = function() {
    clearTimeout(gameTime);
    showModal(msToTime(time), gemPuzzle.numberOfMovements);
    document.querySelector('.play-again').onclick = () => {
        document.getElementById('modal-wrapper').remove();
        let removable = document.getElementById('puzzle-wrapper');
        removable.removeChild(removable.childNodes[0]);
        let gemPuzzle = new GemPuzzle(
            document.querySelector('#puzzle-wrapper'),
            `img/${Math.floor(Math.random() * Math.floor(40))}.jpg`,
            600
        );
        restart();
        gemPuzzle.onSwap = function(movements){
            movesInner.innerHTML = "Movements: " + movements;
            if(movements === 1) {
                showTime();
            }
            gemPuzzle.onFinished();
        };
        return gemPuzzle;
    }
}