import { Container } from "pixi.js";
import BossController from "./boss_controller";
import DragonController from "./dragon_controller";
import PlayerController from "./player_controller";
import PipeManager from "./pipe_manager";
import RectangleCollider from "../collision/rectangle_collider";
import { eventEmitter } from "../utils/utils";
import BossFireManager from "./boss_fire_manager";
import { GameConstant } from "../constants";

export default class GameManager extends Container {
    constructor() {
        super();

        this._init();

        this.pipesPosition = [];
        this.healthPipes = [];
        this.pipeShot = [];

        this.isDonePipe = false;

        this.rectCollider = new RectangleCollider();
        this.checkEventEmitter();
    }

    _init() {
        this.bossController = new BossController();
        this.bossController.visible = false;
        this.addChild(this.bossController);

        this.dragonController = new DragonController();
        this.addChild(this.dragonController);

        this.pipeManager = new PipeManager();
        this.addChild(this.pipeManager);

        this.playerController = new PlayerController();

    }

    update(delta) {
        this.pipesPosition = this.pipeManager.getPosition();
        this.pipeShot = this.dragonController.update(delta, this.pipesPosition);
        if (this.isDonePipe) {
            this.bossController.update(delta, this.pipeShot, this.dragonController.getPosition());
        } else {
            this.pipeManager.update(delta, this.pipeShot);
        }
    }

    onCollision() {

    }

    checkEventEmitter() {
        eventEmitter.on(GameConstant.EVENT_DONE_PIPE, () => {
            this.bossController.visible = true;
            this.isDonePipe = true;
        });
    }
}