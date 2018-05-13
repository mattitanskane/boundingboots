const controls = {
    init: function(entity, targets) {
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 65:
                e.preventDefault();
                entity.movingLeft = true;
                break;
            case 68:
                e.preventDefault();
                entity.movingRight = true;
                break;
            case 9:
                e.preventDefault();
                entity.target(targets);
                break;
            case 70:
                e.preventDefault();
                entity.attack();
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
                entity.movingLeft = false;
                break;
            case 68:
                e.preventDefault();
                entity.movingRight = false;
                break;
            default:
                break;
            }
        });

        return this;
    },
    updateState: function(canvas, entity) {
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