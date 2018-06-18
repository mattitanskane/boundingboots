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
const engage = 70;

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

        this.xPos = xPos || 0;
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
        this.battleStart = false;
        this.currentTarget = null;
        this.isTargeted = null;
        this.currentAttacker = null;
        this.attackRange = 200;
        this.weaponRange = this.width * 2;
        this.weaponDelay = 1000;

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
    const playerPosition = Object.create(components.position).init(50, 0, 1);
    const playerLore = Object.create(components.lore).init('Aslan');
    const playerStatus = Object.create(components.status).init();
    const playerCombat = Object.create(components.combat).init();

    player.addComponent(playerControlled);
    player.addComponent(playerAppearance);
    player.addComponent(playerPosition);
    player.addComponent(playerLore);
    player.addComponent(playerStatus);
    player.addComponent(playerCombat);

    const enemy = Object.create(entity).init();

    enemy.addComponent( Object.create(components.appearance).init() );
    enemy.addComponent( Object.create(components.position).init(400) );
    enemy.addComponent( Object.create(components.lore).init() );
    enemy.addComponent( Object.create(components.combat).init() );

    console.log(player);
    console.log(enemy);

    entities.push(player);
    entities.push(enemy);

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

    function userInput(entity) {
        // handles all user input, overflow prevention and bg parallax stuff
        // TODO: maybe center camera to player
        if (keysDown[cycleTarget]) {
            // if targetable enemies exist
            if (entities.length > 0) {
                // if no target exists
                if (!entity.components.combat.currentTarget) {
                    // target the first enemy
                    entity.components.combat.currentTarget = entities[0];
                    entities[0].components.combat.isTargeted = true;
                } else {
                    // else targetIndex is the index of currentTarget
                    let targetIndex = entities.indexOf(entity.components.combat.currentTarget);
                    // iterate index
                    targetIndex++;
                    if (targetIndex >= entities.length) {
                        //remove marker
                        entities.forEach(function(entity) {
                            entity.components.combat.isTargeted = false;
                        });
                        // if enemy at current index is last available target
                        // go back to first enemy
                        entity.components.combat.currentTarget = entities[0];
                        entities[0].components.combat.isTargeted = true;
                    } else {
                        //remove marker
                        entities.forEach(function(entity) {
                            entity.components.combat.isTargeted = false;
                        });
                        // else target enemy somewhere in between first and last
                        entity.components.combat.currentTarget = entities[targetIndex];
                        entities[targetIndex].components.combat.isTargeted = true;
                    }
                }
                console.log('targeting ' + entity.components.combat.currentTarget.components.lore.name);
            // no targetable enemies
            } else {
                console.log('no entities found');
            }
        }

        if (keysDown[moveLeft]) {
            entity.components.position.movingLeft = true;
            entity.components.position.facingRight = false;
            if (entity.components.position.xPos === 0) {
                // prevent overflow leftside
                entity.components.position.xPos = entity.components.position.xPos;
            } else {
                // parallax bg and move character
                gameArea.bgXPos += entity.components.position.xVel / 1.2;
                entity.components.position.xPos -= entity.components.position.xVel;
            }
        } else {
            entity.components.position.movingLeft = false;
            entity.components.position.xPos = entity.components.position.xPos;
        }

        if (keysDown[moveRight]) {
            entity.components.position.movingRight = true;
            entity.components.position.facingRight = true;
            if (entity.components.position.xPos + entity.components.appearance.width === gameArea.canvas.width) {
                // prevent overflow rightside
                entity.components.position.xPos = entity.components.position.xPos;
            } else {
                // parallax bg and move character
                gameArea.bgXPos -= entity.components.position.xVel / 1.2;
                entity.components.position.xPos += entity.components.position.xVel;
            }
        } else {
            entity.components.position.movingRight = false;
            entity.components.position.xPos = entity.components.position.xPos;
        }

        if (keysDown[engage]) {
            console.log('engage target');
        }
    }
    function render() {
        updateBackground();
        updateFloor();
        entities.forEach((entity) =>{
            //const randomXPosition = Math.floor(spawnAreaWidth * Math.random());
            gameArea.context.save();
            gameArea.context.translate(entity.components.position.xPos, gameArea.canvas.height - entity.components.appearance.height - gameArea.canvas.floor);
            gameArea.context.fillStyle = entity.components.appearance.color;
            gameArea.context.fillRect(0, 0, entity.components.appearance.width, entity.components.appearance.height);
            gameArea.context.restore();
        });
    }

    function updateScreen() {
        clear();

        entities.forEach((entity) =>{
            if (entity.components.playerControlled) {
                const player = entity;
                userInput(player);
            }
        });
        render();

        window.requestAnimationFrame(updateScreen);
    }

    return this;
}
game(1280, 720);
