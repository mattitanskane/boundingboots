import controls from './Controls';
import spawner from './NPC-Controller';
import character from './PC';

const game = {
    init(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.floor = 110;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.bgImage = new Image(this.canvas.width, this.canvas.height);
        this.bgImage.src = 'parallax-forest-preview.png';

        this.bgXPos = 0;
        this.bgYPos = 0;

        // initialized elsewhere
        this.player;
        this.playerController;
        this.npcController;

        return this;
    },
    start() {
        const playerConfig = {
            width: 90,
            height: 200,
            xPos: this.canvas.width * 0.2,
            yPos: 0,
            xVel: 1,
            color: 'tomato',
            name: 'Grey',
            job: 'Paladin'
        };
        this.player = Object.create(character).init(playerConfig);
        this.playerController = Object.create(controls).init(this);

        // spawner needs to know width and height of the playable area in order to spawn stuff correctly
        // TODO: does it really need to know though
        this.npcController = Object.create(spawner).init().spawnNPC(this.canvas.width, this.canvas.height);
        setInterval(() => this.npcController.spawnNPC(this.canvas.width, this.canvas.height), 20000);

        window.requestAnimationFrame(this.updateScreen.bind(this));

        this.updateScreen();
    },
    clear() {
        this.context.fillStyle = '#fff1bc';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    updateScreen() {
        this.clear();

        this.updateBackground();
        this.updateFloor();
        this.playerController.updatePositions(this);
        this.updateEntities();

        if (!this.player.isAlive) {
            this.playerController.failState();
        }

        window.requestAnimationFrame(this.updateScreen.bind(this));
    },
    updateEntities() {
        this.player.update(this.canvas);

        // array of enemies
        this.npcController.arrayOfNPCs.forEach((enemy) =>{
            // update enemy
            enemy.update(this.canvas);

            // keep track of existing enemies
            if (!enemy.isAlive) {
                this.npcController.arrayOfNPCs.splice(this.npcController.arrayOfNPCs.indexOf(enemy), 1);
                enemy = {};
            }
            if (enemy.currentAttacker) {
                enemy.aggro = true;
            }

            if (enemy.aggro && !enemy.battleStart && enemy.currentAttacker.isAlive) {
                enemy.engage();
            }
        });
    },
    updateFloor() {
        this.context.save();

        this.context.translate(0, this.canvas.height - this.canvas.floor);
        this.context.fillStyle = '#7dc383';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.floor * 0.5);

        this.context.translate(0, this.canvas.floor * 0.5);
        this.context.fillStyle = '#6a9c78';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.floor * 0.3);

        this.context.translate(0, this.canvas.floor * 0.3);
        this.context.fillStyle = '#446e5c';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.floor * 0.2);

        this.context.restore();
    },
    updateBackground() {
        if (!this.bg) {
            this.bg = this.context.createPattern(this.bgImage, 'repeat');
        }
        this.context.save();
        this.context.translate(this.bgXPos, 0);
        this.context.fillStyle = this.bg;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.bgXPos >= 0) {
            // going left
            this.context.fillRect(this.bgXPos - this.canvas.width, 0, this.canvas.width, this.canvas.height);
        } else if (this.bgXPos + this.canvas.width <= this.canvas.width) {
            // going right
            this.context.fillRect(this.bgXPos + this.canvas.width, 0, this.canvas.width, this.canvas.height);
        }
        this.context.restore();
    },
    displayDebug(dbgArray) {
        this.context.font = '16px sans-serif';
        let i = 18;
        dbgArray.forEach(function(debuggableItem) {
            this.context.fillText(debuggableItem, 5, i);
            i += 18;
        });
    }
};

module.exports = game;