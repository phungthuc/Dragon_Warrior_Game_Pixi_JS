import { Container } from "pixi.js";
import { Boss } from "../models/boss";
import { BossFireManager } from "../managers/boss_fire_manager";

export class BossController extends Container {
    constructor() {
        super();

        this._init();
    }

    _init() {
        this.boss = new Boss();
        this.addChild(this.boss);

        this.bossFireManager = new BossFireManager();
        this.addChild(this.bossFireManager);
    }

    update(delta, pipeShot, dragonPosition) {
        this.boss.update(delta, pipeShot);
        this.bossFireManager.update(delta, dragonPosition);
    }
}