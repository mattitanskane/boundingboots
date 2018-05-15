const character = {
    init(config, character) {
        this.width = config.width;
        this.height = config.height;
        this.xPos = config.xPos;
        this.yPos = config.yPos;
        this.xVel = config.xVel;
        this.color = config.color;
        this.movingLeft = false;
        this.movingRight = false;

        this.currentTarget;
        this.attackRange;
        this.weaponRange = this.width * 2;
        this.facingRight = true;

        this.name = character.name;
        this.origin = character.origin;
        this.job = character.job;

        return this;
    },
    update(canvas) {
        if (this.facingRight) {
            this.attackRange = this.xPos + this.width + this.weaponRange;
        } else {
            this.attackRange = this.xPos - this.weaponRange;
        }
        const ctx = canvas.getContext('2d');

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
    autoTarget() {
        // call this to automatically target next enemy after previous target dies
    },
    attack(attacker, target) {

        function targetIsReachable() {
            if (attacker.facingRight && attacker.attackRange >= target.xPos) {
                return true;
            } else if (!attacker.facingRight && attacker.attackRange <= target.xPos) {
                return true;
            } else {
                return false;
            }
        }
        function targetIsVisible() {
            if (attacker.facingRight && attacker.xPos + attacker.width <= target.xPos + target.width) {
                return true;
            } else if (!attacker.facingRight && attacker.xPos >= target.xPos) {
                return true;
            } else {
                return false;
            }
        }

        if (target) {
            if ( targetIsVisible() ) {
                if ( targetIsReachable() ) {
                    if (target.isAlive) {
                        console.log(attacker.name + ' attacks ' + target.name);
                        target.takeDamage(1);
                    } else {
                        console.log(attacker.name + ' attacks ' + target.name + '\'s corpse');
                    }

                } else {
                    console.log('target out of range');
                }
            } else {
                console.log('cannot see the target');
            }
        } else {
            console.log('select a target');
        }
    }
};

module.exports = character;