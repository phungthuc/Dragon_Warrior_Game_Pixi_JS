import { Container, Sprite, Text, TextStyle, utils } from "pixi.js";
import { randomInt } from "../utils/utils";
import { GameConstant } from "../constants";

export class Pipe extends Container {
    constructor() {
        super();

        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 24,
            fill: "white"
        });
        this.pipeTop = new Sprite(utils.TextureCache["assets/images/pipe/pipe_top.png"]);
        this.pipeBottom = new Sprite(utils.TextureCache["assets/images/pipe/pipe_bottom.png"]);

        this.healthTop = 100;
        this.healthBottom = 100;

        this.messHealthTop = new Text(this.healthTop, this.style);
        this.messHealthBottom = new Text(this.healthBottom, this.style);

        this.pipeTop.width = GameConstant.PIPE_WIDTH;
        this.pipeTop.height = GameConstant.PIPE_HEIGHT;
        this.pipeBottom.width = GameConstant.PIPE_WIDTH;
        this.pipeBottom.height = GameConstant.PIPE_HEIGHT;

        this.positionPipeBottom = randomInt(160, 560);

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
        this.pipeTop.x -= GameConstant.PIPE_VX;
        this.pipeBottom.x -= GameConstant.PIPE_VX;
        this.messHealthTop.x -= GameConstant.PIPE_VX;
        this.messHealthBottom.x -= GameConstant.PIPE_VX;

    }

    setPosition() {
        this.pipeBottom.position.set(GameConstant.PIPE_X, this.positionPipeBottom);
        this.pipeTop.position.set(GameConstant.PIPE_X, this.pipeBottom.y - GameConstant.DISTANCE_PIPE - GameConstant.PIPE_HEIGHT);

        this.messHealthTop.position.set(GameConstant.PIPE_X + 6, this.pipeBottom.y - GameConstant.DISTANCE_PIPE - 32);
        this.messHealthBottom.position.set(GameConstant.PIPE_X + 6, this.positionPipeBottom + 12);
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