import game from './Game';
import character from './PC';
import controls from './Controls';
import graphics from './Graphics';
import spawner from './NPC-Controller';
import './index.scss';


const newGame = Object.create(game).init(800, 300);
newGame.init();
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

canvas.width = '800';
canvas.height = '300';

const graphicsConfig = {
    canvas,
    xPos: 0,
    yPos: 0
};
const gameGraphics = Object.create(graphics).init(graphicsConfig);

// TODO: needs player input
const playerConfig = {
    width: 40,
    height: 100,
    xPos: canvas.width * 0.2,
    yPos: 0,
    xVel: 1,
    color: 'tomato',
    name: 'Grey',
    job: 'Paladin'
};
const player = Object.create(character).init(playerConfig);
const playerControls = Object.create(controls).init(player);

// spawner needs to know width and height of the playable area in order to spawn stuff correctly
// TODO: does it really need to know though
const npcController = Object.create(spawner).init().spawnNPC(canvas.width, canvas.height);
setInterval(() => npcController.spawnNPC(canvas.width, canvas.height), 20000);



function initGame() {
    window.requestAnimationFrame(updateScreen);

    updateScreen();
}

function clear() {
    ctx.fillStyle = 'beige';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkEntities() {
    gameGraphics.update(canvas);
    player.update(canvas);

    // array of enemies
    npcController.arrayOfNPCs.forEach(function(enemy) {
        // update enemy
        enemy.update(canvas);

        // keep track of existing enemies
        if (!enemy.isAlive) {
            npcController.arrayOfNPCs.splice(npcController.arrayOfNPCs.indexOf(enemy), 1);
            enemy = {};
        }
    });
}

function updateScreen() {
    clear();

    playerControls.updatePositions(canvas, player, npcController.arrayOfNPCs, gameGraphics);
    checkEntities();

    window.requestAnimationFrame(updateScreen);
}

initGame();
