import { Container } from "pixi.js";
import BossFire from "../models/boss_fire";

export default class BossFireManager extends Container {
    constructor() {
        super();

        this.bossFires = [];

        this._init();
    }

    _init() {
        for (let i = 0; i < 6; i++) {
            i % 2 == 0 ? this.bossFire = new BossFire(Math.PI / 18 * i) :
                this.bossFire = new BossFire(- Math.PI / 18 * i)
            this.addChild(this.bossFire);
            this.bossFires.push(this.bossFire);
        }
    }

    update(delta) {
        for (let i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                this.bossFires[i].x -= 5;
                this.bossFires[i].y -= Math.PI / 4 * i;
            } else {
                this.bossFires[i].x -= 5;
                this.bossFires[i].y -= -Math.PI / 4 * i;
            }
        }
        5
    }

    onCollision() {

    }

    checkEventEmitter() {

    }
}