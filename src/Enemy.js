const enemy = {
    init(config, character) {
        this.width = config.width;
        this.height = config.height;
        this.xPos = config.xPos;
        this.yPos = config.yPos;
        this.xVel = config.xVel;
        this.color = config.color;
        this.movingLeft = false;
        this.movingRight = false;

        this.hp = 10;
        this.isAlive = true;
        this.isTargeted = false;
        this.currentTarget;
        this.attackRange = this.xPos + this.width * 2.5;
        this.facingRight = true;

        this.name = character.name;
        this.origin = character.origin;
        this.job = character.job;


        return this;
    },
    update(canvas) {

        const ctx = canvas.getContext('2d');

        if (this.isAlive) {
            ctx.save();
            ctx.translate(this.xPos, canvas.height - this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }

        if (this.isTargeted) {
            ctx.save();
            ctx.translate(this.xPos + this.width / 2 - 5, canvas.height - this.height - 20);
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, 10, 10);
            ctx.restore();
        }

    },
    attack() {
        console.log('ples no kill');
    },
    takeDamage(damage) {
        console.log(this.name + ' took ' + damage + ' damage');
        this.hp -= damage;
        console.log(this.hp + ' hp left');

        if (this.hp <= 0) {
            this.die();
        }
    },
    die() {
        console.log(this.name + ' got destroyed');
        this.isAlive = false;
    }
};

module.exports = enemy;