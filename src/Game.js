const game = {
    init(width, height) {
        this.canvas = document.createElement('canvas');
        this.width = width;
        this.height = height;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        return this;
    },
    start() {
        window.requestAnimationFrame(this.update);

        this.update();
    },
    clear() {
        this.context.fillStyle = 'beige';
        this.context.fillRect(0, 0, this.width, this.height);
    },
    updateScreen() {
        this.clear();

        this.checkEntities();

        window.requestAnimationFrame(this.update);
    },
    updateEntities() {
        console.log('updating entities');
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