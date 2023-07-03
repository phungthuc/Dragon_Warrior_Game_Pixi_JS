import { Container } from "pixi.js";
import Boss from "../models/boss";

export default class BossController extends Container {
    constructor() {
        super();

        this._init();
    }

    _init() {
        this.boss = new Boss();
        this.addChild(this.boss);
    }

    update(delta, pipeShot) {
        this.boss.update(delta, pipeShot);
    }
}