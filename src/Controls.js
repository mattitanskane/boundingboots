const controls = {
    init(player, targets) {
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 65:
                e.preventDefault();
                player.movingLeft = true;
                break;
            case 68:
                e.preventDefault();
                player.movingRight = true;
                break;
            case 9:
                e.preventDefault();
                player.target(targets);
                break;
            case 70:
                e.preventDefault();
                player.attack(player, player.currentTarget);
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
                player.movingLeft = false;
                break;
            case 68:
                e.preventDefault();
                player.movingRight = false;
                break;
            default:
                break;
            }
        });

        return this;
    },
    updatePositions(canvas, player, enemies, gameGraphics) {
        // character movement, direction and oveflow prevention right
        if (player.movingRight === true) {
            player.facingRight = true;
            if (player.xPos + player.width === canvas.width) {
                player.xPos = player.xPos;
            } else {
                gameGraphics.xPos -= player.xVel / 1.2;
                player.xPos += player.xVel;
                enemies.forEach(enemy => {
                    enemy.xPos -= player.xVel / 2;
                });
            }
        }
        // character movement, direction and oveflow prevention left
        if (player.movingLeft === true) {
            player.facingRight = false;
            if (player.xPos === 0) {
                player.xPos = player.xPos;
            } else {
                gameGraphics.xPos += player.xVel / 1.2;
                player.xPos -= player.xVel;
                enemies.forEach(enemy => {
                    enemy.xPos += player.xVel / 2;
                });
            }
        }
    }
};

module.exports = controls;