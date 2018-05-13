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

        if (targets.length != 0) {
            if (!this.currentTarget) {
                this.currentTarget = targets[0];
            } else {
                let targetIndex = targets.indexOf(this.currentTarget);

                targetIndex++;
                if (targetIndex >= targets.length) {
                    this.currentTarget = targets[0];
                } else {
                    this.currentTarget = targets[targetIndex];
                }
            }
            console.log(this.currentTarget.name);

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