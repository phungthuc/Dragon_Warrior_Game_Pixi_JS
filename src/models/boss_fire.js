import { Container, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";

export default class BossFire extends Sprite {
    constructor(angle) {
        super(utils.TextureCache["assets/images/boss/fireball_03.png"]);

        this.angle = angle;

        this.width = GameConstant.BOSS_FIRE_WIDTH;
        this.height = GameConstant.BOSS_FIRE_HEIGHT;

        this.setPosition();
    }

    update(delta) {

    }

    setPosition() {
        this.position.set(780, 420);
        this.rotation = this.angle;
    }

    getPosition() {
        return [
            this.dragonFire.x,
            this.dragonFire.y
        ];
    }
}