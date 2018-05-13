import controls from './Controls';
import character from './Character';
import enemy from './Enemy';
import './index.scss';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

canvas.width = '400';
canvas.height = '300';

const playerConfig = {
    width: 40,
    height: 100,
    xPos: canvas.width * 0.2,
    yPos: 0,
    xVel: 4,
    color: 'tomato'
};
const playerCreator = {
    name:'Grey',
    origin: 'Heron',
    job: 'Paladin'
};
const player = Object.create(character).init(playerConfig, playerCreator);

const enemy1Config = {
    width: 50,
    height: 130,
    xPos: canvas.width * 0.7,
    yPos: canvas.height - 130,
    xVel: 3,
    color: 'magenta'
};
const enemy2Config = {
    width: 20,
    height: 60,
    xPos: canvas.width * 0.5,
    yPos: canvas.height - 60,
    xVel: 3,
    color: 'magenta'
};
const enemy1Creator = {
    name:'Shadow Lord',
    origin: 'Dark Knight',
    job: 'Xaracabarbaxbard'
};
const enemy2Creator = {
    name:'Com Bat',
    origin: 'Dark Knight',
    job: 'Xaracabarbaxbard'
};
const enemy1 = Object.create(enemy).init(enemy1Config, enemy1Creator);
const enemy2 = Object.create(enemy).init(enemy2Config, enemy2Creator);
const enemies = [];
enemies.push(enemy1);
enemies.push(enemy2);

const playerControls = Object.create(controls).init(player, enemies);


function displayDebug(dbgArray) {
    ctx.font = '16px sans-serif';
    let i = 18;
    dbgArray.forEach(function(debuggableItem) {
        ctx.fillText(debuggableItem, 5, i);
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
function checkEntities() {
    enemies.forEach(function(enemy) {
        if (!enemy.isAlive) {
            enemies.splice(enemies.indexOf(enemy), 1);
            enemy = {};
        }
    });
    console.log(enemies.length + ' enemies left ');
}

function updateScreen() {
    checkEntities();
    clear();
    playerControls.updateState(canvas, player);
    player.update(canvas);
    enemies.forEach(function(enemy) {
        enemy.update(canvas);
    });
    displayDebug([player.xPos, player.movingLeft, player.movingRight]);

    window.requestAnimationFrame(updateScreen);
}


initGame();
