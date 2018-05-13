const enemy = {
    init: function(config, character) {
        this.width = config.width;
        this.height = config.height;
        this.xPos = config.xPos;
        this.yPos = config.yPos;
        this.xVel = config.xVel;
        this.color = config.color;
        this.movingLeft = false;
        this.movingRight = false;

        this.name = character.name;
        this.origin = character.origin;
        this.job = character.job;

        this.hp = 10;
        this.isAlive = true;

        return this;
    },
    update: function(canvas) {

        const ctx = canvas.getContext('2d');

        if (this.isAlive) {
            ctx.save();
            ctx.translate(this.xPos, canvas.height - this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        } else {
            ctx.save();
            ctx.translate(this.xPos, canvas.height - this.height);
            ctx.fillStyle = 'beige';
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }

    },
    attack: function() {
        console.log('ples no kill');
    },
    takeDamage: function(damage) {
        console.log(this.name + ' took ' + damage + ' damage');
        this.hp -= damage;
        console.log(this.hp + ' hp left');

        if (this.hp <= 0) {
            this.die();
        }
    },
    die: function() {
        console.log(this.name + ' got destroyed');
        this.isAlive = false;
    }
};

module.exports = enemy;