import { Container, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";

export class BossFire extends Sprite {
    constructor(angle, dataBossFire) {
        super(utils.TextureCache["assets/images/boss/fireball_03.png"]);

        this.angle = angle;
        this.dataBossFire = dataBossFire;

        this.width = this.dataBossFire.w;
        this.height = this.dataBossFire.h;

        this.setPosition();
    }

    update(delta) {

    }

    setPosition() {
        this.position.set(this.dataBossFire.x, this.dataBossFire.y);
        this.rotation = this.angle;
    }

    getPosition() {
        return [
            this.dragonFire.x,
            this.dragonFire.y
        ];
    }
}