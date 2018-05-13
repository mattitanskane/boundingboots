import controls from './Controls';
import character from './Character';
import './index.scss';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

canvas.width = '400';
canvas.height = '300';

const player = Object.create(character).init(canvas.width * 0.2, canvas.height * 0.7, 4, 'tomato');
const playerControls = Object.create(controls).init(player);

function displayDebug(dbg) {
    ctx.font = '16px sans-serif';
    let i = 18;
    dbg.forEach(function(item) {
        ctx.fillText(item, 5, i);
        i += 18;
    });
}

function initGame() {
    window.requestAnimationFrame(updateScreen);

    updateScreen();
}

function clear() {
    ctx.fillStyle = 'beige';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateScreen() {
    clear();
    playerControls.updatePos(canvas, player);
    player.drawSelf(ctx);
    displayDebug([player.xPos, player.movingLeft, player.movingRight]);

    window.requestAnimationFrame(updateScreen);
}


initGame();
