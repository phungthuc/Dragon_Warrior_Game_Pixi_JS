import { Container } from "pixi.js";
import { Dragon } from "../models/dragon";
import { DragonFireManager } from "./dragon_fire_manager";

export class DragonController extends Container {
    constructor() {
        super();

        this._init();
        this.positionDragon = [];
    }

    _init() {
        this.dragon = new Dragon();
        this.addChild(this.dragon);

        this.dragonFireManader = new DragonFireManager();
        this.addChild(this.dragonFireManader);
    }

    update(delta, pipePosition) {
        this.dragon.update(delta, pipePosition);
        this.positionDragon = this.dragon.getPosition();
        return this.dragonFireManader.update(delta, this.positionDragon[0], this.positionDragon[1], pipePosition);
    }

    getPosition() {
        return this.positionDragon;
    }
}