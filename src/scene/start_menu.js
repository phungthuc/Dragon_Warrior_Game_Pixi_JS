import { Container, Text, TextStyle } from "pixi.js";

export const GameMenuConst = Object.freeze({
    X_GAME_MENU: 400,
    Y_GAME_MENU: 120,
    GAME_MENU_WIDTH: 360,
    GAME_MENU_HEIGHT: 240
});

export const StartMenuEvent = Object.freeze({
    ButtonClicked: "button:clicked"
});

export class StartMenu extends Container {
    constructor() {
        super();

        this.width = GameMenuConst.GAME_MENU_WIDTH;
        this.height = GameMenuConst.GAME_MENU_HEIGHT;
        this.position.set(GameMenuConst.X_GAME_MENU, GameMenuConst.Y_GAME_MENU);

        this.statusMenu = null;

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

        this.startMess = new Text("Start", this.styleButton);
        this.startMess.position.set(100, 100)
        this.startMess.width = 80;
        this.startMess.height = 40;
        this.startMess.interactive = true;
        this.startMess.buttonMode = true;
        this.addChild(this.startMess);
        this.startMess.on("pointerdown", () => {
            this.emit(StartMenuEvent.ButtonClicked);
        });
    }

    onCollision() {

    }
}