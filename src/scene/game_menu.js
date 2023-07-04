import { Container } from "pixi.js";
import { GameConstant } from "../constants";

export class GameMenu extends Container {
    constructor() {
        super();

        this.width = GameConstant.SCREEN_WIDTH;
        this.height = GameConstant.SCREEN_HEIGHT;

        this.status = "start";

        this._init();
    }

    _init() {
        this.startScene = new Container();
        this.addChild(this.startScene);


    }


}