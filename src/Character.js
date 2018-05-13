//var attributes = require("./Attributes");
//var stats = require("./Stats");
//var status = require("./Status");
// player chooses race, gender, job, origin and name
const character = {
    init: function(xPos, yPos, xVel, color) {
        this.width = 40;
        this.height = 100;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.color = color;
        this.movingLeft = false;
        this.movingRight = false;

        return this;
    },
    drawSelf: function(ctx) {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
};

module.exports = character;