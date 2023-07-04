import { Container } from "pixi.js";
import { BossController } from "./boss_controller";
import { DragonController } from "./dragon_controller";
import { PipeManager, PipeManagerEvent } from "./pipe_manager";
import { RectangleCollider } from "../collision/rectangle_collider";
import { GameConstant } from "../constants";

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
        this.bossController = new BossController();
        this.bossController.visible = false;
        this.addChild(this.bossController);

        this.pipeManager = new PipeManager(this.dataLevel.numPipe, this.dataLevel.distancePipes, this.dataLevel.pipes);
        this.addChild(this.pipeManager);

        this.dragonController = new DragonController(this.pipeManager);
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
        return this.gameStatus;
    }

    onCollision() {
        this.dragonController.on(GameConstant.EVENT_LOSS_GAME, () => {
            this.gameStatus = "loss";
        });
        this.bossController.on(GameConstant.EVENT_LOSS_GAME, () => {
            this.gameStatus = "loss";
        });
        this.bossController.on(GameConstant.EVENT_WIN_GAME, () => {
            this.gameStatus = "win";
        });
        this.pipeManager.on(PipeManagerEvent.EVENT_DONE_PIPE, () => {
            this.bossController.visible = true;
            this.isDonePipe = true;
        });
    }

}