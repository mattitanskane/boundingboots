import character from './Character';
import './index.scss';

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
    case 65:
        player.movingLeft = true;
        break;
    case 68:
        player.movingRight = true;
        break;
    default:
        break;
    }
});
document.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
    case 65:
        player.movingLeft = false;
        break;
    case 68:
        player.movingRight = false;
        break;
    default:
        break;
    }
});

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = '400';
canvas.height = '300';
const player = Object.create(character).init(canvas.width * 0.2, canvas.height * 0.7, 4, 'tomato');


function updatePlayerPos() {
    if (player.movingLeft === true) {
        if (player.xPos === 0) {
            player.xPos = player.xPos;
        } else {
            player.xPos -= 1;
        }
    }
    if (player.movingRight === true) {
        if (player.xPos + player.width === canvas.width) {
            player.xPos = player.xPos;
        } else {
            player.xPos += 1;
        }
    }
}
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
    updatePlayerPos();
    player.drawSelf(ctx);
    displayDebug([player.xPos, player.movingLeft, player.movingRight]);

    window.requestAnimationFrame(updateScreen);
}


initGame();
