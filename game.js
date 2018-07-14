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
        delete this.components[componentName];
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

        if (!color) {
            const randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.color = randomColor;
        } else {
            this.color = color;
        }

        this.animated = true;
        this.sprite = new Image();
        this.sprite.src = 'assets/bobby.png';
        this.skeleton = {
            lefthand: {
                speed: 0.3,
                direction: 0,
                x: 40,
                xMax: 40,
                xMin: 40,
                y: 65,
                yMax: 65,
                yMin: 65,
                rotation: 0,
                rotationMax: -4,
                rotationMin: 2,
                spriteX: 200,
                spriteY: 0,
                spriteWidth: 108,
                spriteHeight: 150
            },
            leftleg: {
                speed: 0.6,
                direction: 0,
                x: 40,
                xMax: 40,
                xMin: 40,
                y: 165,
                yMax: 165,
                yMin: 165,
                rotation: 0,
                rotationMax: -8,
                rotationMin: 6,
                spriteX: 300,
                spriteY: 0,
                spriteWidth: 75,
                spriteHeight: 140
            },
            head: {
                speed: 0.1,
                direction: 0,
                x: 30,
                xMax: 40,
                xMin: 40,
                y: 0,
                yMax: 2,
                yMin: -1,
                rotation: 0,
                rotationMax: -44,
                rotationMin: 40,
                spriteX: 0,
                spriteY: 0,
                spriteWidth: 60,
                spriteHeight: 80
            },
            torso: {
                speed: 0.2,
                direction: 0,
                x: 0,
                xMax: 0,
                xMin: 0,
                y: 67,
                yMax: 69,
                yMin: 66,
                rotation: 0,
                rotationMax: -44,
                rotationMin: 40,
                spriteX: 60,
                spriteY: 0,
                spriteWidth: 116,
                spriteHeight: 160
            },
            righthand: {
                speed: 0.3,
                direction: 0,
                x: -40,
                xMax: -40,
                xMin: -40,
                y: 65,
                yMax: 65,
                yMin: 65,
                rotation: 0,
                rotationMax: -6,
                rotationMin: 4,
                spriteX: 170,
                spriteY: 0,
                spriteWidth: 70,
                spriteHeight: 150
            },
            rightleg: {
                speed: 0.6,
                direction: 0,
                x: 0,
                xMax: 0,
                xMin: 0,
                y: 165,
                yMax: 165,
                yMin: 165,
                rotation: 0,
                rotationMax: -8,
                rotationMin: 6,
                spriteX: 375,
                spriteY: 0,
                spriteWidth: 75,
                spriteHeight: 140
            }
        };

        if (!width) {
            this.width = this.skeleton.torso.spriteWidth;
        } else {
            this.width = width;
        }

        if (!height) {
            this.height = this.skeleton.torso.spriteHeight + this.skeleton.head.spriteHeight;
        } else {
            this.height = height;
        }


        return this;
    }
};
components.position = {
    init(x, y, velocity) {
        this._name = 'position';

        const randomxition = Math.floor(1280 * Math.random());

        this.x = x || randomxition;
        this.y = y || 0;
        this.velocity = velocity || 1;
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
        this.maxHP = 10;
        this.mp = 0;
        this.exp = 0;
        this.isAlive = true;
        this.isDying = false;
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
        this.weaponRange = 50;
        this.attackRange = this.weaponRange;
        this.weaponDelay = 300 + Math.random() * 2000;
        this.battleTransition = false;
        this.takingDamage = false;
        this.lastDamage = null;
        this.evadingHit = false;

        return this;
    }
};
components.idleBehaviour = {
    init() {
        this._name = 'idleBehaviour';
        this.isIdle = true;
        // idleDirection left, right, none
        this.idleDirection = null;
        this.idleAnimationDuration = Math.random() * 2000;
        this.idlePauseDuration = 2500 + Math.random() * 10000;

        return this;
    }
};
components.inventory = {
    init() {
        this._name = 'inventory';
        this.storage = {};

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
    gameArea.bgImg.src = 'assets/bg.png';
    gameArea.bgx = 0;

    const player = Object.create(entity).init();

    const playerControlled = Object.create(components.playerControlled).init();
    const playerAppearance = Object.create(components.appearance).init(null, 300);
    const playerPosition = Object.create(components.position).init(50, 0, 2.1);
    const playerLore = Object.create(components.lore).init('Bobby');
    const playerStatus = Object.create(components.status).init();
    const playerCombat = Object.create(components.combat).init();
    const playerInventory = Object.create(components.inventory).init();

    player.addComponent(playerControlled);
    player.addComponent(playerAppearance);
    player.addComponent(playerPosition);
    player.addComponent(playerLore);
    player.addComponent(playerStatus);
    player.addComponent(playerCombat);
    player.addComponent(playerInventory);

    const NPCs = []; // for targeting

    function spawnEnemy() {
        const enemy = Object.create(entity).init();

        enemy.addComponent( Object.create(components.appearance).init(null, 300) );
        enemy.addComponent( Object.create(components.position).init() );
        enemy.addComponent( Object.create(components.lore).init() );
        enemy.addComponent( Object.create(components.combat).init() );
        enemy.addComponent( Object.create(components.status).init() );
        enemy.addComponent( Object.create(components.idleBehaviour).init() );

        entities.push(enemy);
        NPCs.push(enemy);
    }
    spawnEnemy();
    const enemySpawnInterval = 180000;

    setInterval(spawnEnemy, enemySpawnInterval);

    entities.push(player);

    const PCs = []; // for targeting
    PCs.push(player);

    const logger = {
        output: [],
        history: [],
        font: '22px Helvetica, Arial, Sans-Serif',
        style: '#fff',
        lineHeight: 24,
        rowsToShow: 8,
        pushToMemory(data) {
            this.history.push(data);
            this.output.push(data);
            if (this.output.length > this.rowsToShow) {
                this.output.splice(0, 1);
            }
        },
        update() {
            gameArea.context.save();
            gameArea.context.translate(10, 5);
            gameArea.context.fillStyle = 'rgba(66,66,66,0.92)';
            gameArea.context.fillRect(0, 0, 450, 200);
            gameArea.context.restore();

            gameArea.context.font = this.font;
            gameArea.context.fillStyle = this.style;
            gameArea.context.textAlign = 'left';
            for (let index = 0; index < this.output.length; index++) {
                gameArea.context.fillText(this.output[index], 20, this.lineHeight * (index + 1));
            }
        }
    };
    start();
    logger.pushToMemory('--- welcome to runescape ---');
    logger.update();

    function start() {
        window.requestAnimationFrame(updateScreen);
    }

    function clear() {
        gameArea.context.fillStyle = '#fff1bc';
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
    }



    function disengageEntityFromBattle(entity) {
        if (!entity.components.combat.battleTransition) {
            logger.pushToMemory(entity.components.lore.name + ' disengaged');
            entity.components.combat.inBattle = false;
            // transition delay, prevents engage/disengage spam
            entity.components.combat.battleTransition = true;
            setTimeout(() => {
                entity.components.combat.battleTransition = false;
            }, 1000);
        }
    }
    function setNextTargetForEntity(entity) {
        if (NPCs.length > 0) {
            logger.pushToMemory('auto-targeting');
            entity.components.combat.currentTarget = NPCs[0];
            entity.components.combat.currentTarget.components.combat.isTargeted = true;
            return true;
        } else {
            logger.pushToMemory('nothing to auto-target');
            entity.components.combat.currentTarget = null;
            disengageEntityFromBattle(entity);
            return false;
        }
    }

    function entityHasATarget(entity) {
        if (entity.components.combat.currentTarget) {
            return true;
        } else {
            logger.pushToMemory('select a target');
            return false;
        }
    }
    function checkEntityTargetVisibility(entity) {
        if (entity.components.position.facingRight && entity.components.position.x + entity.components.appearance.width <= entity.components.combat.currentTarget.components.position.x + entity.components.combat.currentTarget.components.appearance.width) {
            return true;
        } else if (!entity.components.position.facingRight && entity.components.position.x >= entity.components.combat.currentTarget.components.position.x) {
            return true;
        } else {
            logger.pushToMemory(entity.components.lore.name + ' cannot see the target');
            return false;
        }
    }
    function checkIfEntityCanReachTarget(entity) {
        if (entity.components.position.facingRight && entity.components.combat.attackRange >= entity.components.combat.currentTarget.components.position.x) {
            return true;
        } else if (!entity.components.position.facingRight && entity.components.combat.attackRange <= entity.components.combat.currentTarget.components.position.x + entity.components.combat.currentTarget.components.appearance.width) {
            return true;
        } else {
            logger.pushToMemory(entity.components.lore.name + ' cannot reach the target');
            return false;
        }
    }
    function checkEntityTargetAliveStatus(entity) {
        if (entity.components.combat.currentTarget.components.status.isAlive && !entity.components.combat.currentTarget.components.status.isDying) {
            return true;
        } else {
            //logger.pushToMemory(attacker.name + ' attacks ' + attacker.currentTarget.name + '\'s corpse');
            return false;
        }
    }
    function rollEntityAccuracy(entity) {
        const roll = Math.floor(Math.random() * 100);
        // TODO: Add accuracy stat
        if (roll <= 70) {
            return true;
        } else {
            return false;
        }
    }
    function rollEntityDamage(entity) {

        const roll = Math.floor(Math.random() * 100);
        const basedmg = 3;
        const modifier = 2;
        let damage;
        // TODO: Add accuracy stat
        if (roll <= 10) {
            logger.pushToMemory(entity.components.combat.currentTarget.components.lore.name + ' is struck with a critical hit!');
            damage = basedmg * modifier;
            return damage;
        } else {
            damage = basedmg;
            return damage;
        }
    }
    function engageEntityInBattle(entity) {
        if ( entityHasATarget(entity) && !entity.components.combat.battleTransition) {
            entity.components.combat.inBattle = true;
            // transition delay, prevents engage/disengage spam
            entity.components.combat.battleTransition = true;
            setTimeout(() => {
                entity.components.combat.battleTransition = false;
            }, 1000);

            if (entity.components.combat.inBattle) {
                logger.pushToMemory(entity.components.lore.name + ' engaged ' + entity.components.combat.currentTarget.components.lore.name);

                // attack loop
                const interval = setInterval(function() {

                    // stop loop if battle status changes

                    // TODO: this is shit but isAlive makes sure the dead dont attack
                    if (entity.components.combat.inBattle && entity.components.status.isAlive) {
                        entityAttacks(entity);
                    } else {
                        clearInterval(interval);
                    }

                }, entity.components.combat.weaponDelay);
            } else {
                disengageEntityFromBattle(entity);
            }
        }
    }
    function entityAttacks(entity) {
        if (checkEntityTargetAliveStatus(entity)) {
            if (checkEntityTargetVisibility(entity) && checkIfEntityCanReachTarget(entity) ) {
                if (rollEntityAccuracy(entity)) {
                    // hit and damage

                    logger.pushToMemory(entity.components.lore.name + ' attacks ' + entity.components.combat.currentTarget.components.lore.name);

                    let damageTaken = rollEntityDamage(entity);

                    entity.components.combat.currentTarget.components.status.hp -= damageTaken;
                    entity.components.combat.currentTarget.components.combat.takingDamage = true;
                    entity.components.combat.currentTarget.components.combat.lastDamage = damageTaken;
                    setTimeout(() => {
                        entity.components.combat.currentTarget.components.combat.takingDamage = false;
                        entity.components.combat.currentTarget.components.combat.lastDamage = null;
                    }, 650);


                    logger.pushToMemory(entity.components.combat.currentTarget.components.lore.name + ' hp at ' + entity.components.combat.currentTarget.components.status.hp);

                    if (entity.components.combat.currentTarget.components.status.hp > 0) {
                        // do damage suff if target is alive

                        if (!entity.components.combat.currentTarget.components.combat.inBattle) {
                            // set current entity as the attacker for the attacked
                            entity.components.combat.currentTarget.components.combat.currentAttacker = entity;
                            // set current entity as the target for the attacked
                            entity.components.combat.currentTarget.components.combat.currentTarget = entity;



                            // stuff for NPC targets
                            if (!entity.components.combat.currentTarget.components.playerControlled) {
                                // interrupt attacked entity's idle behaviour
                                if (entity.components.combat.currentTarget.components.idleBehaviour) {
                                    entity.components.combat.currentTarget.components.idleBehaviour.isIdle = false;
                                }

                                // set attacked entity battle status to stop idle behaviour etc
                                // counter attack
                                engageEntityInBattle(entity.components.combat.currentTarget);
                            }

                        }
                    } else {
                        // do dying stuff on target if ded
                        logger.pushToMemory(entity.components.combat.currentTarget.components.lore.name + ' ko\'d');
                        if (entity.components.combat.currentTarget.components.lore.name === 'Leaping Lizard') {
                            // TODO: entity drops items and treasure
                            let dropRate = 0.02;
                            let rng = Math.random();
                            if (rng <= dropRate) {
                                logger.pushToMemory('You find a pair of leaping boots on ' + entity.components.combat.currentTarget.components.lore.name);
                                const leapingboots = {_name:'Leaping Boots'};
                                entity.components.inventory.storage[leapingboots._name] = leapingboots;
                            }
                        }

                        entity.components.combat.currentTarget.components.status.isDying = true;
                        setTimeout(() => {
                            entity.components.combat.currentTarget.components.status.isDying = false;
                            entity.components.combat.currentTarget.components.status.isAlive = false;
                            NPCs.splice(NPCs.indexOf(entity.components.combat.currentTarget), 1);
                            entities.splice(entities.indexOf(entity.components.combat.currentTarget), 1);
                            if (entity.components.combat.currentTarget.components.playerControlled) {
                                entity.components.combat.currentTarget.removeComponent('playerControlled');
                            }
                        }, 650);
                    }

                } else {
                    // miss and evade
                    logger.pushToMemory(entity.components.lore.name + ' missed ' + entity.components.combat.currentTarget.components.lore.name);

                    entity.components.combat.currentTarget.components.combat.evadingHit = true;
                    setTimeout(() => {
                        entity.components.combat.currentTarget.components.combat.evadingHit = false;
                    }, 650);
                }

                return true;
            } else {
                logger.pushToMemory(entity.components.lore.name + ' is not attacking');
                return false;
            }
        } else {
            if (entity.components.playerControlled) {
                setNextTargetForEntity(entity);
            } else {
                entity.components.combat.isTargeted = false;
                disengageEntityFromBattle(entity);
            }
        }
    }
    //movement functions
    function nopeCancelGoBackRevertJustLeave(entity) {
        if (entity.components.combat.currentTarget && !entity.components.combat.inBattle) {
            entity.components.combat.currentTarget.components.combat.isTargeted = false;
            entity.components.combat.currentTarget = null;
            logger.pushToMemory('deselected target');
        } else if (entity.components.combat.inBattle) {
            disengageEntityFromBattle(entity);
        } else {
            logger.pushToMemory('nothing to deselect');
        }
    }
    function updateToFaceCurrentTarget(entity) {
        if (entity.components.combat.currentTarget) {
            if (entity.components.combat.currentTarget.components.position.x <= entity.components.position.x) {
                entity.components.position.facingRight = false;
            } else {
                entity.components.position.facingRight = true;
            }
        }
    }
    function updateEntityAttackRange(entity) {
        if (entity.components.position.facingRight) {
            entity.components.combat.attackRange = entity.components.position.x + entity.components.appearance.width + entity.components.combat.weaponRange;
        } else {
            entity.components.combat.attackRange = entity.components.position.x - entity.components.combat.weaponRange;
        }
    }
    function moveEntityLeft(entity) {
        entity.components.position.movingLeft = true;
        entity.components.position.facingRight = false;

        //NPC
        if (!entity.components.playerControlled) {
            entity.components.position.x -= entity.components.position.velocity;
        }
        //PC
        if (entity.components.playerControlled) {
            if (entity.components.position.x <= 0) {
                // prevent overflow leftside
                entity.components.position.x = entity.components.position.x;
            } else {
                // parallax bg and move NPCs related to player movement
                gameArea.bgx += entity.components.position.velocity / 1.2;
                NPCs.forEach(NPC => {
                    NPC.components.position.x += entity.components.position.velocity / 2;
                });
                entity.components.position.x -= entity.components.position.velocity;
            }
        }
    }
    function stopEntityFromMovingLeft(entity) {
        entity.components.position.movingLeft = false;
        entity.components.position.x = entity.components.position.x;
    }
    function moveEntityRight(entity) {
        entity.components.position.movingRight = true;
        entity.components.position.facingRight = true;

        //NPC
        if (!entity.components.playerControlled) {
            entity.components.position.x += entity.components.position.velocity;
        }
        //PC
        if (entity.components.playerControlled) {
            if (entity.components.position.x + entity.components.appearance.width >= gameArea.canvas.width) {
                // prevent overflow rightside
                entity.components.position.x = entity.components.position.x;
            } else {
                // parallax bg and move NPCs related to player movement
                gameArea.bgx -= entity.components.position.velocity / 1.2;
                NPCs.forEach(NPC => {
                    NPC.components.position.x -= entity.components.position.velocity / 2;
                });
                entity.components.position.x += entity.components.position.velocity;
            }
        }
    }
    function stopEntityFromMovingRight(entity) {
        entity.components.position.movingRight = false;
        entity.components.position.x = entity.components.position.x;
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
                    //remove target marker
                    NPCs.forEach(function(entity) {
                        entity.components.combat.isTargeted = false;
                    });
                    // if enemy at current index is last available target
                    // go back to first enemy
                    entity.components.combat.currentTarget = NPCs[0];
                    NPCs[0].components.combat.isTargeted = true;
                } else {
                    //remove target marker
                    NPCs.forEach(function(entity) {
                        entity.components.combat.isTargeted = false;
                    });
                    // else target enemy somewhere in between first and last
                    entity.components.combat.currentTarget = NPCs[targetIndex];
                    NPCs[targetIndex].components.combat.isTargeted = true;
                }
            }

            logger.pushToMemory('targeting ' + entity.components.combat.currentTarget.components.lore.name);
        // no targetable enemies
        } else {
            logger.pushToMemory('no NPCs found');
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
            if (!entity.components.combat.inBattle) {
                engageEntityInBattle(entity);
            } else {
                disengageEntityFromBattle(entity);
            }
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
        }

        // timer for how long should move
        setTimeout(() => {
            entity.components.idleBehaviour.isIdle = false;
            if (entity.components.idleBehaviour.idleDirection) {
                entity.components.idleBehaviour.idleDirection = null;
                stopEntityFromMovingLeft(entity);
                stopEntityFromMovingRight(entity);
            }
        }, entity.components.idleBehaviour.idleAnimationDuration);

        // timer for how long to wait until next movement
        setTimeout(() => {
            // if battle has started while waiting stop the idle loop
            if (!entity.components.combat.inBattle) {
                entity.components.idleBehaviour.isIdle = true;
            }
        }, entity.components.idleBehaviour.idlePauseDuration);
    }
    function NPCBehaviour(entity) {
        // handles all user input, overflow prevention and bg parallax stuff
        // TODO: maybe center camera to player

        // battle system functions
        //
        if (entity.components.combat.currentAttacker) {
            // start following player if engaged
            if (entity.components.combat.currentAttacker.components.position.x - entity.components.combat.weaponRange >= entity.components.position.x + entity.components.appearance.width) {
                entity.components.position.x += entity.components.position.velocity;
                // crudely face right
                entity.components.position.facingRight = true;
            } else if (entity.components.combat.currentAttacker.components.position.x + entity.components.combat.currentAttacker.components.appearance.width + entity.components.combat.weaponRange <= entity.components.position.x) {
                entity.components.position.x -= entity.components.position.velocity;
                // crudely face left
                entity.components.position.facingRight = false;
            }
        }

        if (entity.components.idleBehaviour.isIdle) {
            idleAnimation(entity);
        }
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
        gameArea.context.translate(gameArea.bgx, 0);
        gameArea.context.fillStyle = gameArea.canvas.bg;
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        if (gameArea.bgx >= 0) {
            // going left
            gameArea.context.fillRect(gameArea.bgx - gameArea.canvas.width, 0, gameArea.canvas.width, gameArea.canvas.height);
        } else if (gameArea.bgx + gameArea.canvas.width <= gameArea.canvas.width) {
            // going right
            gameArea.context.fillRect(gameArea.bgx + gameArea.canvas.width, 0, gameArea.canvas.width, gameArea.canvas.height);
        }
        gameArea.context.restore();
    }
    function animateWalk(entity) {

        // left hand
        // direction 0 === idle
        if (entity.components.appearance.skeleton.lefthand.direction === 0) {
            entity.components.appearance.skeleton.lefthand.direction = 1;
        }
        // alternate animation directions starting with direction 1
        if (entity.components.appearance.skeleton.lefthand.direction === 1) {
            entity.components.appearance.skeleton.lefthand.rotation -= entity.components.appearance.skeleton.lefthand.speed;
            if (entity.components.appearance.skeleton.lefthand.rotation <= entity.components.appearance.skeleton.lefthand.rotationMax) {
                entity.components.appearance.skeleton.lefthand.direction = -1;
            }
        } else if (entity.components.appearance.skeleton.lefthand.direction === -1) {
            entity.components.appearance.skeleton.lefthand.rotation += entity.components.appearance.skeleton.lefthand.speed;
            if (entity.components.appearance.skeleton.lefthand.rotation >= entity.components.appearance.skeleton.lefthand.rotationMin) {
                entity.components.appearance.skeleton.lefthand.direction = 1;
            }
        }
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.lefthand.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.lefthand.y - gameArea.canvas.floor);
        gameArea.context.rotate(entity.components.appearance.skeleton.lefthand.rotation * Math.PI / 180);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.lefthand.spriteX, entity.components.appearance.skeleton.lefthand.spriteY, entity.components.appearance.skeleton.lefthand.spriteWidth, entity.components.appearance.skeleton.lefthand.spriteHeight, 0, 0, entity.components.appearance.skeleton.lefthand.spriteWidth, entity.components.appearance.skeleton.lefthand.spriteHeight);
        gameArea.context.restore();

        // left leg
        if (entity.components.appearance.skeleton.leftleg.direction === 0) {
            entity.components.appearance.skeleton.leftleg.direction = 1;
        }
        if (entity.components.appearance.skeleton.leftleg.direction === 1) {
            entity.components.appearance.skeleton.leftleg.rotation -= entity.components.appearance.skeleton.leftleg.speed;
            if (entity.components.appearance.skeleton.leftleg.rotation <= entity.components.appearance.skeleton.leftleg.rotationMax) {
                entity.components.appearance.skeleton.leftleg.direction = -1;
            }
        } else if (entity.components.appearance.skeleton.leftleg.direction === -1) {
            entity.components.appearance.skeleton.leftleg.rotation += entity.components.appearance.skeleton.leftleg.speed;
            if (entity.components.appearance.skeleton.leftleg.rotation >= entity.components.appearance.skeleton.leftleg.rotationMin) {
                entity.components.appearance.skeleton.leftleg.direction = 1;
            }
        }
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.leftleg.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.leftleg.y - gameArea.canvas.floor);
        gameArea.context.rotate(entity.components.appearance.skeleton.leftleg.rotation * Math.PI / 180);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.leftleg.spriteX, entity.components.appearance.skeleton.leftleg.spriteY, entity.components.appearance.skeleton.leftleg.spriteWidth, entity.components.appearance.skeleton.leftleg.spriteHeight, 0, 0, entity.components.appearance.skeleton.leftleg.spriteWidth, entity.components.appearance.skeleton.leftleg.spriteHeight);
        gameArea.context.restore();
        // right leg
        if (entity.components.appearance.skeleton.rightleg.direction === 0) {
            entity.components.appearance.skeleton.rightleg.direction = -1;
        }
        if (entity.components.appearance.skeleton.rightleg.direction === 1) {
            entity.components.appearance.skeleton.rightleg.rotation -= entity.components.appearance.skeleton.rightleg.speed;
            if (entity.components.appearance.skeleton.rightleg.rotation <= entity.components.appearance.skeleton.rightleg.rotationMax) {
                entity.components.appearance.skeleton.rightleg.direction = -1;
            }
        } else if (entity.components.appearance.skeleton.rightleg.direction === -1) {
            entity.components.appearance.skeleton.rightleg.rotation += entity.components.appearance.skeleton.rightleg.speed;
            if (entity.components.appearance.skeleton.rightleg.rotation >= entity.components.appearance.skeleton.rightleg.rotationMin) {
                entity.components.appearance.skeleton.rightleg.direction = 1;
            }
        }
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.rightleg.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.rightleg.y - gameArea.canvas.floor);
        gameArea.context.rotate(entity.components.appearance.skeleton.rightleg.rotation * Math.PI / 180);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.rightleg.spriteX, entity.components.appearance.skeleton.rightleg.spriteY, entity.components.appearance.skeleton.rightleg.spriteWidth, entity.components.appearance.skeleton.rightleg.spriteHeight, 0, 0, entity.components.appearance.skeleton.rightleg.spriteWidth, entity.components.appearance.skeleton.rightleg.spriteHeight);
        gameArea.context.restore();

        // torso
        if (entity.components.appearance.skeleton.torso.direction === 0) {
            entity.components.appearance.skeleton.torso.direction = 1;
        }
        if (entity.components.appearance.skeleton.torso.direction === 1) {
            entity.components.appearance.skeleton.torso.y -= entity.components.appearance.skeleton.torso.speed;
            if (entity.components.appearance.skeleton.torso.y <= entity.components.appearance.skeleton.torso.yMin) {
                entity.components.appearance.skeleton.torso.direction = -1;
            }
        } else if (entity.components.appearance.skeleton.torso.direction === -1) {
            entity.components.appearance.skeleton.torso.y += entity.components.appearance.skeleton.torso.speed;
            if (entity.components.appearance.skeleton.torso.y >= entity.components.appearance.skeleton.torso.yMax) {
                entity.components.appearance.skeleton.torso.direction = 1;
            }
        }
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.torso.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.torso.y - gameArea.canvas.floor);
        gameArea.context.rotate(entity.components.appearance.skeleton.torso.rotation * Math.PI / 180);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.torso.spriteX, entity.components.appearance.skeleton.torso.spriteY, entity.components.appearance.skeleton.torso.spriteWidth, entity.components.appearance.skeleton.torso.spriteHeight, 0, 0, entity.components.appearance.skeleton.torso.spriteWidth, entity.components.appearance.skeleton.torso.spriteHeight);
        gameArea.context.restore();
        // head
        if (entity.components.appearance.skeleton.head.direction === 0) {
            entity.components.appearance.skeleton.head.direction = 1;
        }
        if (entity.components.appearance.skeleton.head.direction === 1) {
            entity.components.appearance.skeleton.head.y -= entity.components.appearance.skeleton.head.speed;
            if (entity.components.appearance.skeleton.head.y <= entity.components.appearance.skeleton.head.yMin) {
                entity.components.appearance.skeleton.head.direction = -1;
            }
        } else if (entity.components.appearance.skeleton.head.direction === -1) {
            entity.components.appearance.skeleton.head.y += entity.components.appearance.skeleton.head.speed;
            if (entity.components.appearance.skeleton.head.y >= entity.components.appearance.skeleton.head.yMax) {
                entity.components.appearance.skeleton.head.direction = 1;
            }
        }
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.head.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.head.y - gameArea.canvas.floor);
        gameArea.context.rotate(entity.components.appearance.skeleton.head.rotation * Math.PI / 180);

        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.head.spriteX, entity.components.appearance.skeleton.head.spriteY, entity.components.appearance.skeleton.head.spriteWidth, entity.components.appearance.skeleton.head.spriteHeight, 0, 0, entity.components.appearance.skeleton.head.spriteWidth, entity.components.appearance.skeleton.head.spriteHeight);

        gameArea.context.restore();
        // right hand
        if (entity.components.appearance.skeleton.righthand.direction === 0) {
            entity.components.appearance.skeleton.righthand.direction = -1;
        }
        if (entity.components.appearance.skeleton.righthand.direction === 1) {
            entity.components.appearance.skeleton.righthand.rotation -= entity.components.appearance.skeleton.righthand.speed;
            if (entity.components.appearance.skeleton.righthand.rotation <= entity.components.appearance.skeleton.righthand.rotationMax) {
                entity.components.appearance.skeleton.righthand.direction = -1;
            }
        } else if (entity.components.appearance.skeleton.righthand.direction === -1) {
            entity.components.appearance.skeleton.righthand.rotation += entity.components.appearance.skeleton.righthand.speed;
            if (entity.components.appearance.skeleton.righthand.rotation >= entity.components.appearance.skeleton.righthand.rotationMin) {
                entity.components.appearance.skeleton.righthand.direction = 1;
            }
        }
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.righthand.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.righthand.y - gameArea.canvas.floor);
        gameArea.context.rotate(entity.components.appearance.skeleton.righthand.rotation * Math.PI / 180);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.righthand.spriteX, entity.components.appearance.skeleton.righthand.spriteY, entity.components.appearance.skeleton.righthand.spriteWidth, entity.components.appearance.skeleton.righthand.spriteHeight, 0, 0, entity.components.appearance.skeleton.righthand.spriteWidth, entity.components.appearance.skeleton.righthand.spriteHeight);
        gameArea.context.restore();
    }
    function animateIdle(entity) {
        // not moving.... TODO: needs idle animation
        entity.components.appearance.skeleton.leftleg.direction = 0;
        entity.components.appearance.skeleton.lefthand.direction = 0;
        entity.components.appearance.skeleton.head.direction = 0;
        entity.components.appearance.skeleton.torso.direction = 0;
        entity.components.appearance.skeleton.rightleg.direction = 0;
        entity.components.appearance.skeleton.righthand.direction = 0;

        // left hand
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.lefthand.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.lefthand.y - gameArea.canvas.floor);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.lefthand.spriteX, entity.components.appearance.skeleton.lefthand.spriteY, entity.components.appearance.skeleton.lefthand.spriteWidth, entity.components.appearance.skeleton.lefthand.spriteHeight, 0, 0, entity.components.appearance.skeleton.lefthand.spriteWidth, entity.components.appearance.skeleton.lefthand.spriteHeight);
        gameArea.context.restore();
        // left leg
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.leftleg.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.leftleg.y - gameArea.canvas.floor);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.leftleg.spriteX, entity.components.appearance.skeleton.leftleg.spriteY, entity.components.appearance.skeleton.leftleg.spriteWidth, entity.components.appearance.skeleton.leftleg.spriteHeight, 0, 0, entity.components.appearance.skeleton.leftleg.spriteWidth, entity.components.appearance.skeleton.leftleg.spriteHeight);
        gameArea.context.restore();

        // right leg
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.rightleg.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.rightleg.y - gameArea.canvas.floor);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.rightleg.spriteX, entity.components.appearance.skeleton.rightleg.spriteY, entity.components.appearance.skeleton.rightleg.spriteWidth, entity.components.appearance.skeleton.rightleg.spriteHeight, 0, 0, entity.components.appearance.skeleton.rightleg.spriteWidth, entity.components.appearance.skeleton.rightleg.spriteHeight);
        gameArea.context.restore();
        // torso
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.torso.y - gameArea.canvas.floor);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.torso.spriteX, entity.components.appearance.skeleton.torso.spriteY, entity.components.appearance.skeleton.torso.spriteWidth, entity.components.appearance.skeleton.torso.spriteHeight, 0, 0, entity.components.appearance.skeleton.torso.spriteWidth, entity.components.appearance.skeleton.torso.spriteHeight);
        gameArea.context.restore();
        // head
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.head.x, gameArea.canvas.height - entity.components.appearance.height - gameArea.canvas.floor);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.head.spriteX, entity.components.appearance.skeleton.head.spriteY, entity.components.appearance.skeleton.head.spriteWidth, entity.components.appearance.skeleton.head.spriteHeight, 0, 0, entity.components.appearance.skeleton.head.spriteWidth, entity.components.appearance.skeleton.head.spriteHeight);
        gameArea.context.restore();
        // right hand
        gameArea.context.save();
        gameArea.context.fillStyle = entity.components.appearance.color;
        gameArea.context.translate(entity.components.position.x + entity.components.appearance.skeleton.righthand.x, gameArea.canvas.height - entity.components.appearance.height + entity.components.appearance.skeleton.righthand.y - gameArea.canvas.floor);
        gameArea.context.drawImage(entity.components.appearance.sprite, entity.components.appearance.skeleton.righthand.spriteX, entity.components.appearance.skeleton.righthand.spriteY, entity.components.appearance.skeleton.righthand.spriteWidth, entity.components.appearance.skeleton.righthand.spriteHeight, 0, 0, entity.components.appearance.skeleton.righthand.spriteWidth, entity.components.appearance.skeleton.righthand.spriteHeight);
        gameArea.context.restore();
    }
    function render() {
        updateBackground();
        updateFloor();

        entities.forEach((entity) =>{
            // draw alive entities
            if (entity.components.status.isAlive) {
                // animated entities
                if (entity.components.appearance.animated) {
                    if (entity.components.position.movingRight || entity.components.position.movingLeft) {
                        // left and right key press walk animation
                        animateWalk(entity);
                    } else {
                        // idle animation
                        animateIdle(entity);
                    }
                } else {
                    gameArea.context.save();
                    gameArea.context.translate(entity.components.position.x, gameArea.canvas.height - entity.components.appearance.height - gameArea.canvas.floor);
                    gameArea.context.fillStyle = entity.components.appearance.color;
                    gameArea.context.fillRect(0, 0, entity.components.appearance.width, entity.components.appearance.height);
                    gameArea.context.restore();
                }

                // show name
                if (entity.components.lore) {
                    gameArea.context.font = '19px Helvetica, Arial, Sans-Serif';
                    gameArea.context.fillStyle = '#fff';
                    gameArea.context.textAlign = 'center';
                    gameArea.context.fillText(entity.components.lore.name, entity.components.position.x + entity.components.appearance.width / 2, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height - 20);
                } else {
                    gameArea.context.font = '19px Helvetica, Arial, Sans-Serif';
                    gameArea.context.fillStyle = '#fff';
                    gameArea.context.textAlign = 'center';
                    gameArea.context.fillText('???', entity.components.position.x + entity.components.appearance.width / 2, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height - 20);
                }
                if (entity.components.status) {
                    // show hp health bar
                    gameArea.context.save();
                    gameArea.context.translate(entity.components.position.x, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height - 13);

                    if (entity.components.status.hp * 100 / entity.components.status.maxHP >= 60) {
                        gameArea.context.fillStyle = 'green';
                    } else if (entity.components.status.hp * 100 / entity.components.status.maxHP >= 20) {
                        gameArea.context.fillStyle = 'orange';
                    } else {
                        gameArea.context.fillStyle = 'red';
                    }

                    if (entity.components.status.hp >= 0) {
                        gameArea.context.fillRect(0, 0, entity.components.appearance.width / 100 * (entity.components.status.hp * 100 / entity.components.status.maxHP), 8);
                    }
                    gameArea.context.restore();
                } else {
                    // dont show hp
                }

                if (entity.components.combat.takingDamage) {
                    // show damage indicator
                    gameArea.context.save();
                    gameArea.context.translate(entity.components.position.x + entity.components.appearance.width / 2 - 20, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height / 2 - 40);

                    gameArea.context.fillStyle = 'red';
                    let indicatorShape = new Path2D('M26.195 40l2.787-10.901L40 25.089l-7.697-9.757 3.03-12.676L23.387 7.67 13.044 0l-1.923 12.127L0 16.28l9.072 7.448L8.457 36.2l9.864-3.874z');
                    gameArea.context.fill(indicatorShape);
                    gameArea.context.restore();

                    gameArea.context.font = '22px Helvetica, Arial, Sans-Serif';
                    gameArea.context.fillStyle = '#fff';
                    gameArea.context.textAlign = 'center';
                    gameArea.context.fillText(entity.components.combat.lastDamage, entity.components.position.x + entity.components.appearance.width / 2, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height / 2 - 12);


                } else if (entity.components.combat.evadingHit) {
                    gameArea.context.save();
                    gameArea.context.translate(entity.components.position.x + entity.components.appearance.width / 2 - 30, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height / 2 - 40);
                    gameArea.context.fillStyle = 'white';
                    let indicatorShape = new Path2D('M.11 19.344L3.462 5.54c1.9-1.333 3.568-1.924 5.003-1.774 2.076.219 5.11 1.819 5.634 4.07 1.563-2.042 4.423-3.013 6.557-2.788 1.371.144 3.05 4.572 2.898 6.02l-1.117 10.623-3.562.297 1.093-10.401c.187-1.772-.665-2.295-2.066-2.442-1.457-.153-1.406-.013-3.223 1.886l-1.093 10.401-4.183-1.111 1.76-10.108c.187-1.78-1.07-1.889-2.499-2.039-1.419-.149-1.13.007-2.967 1.913L3.323 20.353.11 19.343zm27.189 2.552l1.136-7.624-.47-5.865 4.306-.699c.336 7.626.13 12.508-.62 14.646-.749 2.137-2.2 1.984-4.352-.458zm1.053-16.034c-.364-1.691-.49-2.701-.377-3.03.112-.327.79-1.018 2.032-2.07l2.037 2.345-.254 2.412-3.438.343zm12.01 18.745c-1.286-.135-2.817-.599-4.592-1.392-.01-1.302.08-2.164.272-2.586.15-.332.572-.6 1.267-.806 1.742 1.108 6.376 1.335 6.445.677.068-.641-1.12-1.806-3.561-3.494-2.323-1.265-4.296-3.215-4.096-5.11.142-1.353 3.443-4.716 5.11-4.541.867.091 2.635.036 3.886.408l2.679 1.589-1.35 3.628c-1.522-.632-2.826-2.29-3.75-2.387-1.81-.19-1.855.47-1.993 1.784-.06.565.674 1.557 2.2 2.976 1.466.809 2.48 1.606 3.043 2.392.562.786 1.347 2.976 1.234 4.052-.143 1.362-5.118 2.987-6.795 2.81zm14.915 1.568c-1.285-.135-2.816-.6-4.591-1.393l.282-1.862c1.742 1.107 4.655-.075 5.234-.458.58-.382 1.905-2.23.476-3.016-3.447-1.656-5.104-3.116-4.971-4.38.142-1.352.949-3.6 1.988-4.275 1.039-.676 2.392-.926 4.058-.751.867.091 1.926.323 3.178.695l.573.176-.823 3.568c-1.522-.632-5.378-1.894-5.516-.58-.089.848 1.183 2.094 2.49 2.706l1.688 1.078c1.465.809 2.282 3.347 2.17 4.424-.144 1.362-.204 1.014-1.372 1.777-1.169.763-3.187 2.467-4.864 2.291z');
                    gameArea.context.fill(indicatorShape);
                    gameArea.context.restore();
                } else {
                    //nothing
                }

                if (entity.components.status.isDying) {
                    // death frames
                    entity.components.appearance.color = 'grey';
                }

                // do stuff for NPCs
                if (!entity.components.playerControlled) {
                    if (entity.components.combat.isTargeted) {
                        // target indicator
                        gameArea.context.save();
                        gameArea.context.translate(entity.components.position.x + entity.components.appearance.width / 2 - 7, gameArea.canvas.height - gameArea.canvas.floor - entity.components.appearance.height - 60);

                        gameArea.context.fillStyle = 'orange';
                        let indicatorShape = new Path2D('M0,4 L7,0 L14,4 L7,20 L0,4 Z');
                        gameArea.context.fill(indicatorShape);
                        gameArea.context.restore();
                    }

                }
            }

        });

        logger.update();
    }


    function updateScreen() {
        clear();

        PCs.forEach((entity) =>{
            playerInput(entity);
        });
        NPCs.forEach((entity) =>{
            NPCBehaviour(entity);
            updateToFaceCurrentTarget(entity);
        });
        entities.forEach((entity) =>{
            updateEntityAttackRange(entity);
        });
        render();

        window.requestAnimationFrame(updateScreen);
    }

    return this;
}
game(1280, 720);
