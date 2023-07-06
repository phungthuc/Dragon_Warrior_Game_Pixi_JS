import { Container } from "pixi.js";
import { BossController } from "./bossController";
import { DragonController } from "./dragonController";
import { PipeManager, PipeManagerEvent } from "./pipeManager";
import { RectangleCollider } from "../collision/rectangleCollider";
import { GameConstant } from "../constants";

export const GameManagerEvents = Object.freeze({
    EVENT_LOSS_GAME: "gamemanager:loss",
    EVENT_WIN_GAME: "gamemanager:win"
});

export class GameManager extends Container {
    constructor(dataLevel) {
        super();

        this.dataLevel = dataLevel;

        this._init();

        this.pipesPosition = [];
        this.healthPipes = [];
        this.pipeShot = [];

        this.isDonePipe = false;
        this.gameStatus = null;

        this.rectCollider = new RectangleCollider();
    }

    _init() {
        this.bossController = new BossController(this.dataLevel.boss, this.dataLevel.bossFire);
        this.bossController.visible = false;
        this.addChild(this.bossController);

        this.pipeManager = new PipeManager(this.dataLevel.numPipe, this.dataLevel.distancePipes, this.dataLevel.pipes);
        this.addChild(this.pipeManager);

        this.dragonController = new DragonController(this.pipeManager, this.dataLevel.dragonFire);
        this.addChild(this.dragonController);
    }

    update(delta) {
        this.pipesPosition = this.pipeManager.getPosition();
        this.pipeShot = this.dragonController.update(delta, this.pipesPosition);
        if (this.isDonePipe) {
            this.bossController.update(delta, this.pipeShot, this.dragonController.getPosition());
        } else {
            this.pipeManager.update(delta, this.pipeShot);
        }
        this.onCollision();
    }

    onCollision() {
        this.dragonController.on(GameConstant.EVENT_LOSS_GAME, () => {
            this.emit(GameManagerEvents.EVENT_LOSS_GAME);
        });
        this.bossController.on(GameConstant.EVENT_LOSS_GAME, () => {
            this.emit(GameManagerEvents.EVENT_LOSS_GAME);
        });
        this.bossController.on(GameConstant.EVENT_WIN_GAME, () => {
            this.emit(GameManagerEvents.EVENT_WIN_GAME);
        });
        this.pipeManager.on(PipeManagerEvent.EVENT_DONE_PIPE, () => {
            this.bossController.visible = true;
            this.isDonePipe = true;
        });
    }

}