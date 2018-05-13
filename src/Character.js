const character = {
    init: function(config, character) {
        this.width = config.width;
        this.height = config.height;
        this.xPos = config.xPos;
        this.yPos = config.yPos;
        this.xVel = config.xVel;
        this.color = config.color;
        this.movingLeft = false;
        this.movingRight = false;

        this.currentTarget;

        this.name = character.name;
        this.origin = character.origin;
        this.job = character.job;

        return this;
    },
    update: function(canvas) {

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.xPos, canvas.height - this.height);
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    },
    target: function(targets) {

        console.log(targets.length);

        function removeMarker() {
            targets.forEach(function(enemy) {
                enemy.isTargeted = false;
            });
        }

        // if targetable enemies exist
        if (targets.length != 0) {
            // if no target exists
            if (!this.currentTarget) {
                removeMarker();
                // target the first enemy
                this.currentTarget = targets[0];
                targets[0].isTargeted = true;
            } else {
                // else targetIndex is the index of currentTarget
                let targetIndex = targets.indexOf(this.currentTarget);
                // iterate index
                targetIndex++;
                if (targetIndex >= targets.length) {
                    removeMarker();
                    // if enemy at current index is last available target
                    // go back to first enemy
                    this.currentTarget = targets[0];
                    targets[0].isTargeted = true;
                } else {
                    removeMarker();
                    // else target enemy somewhere in between first and last
                    this.currentTarget = targets[targetIndex];
                    targets[targetIndex].isTargeted = true;
                }
            }
            console.log(this.currentTarget.name);
        // no targetable enemies
        } else {
            console.log('no targets found');
        }
    },
    attack: function() {
        if (this.currentTarget) {
            if (this.currentTarget.isAlive) {
                console.log(this.name + ' attacks ' + this.currentTarget.name);
                this.currentTarget.takeDamage(1);
            } else {
                console.log(this.name + ' attacks ' + this.currentTarget.name + '\'s corpse');
            }
        } else {
            console.log('select a target');
        }
    }
};

module.exports = character;