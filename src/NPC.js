const npc = {
    init(config) {
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
        this.currentAttacker;
        this.weaponRange = this.xPos + this.width * 2.5;
        this.weaponDelay = 2000;
        this.facingRight = true;
        this.inBattle = false;
        this.attacking = false;

        this.name = config.name;
        this.job = config.job;

        return this;
    },
    update(canvas) {

        const ctx = canvas.getContext('2d');

        // start following player if engaged
        if (this.currentAttacker) {
            this.inBattle = true;
            if (this.currentAttacker.xPos - 20 >= this.xPos + this.width) {
                this.xPos += this.xVel;
            }
            if (this.currentAttacker.xPos + this.currentAttacker.width + 20 <= this.xPos) {
                this.xPos -= this.xVel;
            }
        } else {
            this.inBattle = false;
        }

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
    engage() {

        const interval = setInterval(function() {

            this.attack();

            if (this.inBattle) {
                this.attack();
            } else {
                clearInterval(interval);
            }

        }, this.weaponDelay);

        if (this.inBattle) {
            console.log(this.name + ' engaged ' + this.currentAttacker.name);


        } else {
            console.log(this.name + ' disengaged ' + this.currentAttacker.name);
        }



    },
    attack() {
        console.log(this.name + ' attacks ' + this.currentAttacker.name);
        this.currentAttacker.takeDamage(this, 1);


    },
    takeDamage(attacker, damageTaken) {
        this.currentAttacker = attacker;
        console.log(this.name + ' took ' + damageTaken + ' damage');
        this.hp -= damageTaken;
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

module.exports = npc;