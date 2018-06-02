const graphics = {
    init(config) {
        this.xPos = config.xPos;
        this.yPos = config.yPos;
        this.width = config.canvas.width;
        this.height = config.canvas.height;

        this.bg = new Image(this.width, this.height);
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
        if (this.xPos >= 0) {
            // going left
            ctx.fillRect(this.xPos - this.width, 0, canvas.width, canvas.height);
        }
        if (this.xPos + this.width <= canvas.width) {
            // going right
            ctx.fillRect(this.xPos + this.width, 0, canvas.width, canvas.height);
        }
        ctx.restore();


    }
};

module.exports = graphics;

// // if image is <= Canvas Size
// if (this.width <= canvas.width) {
//     // reset, start from beginning
//     if (this.x > canvas.width) {
//         this.x = -this.width + this.x;
//     }
//     // draw additional image1
//     if (this.x > 0) {
//         ctx.fillRect(-this.width + this.x, 0, this.width, this.height);
//     }
//     // draw additional image2
//     if (this.x - this.width > 0) {
//         ctx.fillRect(-this.width * 2 + this.x, 0, this.width, this.height);
//     }
// }

// // image is > Canvas Size
// else {
//     // reset, start from beginning
//     if (this.x > (canvas.width)) {
//         this.x = canvas.width - this.width;
//     }
//     // draw aditional image
//     if (this.x > (canvas.width-this.width)) {
//         ctx.fillRect(this.x - this.width + 1, 0, this.width, this.height);
//     }
// }
// // draw image
// ctx.fillRect(this.x, 0, this.width, this.height);
// // amount to move
// this.x += 0.75;