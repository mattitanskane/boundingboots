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
        this.attackRange;
        this.weaponRange = this.xPos + this.width * 2.5;
        this.weaponDelay = 2000;
        this.facingRight = true;

        this.name = config.name;
        this.job = config.job;

        this.battleStart = false; // set to true in engage method
        this.currentTarget; // set to true in player's attack function
        this.currentAttacker; // updated in updateEntities
        this.aggro; // updated in updateEntities

        return this;
    },
    update(canvas) {

        const ctx = canvas.getContext('2d');



        if (this.isAlive) {
            ctx.save();
            ctx.translate(this.xPos, canvas.height - this.height - canvas.floor);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }

        if (this.facingRight) {
            this.attackRange = this.xPos + this.width + this.weaponRange;
        } else {
            this.attackRange = this.xPos - this.weaponRange;
        }

        if (this.battleStart) {
            this.followPlayer();
        } else {
            // TODO: needs idle method
            ctx.save();
            ctx.translate(this.xPos, canvas.height - this.height - canvas.floor);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }

        // target marker
        if (this.isTargeted) {
            ctx.save();
            ctx.translate(this.xPos + this.width / 2 - 10, canvas.height - canvas.floor - this.height - 30);
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, 20, 20);
            ctx.restore();
        }
    },
    followPlayer() {
        // start following player if engaged
        if (this.currentAttacker.xPos - 20 >= this.xPos + this.width) {
            this.xPos += this.xVel;
            // crudely face right
            this.facingRight = true;
        }
        if (this.currentAttacker.xPos + this.currentAttacker.width + 20 <= this.xPos) {
            this.xPos -= this.xVel;
            // crudely face left
            this.facingRight = false;
        }
    },
    engage() {
        this.battleStart = true;

        const interval = setInterval(() => {

            if (this.isAlive && this.currentAttacker.isAlive) {
                this.attack();
            } else {
                clearInterval(interval);
                this.disengage();
            }

        }, this.weaponDelay);

        console.log(this.name + ' engaged ' + this.currentAttacker.name);

    },
    disengage() {
        this.battleStart = false;
        console.log(this.name + ' disengaged');
    },
    attack() {

        const _this = this;

        //console.log(_this.name + ' attacks ' + _this.currentAttacker.name);
        //_this.currentAttacker.takeDamage(_this, 1);

        function targetIsVisible() {
            if (_this.facingRight && _this.xPos + _this.width <= _this.currentAttacker.xPos + _this.currentAttacker.width) {
                return true;
            } else if (!_this.facingRight && _this.xPos >= _this.currentAttacker.xPos) {
                return true;
            } else {
                console.log(_this.name + ' cannot see the target');
                return false;
            }
        }
        function targetIsReachable() {
            if (_this.facingRight && _this.attackRange >= _this.currentAttacker.xPos) {
                return true;
            } else if (!_this.facingRight && _this.attackRange <= _this.currentAttacker.xPos + _this.currentAttacker.width) {
                return true;
            } else {
                console.log(_this.name + ' cannot reach the target');
                return false;
            }
        }
        function targetIsAlive() {
            if (_this.currentAttacker.isAlive) {
                return true;
            } else {
                //console.log(attacker.name + ' attacks ' + attacker.currentTarget.name + '\'s corpse');
                return false;
            }
        }
        function rollAccuracy() {
            const roll = Math.floor(Math.random() * 100);
            // TODO: Add accuracy stat
            if (roll <= 70) {
                return true;
            } else {
                console.log(_this.name + ' missed ' + _this.currentAttacker.name);
                return false;
            }
        }
        function rollDamage() {
            const roll = Math.floor(Math.random() * 100);
            const basedmg = 6;
            const modifier = 2;
            let damage;
            // TODO: Add accuracy stat
            if (roll <= 10) {
                console.log('critical hit!');
                damage = basedmg * modifier;
                return damage;
            } else {
                damage = basedmg;
                return damage;
            }
        }

        // attack event
        if (targetIsAlive()) {
            if ( targetIsVisible() && targetIsReachable() ) {
                if (rollAccuracy()) {
                    console.log(_this.name + ' attacks ' + _this.currentAttacker.name);
                    _this.currentAttacker.takeDamage(rollDamage());
                }

                return true;
            } else {
                console.log(_this.name + ' is not attacking');
                return false;
            }
        } else {
            // this never goes here, engage method calls disengage if target is dead
            _this.disengage();
        }
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
        this.disengage();
        console.log(this.name + ' got destroyed');
        this.isAlive = false;
    }
};

module.exports = npc;