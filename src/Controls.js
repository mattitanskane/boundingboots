const keysDown = {};

const cycleTarget = 9;
const moveLeft = 65;
const moveRight = 68;
const engage = 70;

window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
    console.log(e.keyCode);
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);

const handleInput = function(player) {
    if (keysDown[cycleTarget]) {
        player.target();
    }
    if (keysDown[moveLeft]) {
        console.log('<<<<<');

        player.facingRight = false;
        player.xPos -= player.xVel;
    }
    if (keysDown[moveRight]) {
        console.log('>>>>>');

        player.facingRight = true;
        player.xPos += player.xVel;
    }
    if (keysDown[engage]) {
        player.engage();
    }
};

module.exports = handleInput;