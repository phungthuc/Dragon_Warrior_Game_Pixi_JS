import { Container } from "pixi.js";
import { BossFire } from "../models/boss_fire";
import { GameConstant } from "../constants";
import { RectangleCollider } from "../collision/rectangle_collider";

export class BossFireManager extends Container {
    constructor() {
        super();

        this.bossFires = [];

        this._init();
        this.rectCollider = new RectangleCollider();
    }

    _init() {
        for (let i = 0; i < GameConstant.BOSS_FIRE_QUANTITY; i++) {
            i % 2 == 0 ? this.bossFire = new BossFire(GameConstant.BOSS_FIRE_ANGLE * i) :
                this.bossFire = new BossFire(- GameConstant.BOSS_FIRE_ANGLE * i)
            this.addChild(this.bossFire);
            this.bossFires.push(this.bossFire);
        }
    }

    update(delta, dragonPosition) {
        for (let i = 0; i < GameConstant.BOSS_FIRE_QUANTITY; i++) {
            if (i % 2 == 0) {
                this.bossFires[i].x -= GameConstant.BOSS_FIRE_SPEED;
                this.bossFires[i].y -= GameConstant.BOSS_FIRE_VY * i;
            } else {
                this.bossFires[i].x -= GameConstant.BOSS_FIRE_SPEED;
                this.bossFires[i].y -= -GameConstant.BOSS_FIRE_VY * i;
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