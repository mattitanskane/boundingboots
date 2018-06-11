import npc from './NPC';

const npcSpawner = {
    init() {
        this.arrayOfNPCs = [];

        return this;
    },
    // canvas width and canvas height as parameters
    spawnNPC(spawnAreaWidth, spawnAreaHeight) {

        // index randomizer, returns random index in array
        function randomIndexOfArray(array) {
            const randomIndex = Math.floor(Math.random() * array.length);

            return randomIndex;
        }

        // random character width and height
        const randomWidth = Math.floor(60 + 80 * Math.random());
        const randomHeight = Math.floor(100 + 120 * Math.random());

        // horizontal position is random
        const randomXPosition = Math.floor(spawnAreaWidth * Math.random());
        // vertical position is on the bottom of playable area
        const groundLevel = Math.floor(spawnAreaHeight - randomHeight);

        // random rgb color
        const randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        const availableNames = [
            'Shadow Lord',
            'Com Bat',
            'Leaping Lizard',
            'Mattdamon',
            'Thepope',
            'Tenzen'
        ];
        const randomName = availableNames[randomIndexOfArray(availableNames)];

        const availableJobs = [
            'Knight',
            'Dragoon',
            'Whitemage',
            'Corsair'
        ];
        const randomJob = availableJobs[randomIndexOfArray(availableJobs)];

        // set npc properties
        const npcConfig = {
            name: randomName,
            job: randomJob,
            width: randomWidth,
            height: randomHeight,
            xPos: randomXPosition,
            yPos: groundLevel,
            xVel: 3,
            color: randomColor
        };

        // create npc object
        const randomNPC = Object.create(npc).init(npcConfig);

        // push new object to array
        this.arrayOfNPCs.push(randomNPC);

        return this;
    }
};

module.exports = npcSpawner;