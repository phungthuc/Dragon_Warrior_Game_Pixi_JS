import { Container } from "pixi.js";
import { BossFire } from "../models/bossFire";
import { GameConstant } from "../constants";
import { RectangleCollider } from "../collision/rectangleCollider";

export class BossFireManager extends Container {
    constructor(dataBossFire) {
        super();

        this.dataBossFire = dataBossFire;
        this.bossFires = [];

        this._init();
        this.rectCollider = new RectangleCollider();
    }

    _init() {
        for (let i = 0; i < GameConstant.BOSS_FIRE_QUANTITY; i++) {
            i % 2 == 0 ? this.bossFire = new BossFire(GameConstant.BOSS_FIRE_ANGLE * i, this.dataBossFire) :
                this.bossFire = new BossFire(- GameConstant.BOSS_FIRE_ANGLE * i, this.dataBossFire)
            this.addChild(this.bossFire);
            this.bossFires.push(this.bossFire);
        }
    }

    update(delta, dragonPosition) {
        for (let i = 0; i < GameConstant.BOSS_FIRE_QUANTITY; i++) {
            if (i % 2 == 0) {
                this.bossFires[i].x -= this.dataBossFire.velocity_x * delta;
                this.bossFires[i].y -= GameConstant.BOSS_FIRE_VY * i * delta;
            } else {
                this.bossFires[i].x -= this.dataBossFire.velocity_x * delta;
                this.bossFires[i].y -= -GameConstant.BOSS_FIRE_VY * i * delta;
            }
        }

        this.wallCollision();
        this.onCollision(dragonPosition);
    }

    onCollision(dragonPosition) {
        for (let i = 0; i < this.bossFires.length; i++) {
            if (this.rectCollider.checkCollision(this.bossFires[i].x, this.bossFires[i].y, GameConstant.BOSS_FIRE_WIDTH, GameConstant.BOSS_FIRE_HEIGHT,
                dragonPosition[0] + GameConstant.DRAGON_WIDTH / 3, dragonPosition[1] + GameConstant.DRAGON_HEIGHT / 2, GameConstant.DRAGON_WIDTH / 3, GameConstant.DRAGON_HEIGHT / 2)) {
                this.emit(GameConstant.EVENT_LOSS_GAME);
            }
        }
    }

    wallCollision() {
        if (this.bossFires[0].x < - GameConstant.BOSS_FIRE_WIDTH) {
            this.bossFires = [];
            this._init();
        }
    }

    checkEventEmitter() {

    }
}