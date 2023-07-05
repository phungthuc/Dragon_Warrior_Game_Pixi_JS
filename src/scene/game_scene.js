import { Application, Container, Loader, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { Background } from "../models/background";
import { LevelManager } from "../level/level_manager";

export class GameScene extends Application {
    constructor() {
        super({
            width: GameConstant.SCREEN_WIDTH,
            height: GameConstant.SCREEN_HEIGHT
        });
        this.renderer.backgroundColor = 0x061639;

        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.top = "50%";
        this.renderer.view.style.left = "50%";
        this.renderer.view.style.transform = "translate(-50%,-50%)";
        this.renderer.view.style.border = "1px solid #d8d8d8";

        document.body.appendChild(this.view);

        this.gameScene = new Container();
        this.stage.addChild(this.gameScene);

        this.gameStatus = null;

    }

    load() {
        Loader.shared
            .add("assets/images/background/Layer_0011_0.png")
            .add("assets/images/background/Layer_0010_1.png")
            .add("assets/images/background/Layer_0009_2.png")
            .add("assets/images/background/Layer_0008_3.png")
            .add("assets/images/background/Layer_0007_Lights.png")
            .add("assets/images/background/Layer_0006_4.png")
            .add("assets/images/background/Layer_0005_5.png")
            .add("assets/images/background/Layer_0004_Lights.png")
            .add("assets/images/background/Layer_0003_6.png")
            .add("assets/images/background/Layer_0002_7.png")
            .add("assets/images/background/Layer_0001_8.png")
            .add("assets/images/background/Layer_0000_9.png")
            .add("assets/images/boss/cc2d_body_0070.png")
            .add("assets/images/boss/explosion_04.png")
            .add("assets/images/boss/fireball_03.png")
            .add("assets/images/dragon/explosion_06.png")
            .add("assets/images/dragon/strike_01.png")
            .add("assets/images/dragon/strike_02.png")
            .add("assets/images/dragon/strike_03.png")
            .add("assets/images/dragon/strike_04.png")
            .add("assets/images/dragon/strike_05.png")
            .add("assets/images/dragon/iblast_02.png")
            .add("assets/images/pipe/pipe_top.png")
            .add("assets/images/pipe/pipe_bottom.png")
            .add("particles", "assets/images/dragon/emitter.json")
            .add("assets/images/dragon/particle.png")
            .load(() => {
                this.setup();
            });
    }

    setup() {
        this.bg = new Background();
        this.gameScene.addChild(this.bg);

        this.levelManager = new LevelManager();
        this.gameScene.addChild(this.levelManager);

        this.ticker.add((delta) => {
            this.gameLoop(delta);
        });
    }

    gameLoop(delta) {
        this.levelManager.update(delta);
    }

} 