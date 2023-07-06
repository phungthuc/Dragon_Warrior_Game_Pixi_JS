import { Container, Sprite, Text, TextStyle, utils } from "pixi.js";
import { randomInt } from "../utils/utils";
import { GameConstant } from "../constants";

export class Pipe extends Container {
    constructor(distancePipes, xPipe, yBottomPipe, widthPipe, heightPipe, vPipe, healthPipe) {
        super();

        this.distancePipes = distancePipes;
        this.xPipe = xPipe;
        this.vPipe = vPipe;
        this.heightPipe = heightPipe;

        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 24,
            fill: "white"
        });
        this.pipeTop = new Sprite(utils.TextureCache["assets/images/pipe/pipe_top.png"]);
        this.pipeBottom = new Sprite(utils.TextureCache["assets/images/pipe/pipe_bottom.png"]);

        this.healthTop = healthPipe;
        this.healthBottom = healthPipe;

        this.messHealthTop = new Text(this.healthTop, this.style);
        this.messHealthBottom = new Text(this.healthBottom, this.style);

        this.pipeTop.width = widthPipe;
        this.pipeTop.height = this.heightPipe;
        this.pipeBottom.width = widthPipe;
        this.pipeBottom.height = this.heightPipe;

        this.positionPipeBottom = yBottomPipe;

        this.setPosition();

        this.addChild(this.pipeBottom);
        this.addChild(this.pipeTop);

        this.addChild(this.messHealthTop);
        this.addChild(this.messHealthBottom);

        this.isPipeTop = true;
        this.isPipeBottom = true;

    }

    update(delta) {
        this.messHealthTop.text = this.healthTop;
        this.messHealthBottom.text = this.healthBottom;
        this.pipeTop.x -= this.vPipe;
        this.pipeBottom.x -= this.vPipe;
        this.messHealthTop.x -= this.vPipe;
        this.messHealthBottom.x -= this.vPipe;

    }

    setPosition() {
        this.pipeBottom.position.set(this.xPipe, this.positionPipeBottom);
        this.pipeTop.position.set(this.xPipe, this.pipeBottom.y - this.distancePipes - this.heightPipe);

        this.messHealthTop.position.set(this.xPipe + 6, this.pipeBottom.y - this.distancePipes - 32);
        this.messHealthBottom.position.set(this.xPipe + 6, this.positionPipeBottom + 12);
    }

    getPosition() {
        return [
            this.pipeTop.x,
            this.pipeTop.y,
            this.pipeBottom.x,
            this.pipeBottom.y
        ];
    }


    onCollision() {

    }

    updateHealth(position) {
        if (position == "top") {
            this.healthTop -= 10;
        } else if (position == "bottom") {
            this.healthBottom -= 10;
        }

        if (this.healthTop == 0) {
            this.removePipeTop();
        }
        if (this.healthBottom == 0) {
            this.removePipeBottom();
        }
    }

    removePipeTop() {
        this.removeChild(this.pipeTop);
        this.removeChild(this.messHealthTop);
        this.isPipeTop = false;
    }

    removePipeBottom() {
        this.removeChild(this.pipeBottom);
        this.removeChild(this.messHealthBottom);
        this.isPipeBottom = false;
    }

    getExistencePipe() {
        return [
            this.isPipeTop,
            this.isPipeBottom
        ];
    }
}