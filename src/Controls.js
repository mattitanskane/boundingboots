
const controls = {
    init: function(entity) {
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
            case 65:
                entity.movingLeft = true;
                break;
            case 68:
                entity.movingRight = true;
                break;
            default:
                break;
            }
        });
        document.addEventListener('keyup', function(e) {
            switch (e.keyCode) {
            case 65:
                entity.movingLeft = false;
                break;
            case 68:
                entity.movingRight = false;
                break;
            default:
                break;
            }
        });

        return this;
    },
    updatePos: function(canvas, entity) {
        if (entity.movingLeft === true) {
            if (entity.xPos === 0) {
                entity.xPos = entity.xPos;
            } else {
                entity.xPos -= 1;
            }
        }
        if (entity.movingRight === true) {
            if (entity.xPos + entity.width === canvas.width) {
                entity.xPos = entity.xPos;
            } else {
                entity.xPos += 1;
            }
        }
    }
};

module.exports = controls;