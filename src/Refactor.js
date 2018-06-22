// helpers

function randomIndexOfArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return randomIndex;
}

//systems

const keysDown = {};
const cycleTarget = 9;
const moveLeft = 65;
const moveRight = 68;
const engageButton = 70;
const escButton = 27;

window.addEventListener('keydown', function (e) {
    e.preventDefault();
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
    e.preventDefault();
    delete keysDown[e.keyCode];
}, false);




/////

const entities = [];
const entity = {
    init() {
        this.id = entities.length + 1;

        this.components = {};

        return this;
    },
    addComponent(component) {
        this.components[component._name] = component;
        return component._name;
    },
    removeComponent(componentName) {
        console.log('I should remove the ' + componentName + ' component');
        return componentName;
    }
};

const components = {};
components.playerControlled = {
    init() {
        this._name = 'playerControlled';
        this.pc = true;

        return this;
    }
};
components.appearance = {
    init(width, height, color) {
        this._name = 'appearance';

        if (!width) {
            const randomWidth = Math.floor(60 + 80 * Math.random());
            this.width = randomWidth;
        } else {
            this.width = width;
        }

        if (!height) {
            const randomHeight = Math.floor(100 + 120 * Math.random());
            this.height = randomHeight;
        } else {
            this.height = height;
        }

        if (!color) {
            const randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.color = randomColor;
        } else {
            this.color = color;
        }

        return this;
    }
};
components.position = {
    init(xPos, yPos, xVel) {
        this._name = 'position';

        const randomXPosition = Math.floor(1280 * Math.random());

        this.xPos = xPos || randomXPosition;
        this.yPos = yPos || 0;
        this.xVel = xVel || 1;
        this.facingRight = true;
        this.movingRight = false;
        this.movingLeft = false;

        return this;
    }
};
components.lore = {
    init(name) {
        this._name = 'lore';

        if (!name) {
            const availableNames = [
                'Shadow Lord',
                'Com Bat',
                'Leaping Lizard',
                'Mattdamon',
                'Thepope',
                'Tenzen'
            ];
            const randomName = availableNames[randomIndexOfArray(availableNames)];
            this.name = randomName;
        } else {
            this.name = name;
        }



        return this;
    }
};
components.status = {
    init() {
        this._name = 'status';
        this.hp = 10;
        this.mp = 0;
        this.exp = 0;
        this.isAlive = true;
        this.isPoisoned = false;

        return this;
    }
};
components.attributes = {
    init() {
        this._name = 'attributes';
        this.str = 3;
        this.dex = 3;
        this.int = 3;
        this.vit = 3;
        this.agi = 3;
        this.mnd = 3;

        return this;
    }
};
components.stats = {
    init() {
        this._name = 'stats';
        this.att = 10;
        this.acc = 10;

        return this;
    }
};
components.combat = {
    init() {
        this._name = 'combat';
        this.inBattle = false;
        this.currentTarget = null;
        this.isTargeted = null;
        this.currentAttacker = null;
        this.weaponRange = 150;
        this.attackRange = this.weaponRange;
        this.weaponDelay = 2000;
        this.battleTransition = false;

        return this;
    }
};
components.idleBehaviour = {
    init() {
        this._name = 'idleBehaviour';
        this.isIdle = true;
        // idleDirection left, right, none
        this.idleDirection = null;
        this.idleAnimationDuration = 1300;
        this.idlePauseDuration = 12300;

        return this;
    }
};


function game(width, height) {
    const gameArea = {};
    gameArea.canvas = document.createElement('canvas');
    gameArea.canvas.width = width;
    gameArea.canvas.height = height;
    gameArea.canvas.floor = 110;
    gameArea.context = gameArea.canvas.getContext('2d');
    document.body.insertBefore(gameArea.canvas, document.body.childNodes[0]);

    gameArea.bgImg = new Image(gameArea.canvas.width, gameArea.canvas.height);
    gameArea.bgImg.src = 'https://i.ytimg.com/vi/HzrhHFxTY8Y/maxresdefault.jpg';
    gameArea.bgXPos = 0;

    const player = Object.create(entity).init();

    const playerControlled = Object.create(components.playerControlled).init();
    const playerAppearance = Object.create(components.appearance).init(90, 200, 'tomato');
    const playerPosition = Object.create(components.position).init(50, 0, 4);
    const playerLore = Object.create(components.lore).init('Aslan');
    const playerStatus = Object.create(components.status).init();
    const playerCombat = Object.create(components.combat).init();

    player.addComponent(playerControlled);
    player.addComponent(playerAppearance);
    player.addComponent(playerPosition);
    player.addComponent(playerLore);
    player.addComponent(playerStatus);
    player.addComponent(playerCombat);

    const NPCs = []; // for targeting

    function spawnEnemy() {
        const enemy = Object.create(entity).init();

        enemy.addComponent( Object.create(components.appearance).init() );
        enemy.addComponent( Object.create(components.position).init() );
        enemy.addComponent( Object.create(components.lore).init() );
        enemy.addComponent( Object.create(components.combat).init() );
        enemy.addComponent( Object.create(components.status).init() );
        enemy.addComponent( Object.create(components.idleBehaviour).init() );

        entities.push(enemy);
        NPCs.push(enemy);
    }
    spawnEnemy();
    setInterval(spawnEnemy, 20000);

    entities.push(player);

    const PCs = []; // for targeting
    PCs.push(player);

    start();


    function start() {
        window.requestAnimationFrame(updateScreen);
    }

    function clear() {
        gameArea.context.fillStyle = '#fff1bc';
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
    }

    function updateFloor() {
        gameArea.context.save();

        gameArea.context.translate(0, gameArea.canvas.height - gameArea.canvas.floor);
        gameArea.context.fillStyle = '#7dc383';
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.floor * 0.5);

        gameArea.context.translate(0, gameArea.canvas.floor * 0.5);
        gameArea.context.fillStyle = '#6a9c78';
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.floor * 0.3);

        gameArea.context.translate(0, gameArea.canvas.floor * 0.3);
        gameArea.context.fillStyle = '#446e5c';
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.floor * 0.2);

        gameArea.context.restore();
    }
    function updateBackground() {
        if (!gameArea.canvas.bg) {
            gameArea.canvas.bg = gameArea.context.createPattern(gameArea.bgImg, 'repeat');
        }
        gameArea.context.save();
        gameArea.context.translate(gameArea.bgXPos, 0);
        gameArea.context.fillStyle = gameArea.canvas.bg;
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        if (gameArea.bgXPos >= 0) {
            // going left
            gameArea.context.fillRect(gameArea.bgXPos - gameArea.canvas.width, 0, gameArea.canvas.width, gameArea.canvas.height);
        } else if (gameArea.bgXPos + gameArea.canvas.width <= gameArea.canvas.width) {
            // going right
            gameArea.context.fillRect(gameArea.bgXPos + gameArea.canvas.width, 0, gameArea.canvas.width, gameArea.canvas.height);
        }
        gameArea.context.restore();
    }

    function disengageEntityFromBattle(entity) {
        console.log(entity.components.lore.name + ' disengaged');
        entity.components.combat.inBattle = false;
    }
    function setNextTargetForEntity(entity) {
        if (NPCs.length > 0) {
            console.log('auto-targeting');
            entity.components.combat.currentTarget = NPCs[0];
            entity.components.combat.currentTarget.components.combat.isTargeted = true;
            return true;
        } else {
            console.log('nothing to auto-target');
            entity.components.combat.currentTarget = null;
            disengageEntityFromBattle();
            return false;
        }
    }

    function entityHasATarget(entity) {
        if (entity.components.combat.currentTarget) {
            return true;
        } else {
            console.log('select a target');
            return false;
        }
    }
    function checkVisibilityOfTarget(target) {
        if (entity.components.position.facingRight && entity.components.position.xPos + entity.components.appearance.width <= target.components.position.xPos + target.components.appearance.width) {
            return true;
        } else if (!entity.components.position.facingRight && entity.components.position.xPos >= target.components.position.xPos) {
            return true;
        } else {
            console.log(entity.components.lore.name + ' cannot see the target');
            return false;
        }
    }
    function checkReachabilityOfTarget(target) {
        if (entity.components.position.facingRight && entity.components.combat.attackRange >= target.components.position.xPos) {
            return true;
        } else if (!entity.components.position.facingRight && entity.components.combat.attackRange <= target.components.position.xPos + target.components.appearance.width) {
            return true;
        } else {
            console.log(entity.components.lore.name + ' cannot reach the target');
            return false;
        }
    }
    function checkAliveStatusOfTarget(target) {
        if (target.components.status.isAlive) {
            return true;
        } else {
            //console.log(attacker.name + ' attacks ' + attacker.currentTarget.name + '\'s corpse');
            return false;
        }
    }
    function rollAccuracyAgainst(target) {
        const roll = Math.floor(Math.random() * 100);
        // TODO: Add accuracy stat
        if (roll <= 70) {
            return true;
        } else {
            console.log(entity.components.lore.name + ' missed ' + target.components.lore.name);
            return false;
        }
    }
    function rollDamageAgainst(target) {

        const roll = Math.floor(Math.random() * 100);
        const basedmg = 3;
        const modifier = 2;
        let damage;
        // TODO: Add accuracy stat
        if (roll <= 10) {
            console.log(target.components.lore.name + ' is struck with a critical hit!');
            damage = basedmg * modifier;
            return damage;
        } else {
            damage = basedmg;
            return damage;
        }
    }
    function engageEntityInBattle(entity) {
        if ( entityHasATarget() && !entity.components.combat.battleTransition) {
            // transition delay, prevents engage/disengage spam
            entity.components.combat.battleTransition = true;
            setTimeout(() => {
                entity.components.combat.battleTransition = false;
            }, 1000);

            entity.components.combat.inBattle = !entity.components.combat.inBattle;
            if (entity.components.combat.inBattle) {
                console.log(entity.components.lore.name + ' engaged ' + entity.components.combat.currentTarget.components.lore.name);

                // attack loop
                const interval = setInterval(function() {

                    if (entity.components.combat.inBattle) {
                        //attack

                        if (checkAliveStatusOfTarget(entity.components.combat.currentTarget)) {
                            if (checkVisibilityOfTarget(entity.components.combat.currentTarget) && checkReachabilityOfTarget(entity.components.combat.currentTarget) ) {

                                entity.components.combat.currentTarget.components.combat.currentAttacker = entity;

                                if (rollAccuracyAgainst(entity.components.combat.currentTarget)) {
                                    console.log(entity.components.lore.name + ' attacks ' + entity.components.combat.currentTarget.components.lore.name);
                                    entity.components.combat.currentTarget.components.status.hp -= rollDamageAgainst(entity.components.combat.currentTarget);
                                }

                                return true;
                            } else {
                                console.log(entity.components.lore.name + ' is not attacking');
                                return false;
                            }
                        } else {
                            setNextTargetForEntity();
                        }
                    } else {
                        clearInterval(interval);
                    }

                }, entity.components.combat.weaponDelay);
            } else {
                disengageEntityFromBattle;
            }
        }
    }
    //movement functions
    function nopeCancelGoBackRevertJustLeave(entity) {
        if (entity.components.combat.currentTarget && !entity.components.combat.inBattle) {
            entity.components.combat.currentTarget.components.combat.isTargeted = false;
            entity.components.combat.currentTarget = null;
            console.log('deselected target');
        } else if (entity.components.combat.inBattle) {
            disengageEntityFromBattle;
        } else {
            console.log('nothing to deselect');
        }
    }
    function moveEntityLeft(entity) {
        entity.components.position.movingLeft = true;
        entity.components.position.facingRight = false;
        entity.components.combat.attackRange = entity.components.position.xPos - entity.components.combat.weaponRange;
        if (entity.components.position.xPos <= 0) {
            // prevent overflow leftside
            entity.components.position.xPos = entity.components.position.xPos;
        } else {
            // parallax bg and move NPCs related to player movement
            if (entity.components.playerControlled) {
                gameArea.bgXPos += entity.components.position.xVel / 1.2;
                NPCs.forEach(NPC => {
                    NPC.components.position.xPos += entity.components.position.xVel / 2;
                });
            }
            entity.components.position.xPos -= entity.components.position.xVel;
        }
    }
    function stopEntityFromMovingLeft(entity) {
        entity.components.position.movingLeft = false;
        entity.components.position.xPos = entity.components.position.xPos;
    }
    function moveEntityRight(entity) {
        entity.components.position.movingRight = true;
        entity.components.position.facingRight = true;
        entity.components.combat.attackRange = entity.components.position.xPos + entity.components.appearance.width + entity.components.combat.weaponRange;
        if (entity.components.position.xPos + entity.components.appearance.width >= gameArea.canvas.width) {
            // prevent overflow rightside
            entity.components.position.xPos = entity.components.position.xPos;
        } else {
            // parallax bg and move NPCs related to player movement
            if (entity.components.playerControlled) {
                gameArea.bgXPos -= entity.components.position.xVel / 1.2;
                NPCs.forEach(NPC => {
                    NPC.components.position.xPos -= entity.components.position.xVel / 2;
                });
            }
            entity.components.position.xPos += entity.components.position.xVel;
        }
    }
    function stopEntityFromMovingRight(entity) {
        entity.components.position.movingRight = false;
        entity.components.position.xPos = entity.components.position.xPos;
    }
    function setTargetForEntity(entity) {
        delete keysDown[cycleTarget];

        // if targetable enemies exist
        if (NPCs.length > 0) {
            // if no target exists
            if (!entity.components.combat.currentTarget) {
                // target the first enemy
                entity.components.combat.currentTarget = NPCs[0];
                NPCs[0].components.combat.isTargeted = true;
            } else {
                // else targetIndex is the index of currentTarget
                let targetIndex = NPCs.indexOf(entity.components.combat.currentTarget);
                // iterate index
                targetIndex++;
                if (targetIndex >= NPCs.length) {
                    //remove marker
                    NPCs.forEach(function(entity) {
                        entity.components.combat.isTargeted = false;
                    });
                    // if enemy at current index is last available target
                    // go back to first enemy
                    entity.components.combat.currentTarget = NPCs[0];
                    NPCs[0].components.combat.isTargeted = true;
                } else {
                    //remove marker
                    NPCs.forEach(function(entity) {
                        entity.components.combat.isTargeted = false;
                    });
                    // else target enemy somewhere in between first and last
                    entity.components.combat.currentTarget = NPCs[targetIndex];
                    NPCs[targetIndex].components.combat.isTargeted = true;
                }
            }
            console.log('targeting ' + entity.components.combat.currentTarget.components.lore.name);
        // no targetable enemies
        } else {
            console.log('no NPCs found');
        }
    }
    function playerInput(entity) {
        // handles all user input, overflow prevention and bg parallax stuff
        // TODO: maybe center camera to player

        // battle system functions
        //

        if (keysDown[cycleTarget]) {
            setTargetForEntity(entity);
        }

        if (keysDown[engageButton]) {
            engageEntityInBattle(entity);
        }

        if (keysDown[escButton]) {
            nopeCancelGoBackRevertJustLeave(entity);
        }

        if (keysDown[moveLeft]) {
            moveEntityLeft(entity);
        } else {
            stopEntityFromMovingLeft(entity);
        }

        if (keysDown[moveRight]) {
            moveEntityRight(entity);
        } else {
            stopEntityFromMovingRight(entity);
        }
    }
    function idleAnimation(entity) {
        // TODO: has some wiggle bugs that might need figuring out once characters have sprites
        if (!entity.components.idleBehaviour.idleDirection) {
            // determine idle movement direction
            let random = Math.random();

            if (random <= 0.40) {
                entity.components.idleBehaviour.idleDirection = 'left';
            } else if (random >= 0.60 ) {
                entity.components.idleBehaviour.idleDirection = 'right';
            } else {
                entity.components.idleBehaviour.idleDirection = 'none';
            }
        }

        // move
        if (entity.components.idleBehaviour.idleDirection === 'left') {
            moveEntityLeft(entity);
        } else if (entity.components.idleBehaviour.idleDirection === 'right') {
            moveEntityRight(entity);
        } else if (entity.components.idleBehaviour.idleDirection === 'none') {
            // dont move
        }

        // timer for how long should move
        setTimeout(() => {
            entity.components.idleBehaviour.isIdle = false;
            if (entity.components.idleBehaviour.idleDirection) {
                entity.components.idleBehaviour.idleDirection = null;
            }
        }, entity.components.idleBehaviour.idleAnimationDuration);

        // timer for how long to wait until next movement
        setTimeout(() => {

            entity.components.idleBehaviour.isIdle = true;
        }, entity.components.idleBehaviour.idlePauseDuration);
    }
    function NPCBehaviour(entity) {
        // handles all user input, overflow prevention and bg parallax stuff
        // TODO: maybe center camera to player

        // battle system functions
        //

        if (entity.components.idleBehaviour.isIdle) {
            idleAnimation(entity);
        }
    }
    function render() {
        updateBackground();
        updateFloor();
        entities.forEach((entity) =>{
            gameArea.context.save();
            gameArea.context.translate(entity.components.position.xPos, gameArea.canvas.height - entity.components.appearance.height - gameArea.canvas.floor);
            gameArea.context.fillStyle = entity.components.appearance.color;
            gameArea.context.fillRect(0, 0, entity.components.appearance.width, entity.components.appearance.height);
            gameArea.context.restore();

            // do stuff for NPCs
            if (!entity.components.playerControlled) {
                if (entity.components.combat.isTargeted) {
                    gameArea.context.save();
                    gameArea.context.translate(entity.components.position.xPos + entity.components.appearance.width / 2 - 10, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height - 30);
                    gameArea.context.fillStyle = 'orange';
                    gameArea.context.fillRect(0, 0, 20, 20);
                    gameArea.context.restore();
                }
                if (entity.components.combat.currentAttacker) {
                    // start following player if engaged
                    if (entity.components.combat.currentAttacker.components.position.xPos - 20 >= entity.components.position.xPos + entity.components.appearance.width) {
                        entity.components.position.xPos += entity.components.position.xVel;
                        // crudely face right
                        entity.components.position.facingRight = true;
                    }
                    if (entity.components.combat.currentAttacker.components.position.xPos + entity.components.combat.currentAttacker.components.appearance.width + 20 <= entity.components.position.xPos) {
                        entity.components.position.xPos -= entity.components.position.xVel;
                        // crudely face left
                        entity.components.position.facingRight = false;
                    }
                }
            }
        });
    }

    function updateScreen() {
        clear();

        PCs.forEach((entity) =>{
            playerInput(entity);
        });
        NPCs.forEach((entity) =>{
            NPCBehaviour(entity);
        });
        render();

        window.requestAnimationFrame(updateScreen);
    }

    return this;
}
game(1280, 720);
