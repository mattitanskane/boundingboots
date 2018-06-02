const character = {
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
        this.currentTarget;
        this.currentAttacker;
        this.attackRange;
        this.weaponRange = this.width * 2;
        this.weaponDelay = 1000;
        this.facingRight = true;
        this.inBattle = false;

        this.name = config.name;
        this.job = config.job;

        return this;
    },
    update(canvas) {
        if (this.facingRight) {
            this.attackRange = this.xPos + this.width + this.weaponRange;
        } else {
            this.attackRange = this.xPos - this.weaponRange;
        }
        const ctx = canvas.getContext('2d');

        if (this.isAlive) {
            ctx.save();
            ctx.translate(this.xPos, canvas.height - this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        }

        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.xPos, canvas.height - this.height);
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    },
    target(targets) {
        function removeMarker() {
            targets.forEach(function(enemy) {
                enemy.isTargeted = false;
            });
        }

        // if targetable enemies exist
        if (targets.length > 0) {
            // if no target exists
            if (!this.currentTarget) {
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
    engage(attacker, targets) {

        if (attacker.inBattle) {
            console.log(attacker.name + ' engaged ' + attacker.currentTarget.name);
        } else {
            console.log(attacker.name + ' disengaged ' + attacker.currentTarget.name);
        }

        const interval = setInterval(function() {

            if (attacker.inBattle) {
                attacker.attack(attacker, targets);
            } else {
                clearInterval(interval);
            }

        }, this.weaponDelay);
    },
    attack(attacker, targets) {

        console.log(attacker.currentTarget);
        console.log(targets);

        function targetNext() {
            if (targets.length > 0) {
                console.log('auto-targeting');
                attacker.currentTarget = targets[0];
                attacker.currentTarget.isTargeted = true;
                return true;
            } else {
                console.log('nothing to auto-target');
                attacker.currentTarget = null;
                attacker.inBattle = false;
                return false;
            }
        }

        function targetIsSelected() {
            if (attacker.currentTarget) {
                return true;
            } else {
                console.log('select a target');
                return false;
            }
        }
        function targetIsVisible() {
            if (attacker.facingRight && attacker.xPos + attacker.width <= attacker.currentTarget.xPos + attacker.currentTarget.width) {
                return true;
            } else if (!attacker.facingRight && attacker.xPos >= attacker.currentTarget.xPos) {
                return true;
            } else {
                console.log('cannot see the target');
                return false;
            }
        }
        function targetIsReachable() {
            if (attacker.facingRight && attacker.attackRange >= attacker.currentTarget.xPos) {
                return true;
            } else if (!attacker.facingRight && attacker.attackRange <= attacker.currentTarget.xPos) {
                return true;
            } else {
                console.log('target out of range');
                return false;
            }
        }
        function targetIsAlive() {
            if (attacker.currentTarget.isAlive) {
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
                console.log(attacker.name + ' missed ' + attacker.currentTarget.name);
                return false;
            }
        }
        function rollDamage() {
            const roll = Math.floor(Math.random() * 100);
            const basedmg = 3;
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
            if ( targetIsSelected() && targetIsVisible() && targetIsReachable() ) {

                attacker.currentTarget.currentAttacker = this;
                attacker.currentTarget.engage();

                if (rollAccuracy()) {



                    console.log(attacker.name + ' attacks ' + attacker.currentTarget.name);
                    attacker.currentTarget.takeDamage(attacker, rollDamage());
                }

                return true;
            } else {
                console.log('not attacking');
                return false;
            }
        } else {
            targetNext();
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
        console.log('game over ' + this.name);
        this.isAlive = false;
    }
};

module.exports = character;