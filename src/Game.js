import controls from './Controls';
import spawner from './NPC-Controller';
import character from './PC';

const game = {
    init(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.bgImage = new Image(this.width, this.height);
        this.bgImage.src = 'https://opengameart.org/sites/default/files/parallax-forest-preview.png';
        this.bg = this.context.createPattern(this.bgImage, 'repeat-x');
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
            width: 40,
            height: 100,
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
        this.context.fillStyle = 'beige';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    updateScreen() {
        this.clear();

        this.updateBackground();
        this.playerController.updatePositions(this);
        this.updateEntities();

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
        });
    },
    updateBackground() {
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