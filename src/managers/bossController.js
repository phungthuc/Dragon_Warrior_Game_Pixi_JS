import { Container } from "pixi.js";
import { Boss } from "../models/boss";
import { BossFireManager } from "./bossFireManager";
import { GameConstant } from "../constants";

export class BossController extends Container {
    constructor(dataBoss, dataBossFire) {
        super();

        this.dataBoss = dataBoss;
        this.dataBossFire = dataBossFire;
        this._init();
    }

    _init() {
        this.boss = new Boss(this.dataBoss.x, this.dataBoss.y, this.dataBoss.w, this.dataBoss.h,
            this.dataBoss.health);
        this.addChild(this.boss);

        this.bossFireManager = new BossFireManager(this.dataBossFire);
        this.addChild(this.bossFireManager);
    }

    update(delta, pipeShot, dragonPosition) {
        this.boss.update(delta, pipeShot);
        this.bossFireManager.update(delta, dragonPosition);
        this.onCollision();
    }

    onCollision() {
        this.bossFireManager.on(GameConstant.EVENT_LOSS_GAME, () => {
            this.emit(GameConstant.EVENT_LOSS_GAME);
        });
        this.boss.on(GameConstant.EVENT_WIN_GAME, () => {
            this.emit(GameConstant.EVENT_WIN_GAME);
        });
    }
}