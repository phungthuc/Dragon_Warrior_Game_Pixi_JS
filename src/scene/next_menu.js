import { Container, Text, TextStyle } from "pixi.js";
import { GameMenuConst } from "./start_menu";

export const NextMenuEvents = Object.freeze({
    ButtonRestartLevelOnClicked: "buttonrestart:clicked",
    ButtonNextLevelOnClicked: "buttonnext:clicked"
});

export class NextMenu extends Container {
    constructor() {
        super();

        this.width = GameMenuConst.GAME_MENU_WIDTH;
        this.height = GameMenuConst.GAME_MENU_HEIGHT;
        this.position.set(GameMenuConst.X_GAME_MENU, GameMenuConst.Y_GAME_MENU);

        this._init();
    }

    _init() {
        this.styleName = new TextStyle({
            fill: "#022c6e",
            fontFamily: "Times New Roman",
            fontSize: 40,
            fontWeight: 600
        });

        this.styleButton = new TextStyle({
            fill: "#099036",
            fontFamily: "Times New Roman",
            fontWeight: 600
        });

        this.nameGame = new Text("Dragon Warrior", this.styleName);
        this.addChild(this.nameGame);

        this.restartLevel = new Text("Restart", this.styleButton);
        this.restartLevel.position.set(100, 100)
        this.restartLevel.width = 120;
        this.restartLevel.height = 40;
        this.restartLevel.interactive = true;
        this.restartLevel.buttonMode = true;
        this.addChild(this.restartLevel);

        this.nextLevelMess = new Text("Next", this.styleButton);
        this.nextLevelMess.position.set(120, 200)
        this.nextLevelMess.width = 80;
        this.nextLevelMess.height = 40;
        this.nextLevelMess.interactive = true;
        this.nextLevelMess.buttonMode = true;
        this.addChild(this.nextLevelMess);

        this.restartLevel.on("pointerdown", () => {
            this.emit(NextMenuEvents.ButtonRestartLevelOnClicked);
        });
        this.nextLevelMess.on("pointerdown", () => {
            this.emit(NextMenuEvents.ButtonNextLevelOnClicked);
        });
    }
}