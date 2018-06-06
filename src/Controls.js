const controls = {
    init(game) {
        this.game = game;
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
            case 65:
                e.preventDefault();
                // move left
                game.player.movingLeft = true;
                break;
            case 68:
                e.preventDefault();
                // move right
                game.player.movingRight = true;
                break;
            case 9:
                e.preventDefault();
                // target cycle
                game.player.target(game.npcController.arrayOfNPCs);
                break;
            case 70:
                e.preventDefault();
                // engage / disengage
                game.player.battleStart = !game.player.battleStart;
                if (game.player.battleStart) {
                    game.player.engage(game.player, game.npcController.arrayOfNPCs);
                } else {
                    game.player.disengage();
                }
                break;
            default:
                break;
            }
        });
        document.addEventListener('keyup', function(e) {
            e.preventDefault();
            switch (e.keyCode) {
            case 65:
                e.preventDefault();
                // stop moving left
                game.player.movingLeft = false;
                break;
            case 68:
                e.preventDefault();
                // stop moving right
                game.player.movingRight = false;
                break;
            default:
                break;
            }
        });

        return this;
    },
    menuState() {

    },
    roamState() {

    },
    failState() {
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
            case 65:
                break;
            case 68:
                break;
            case 9:
                break;
            case 70:
                break;
            default:
                break;
            }
        });
        document.addEventListener('keyup', function(e) {
            switch (e.keyCode) {
            case 65:
                break;
            case 68:
                break;
            default:
                break;
            }
        });

        return this;
    },
    updatePositions(game) {
        // character movement, direction and oveflow prevention right
        if (game.player.movingRight) {
            game.player.facingRight = true;
            if (game.player.xPos + game.player.width === game.canvas.width) {
                game.player.xPos = game.player.xPos;
            } else {
                game.bgXPos -= game.player.xVel / 1.2;
                game.player.xPos += game.player.xVel;
                game.npcController.arrayOfNPCs.forEach(enemy => {
                    enemy.xPos -= game.player.xVel / 2;
                });
            }
        }
        // character movement, direction and oveflow prevention left
        if (game.player.movingLeft) {
            game.player.facingRight = false;
            if (game.player.xPos === 0) {
                game.player.xPos = game.player.xPos;
            } else {
                game.bgXPos += game.player.xVel / 1.2;
                game.player.xPos -= game.player.xVel;
                game.npcController.arrayOfNPCs.forEach(enemy => {
                    enemy.xPos += game.player.xVel / 2;
                });
            }
        }
    }
};

module.exports = controls;