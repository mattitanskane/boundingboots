const graphics = {
    init(config) {
        this.xPos = config.xPos;
        this.yPos = config.yPos;

        this.bg = new Image(config.canvas.width, config.canvas.height);
        this.bg.src = 'https://opengameart.org/sites/default/files/parallax-forest-preview.png';

        return this;
    },
    update(canvas) {

        const ctx = canvas.getContext('2d');
        const bgimage = ctx.createPattern(this.bg, 'repeat-x');

        ctx.save();
        ctx.translate(this.xPos, this.yPos);
        ctx.fillStyle = bgimage;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
};

module.exports = graphics;