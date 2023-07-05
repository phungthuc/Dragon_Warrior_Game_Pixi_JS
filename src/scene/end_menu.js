import { Container, Text, TextStyle } from "pixi.js";
import { GameMenuConst } from "./start_menu";

export class EndMenu extends Container {
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

        this.winMess = new Text("You Win", this.styleName);
        this.winMess.position.set(80, 120)
        this.addChild(this.winMess);

        this.restartLevel = new Text("Restart", this.styleButton);
        this.restartLevel.position.set(90, 200)
        this.restartLevel.width = 120;
        this.restartLevel.height = 40;
        this.restartLevel.interactive = true;
        this.restartLevel.buttonMode = true;
        this.addChild(this.restartLevel);

    }

    onCollision() {
        this.restartLevel.on("pointerdown", () => {
            this.emit("restartLevel");
        });
    }

}