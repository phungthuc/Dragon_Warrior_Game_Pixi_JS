import { Container } from "pixi.js";
import { Dragon } from "../models/dragon";
import { DragonFireManager } from "./dragon_fire_manager";
import { GameConstant } from "../constants";

export class DragonController extends Container {
    constructor(pipeContainer, dataDragon) {
        super();

        this.dataDragon = dataDragon;
        this.pipeContainer = pipeContainer;

        this._init();
        this.positionDragon = [];
    }

    _init() {
        this.dragon = new Dragon();
        this.addChild(this.dragon);

        this.dragonFireManader = new DragonFireManager(this.pipeContainer, this.dataDragon);
        this.addChild(this.dragonFireManader);
    }

    update(delta, pipePosition) {
        this.dragon.update(delta, pipePosition);
        this.positionDragon = this.dragon.getPosition();
        this.onCollision();
        return this.dragonFireManader.update(delta, this.positionDragon[0], this.positionDragon[1], pipePosition);
    }

    getPosition() {
        return this.positionDragon;
    }

    onCollision() {
        this.dragon.on(GameConstant.EVENT_LOSS_GAME, () => {
            this.emit(GameConstant.EVENT_LOSS_GAME);
        });
    }
}