import { Container, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";

export default class Background extends Container {
    constructor() {
        super();

        this.layer_01 = new Sprite(utils.TextureCache["assets/images/background/Layer_0011_0.png"]);
        this.layer_02 = new Sprite(utils.TextureCache["assets/images/background/Layer_0010_1.png"]);
        this.layer_03 = new Sprite(utils.TextureCache["assets/images/background/Layer_0009_2.png"]);
        this.layer_04 = new Sprite(utils.TextureCache["assets/images/background/Layer_0008_3.png"]);
        this.layer_05 = new Sprite(utils.TextureCache["assets/images/background/Layer_0007_Lights.png"]);
        this.layer_06 = new Sprite(utils.TextureCache["assets/images/background/Layer_0006_4.png"]);
        this.layer_07 = new Sprite(utils.TextureCache["assets/images/background/Layer_0005_5.png"]);
        this.layer_08 = new Sprite(utils.TextureCache["assets/images/background/Layer_0004_Lights.png"]);
        this.layer_09 = new Sprite(utils.TextureCache["assets/images/background/Layer_0003_6.png"]);
        this.layer_10 = new Sprite(utils.TextureCache["assets/images/background/Layer_0002_7.png"]);
        this.layer_11 = new Sprite(utils.TextureCache["assets/images/background/Layer_0001_8.png"]);
        this.layer_12 = new Sprite(utils.TextureCache["assets/images/background/Layer_0000_9.png"]);

        this.setup();

        this.addChild(this.layer_01);
        this.addChild(this.layer_02);
        this.addChild(this.layer_03);
        this.addChild(this.layer_04);
        this.addChild(this.layer_05);
        this.addChild(this.layer_06);
        this.addChild(this.layer_07);
        this.addChild(this.layer_08);
        this.addChild(this.layer_09);
        this.addChild(this.layer_10);
        this.addChild(this.layer_11);
        this.addChild(this.layer_12);
    }

    setup() {
        this.layer_01.position.set(0, 0);
        this.layer_01.width = GameConstant.SCREEN_WIDTH;
        this.layer_01.height = GameConstant.SCREEN_HEIGHT;

        this.layer_02.position.set(0, 0);
        this.layer_02.width = GameConstant.SCREEN_WIDTH;
        this.layer_02.height = GameConstant.SCREEN_HEIGHT;

        this.layer_03.position.set(0, 0);
        this.layer_03.width = GameConstant.SCREEN_WIDTH;
        this.layer_03.height = GameConstant.SCREEN_HEIGHT;

        this.layer_04.position.set(0, 0);
        this.layer_04.width = GameConstant.SCREEN_WIDTH;
        this.layer_04.height = GameConstant.SCREEN_HEIGHT;

        this.layer_05.position.set(0, 0);
        this.layer_05.width = GameConstant.SCREEN_WIDTH;
        this.layer_05.height = GameConstant.SCREEN_HEIGHT;

        this.layer_06.position.set(0, 0);
        this.layer_06.width = GameConstant.SCREEN_WIDTH;
        this.layer_06.height = GameConstant.SCREEN_HEIGHT;

        this.layer_07.position.set(0, 0);
        this.layer_07.width = GameConstant.SCREEN_WIDTH;
        this.layer_07.height = GameConstant.SCREEN_HEIGHT;

        this.layer_08.position.set(0, 0);
        this.layer_08.width = GameConstant.SCREEN_WIDTH;
        this.layer_08.height = GameConstant.SCREEN_HEIGHT;

        this.layer_09.position.set(0, 0);
        this.layer_09.width = GameConstant.SCREEN_WIDTH;
        this.layer_09.height = GameConstant.SCREEN_HEIGHT;

        this.layer_10.position.set(0, 0);
        this.layer_10.width = GameConstant.SCREEN_WIDTH;
        this.layer_10.height = GameConstant.SCREEN_HEIGHT;

        this.layer_11.position.set(0, 0);
        this.layer_11.width = GameConstant.SCREEN_WIDTH;
        this.layer_11.height = GameConstant.SCREEN_HEIGHT;

        this.layer_12.position.set(0, 0);
        this.layer_12.width = GameConstant.SCREEN_WIDTH;
        this.layer_12.height = GameConstant.SCREEN_HEIGHT;

    }
}