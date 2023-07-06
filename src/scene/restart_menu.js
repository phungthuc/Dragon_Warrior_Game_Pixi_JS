import { Container, Text, TextStyle } from "pixi.js";
import { GameMenuConst } from "./start_menu";

export const RestartMenuEvent = Object.freeze({
    ButtonClicked: "button:clicked"
});
export class RestartMenu extends Container {
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
            fontSize: 40,
            fontWeight: 600
        });

        this.nameGame = new Text("Dragon Warrior", this.styleName);
        this.addChild(this.nameGame);


        this.restartMess = new Text("Restart", this.styleButton);
        this.restartMess.position.set(100, 100)
        this.restartMess.width = 120;
        this.restartMess.height = 40;
        this.restartMess.interactive = true;
        this.restartMess.buttonMode = true;
        this.addChild(this.restartMess);

        this.restartMess.on("pointerdown", () => {
            this.emit(RestartMenuEvent.ButtonClicked);
        });
    }
}