import { Container, Sprite, Text, TextStyle, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { RectangleCollider } from "../collision/rectangle_collider";

export class Boss extends Container {
    constructor() {
        super();

        this.boss = new Sprite(utils.TextureCache["assets/images/boss/cc2d_body_0070.png"]);

        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 30,
            fill: "white"
        });

        this.boss.width = GameConstant.BOSS_WIDTH;
        this.boss.height = GameConstant.BOSS_HEIGHT;

        this.health = 100;
        this.messHealth = new Text(this.health, this.style);

        this.setPosition();

        this.addChild(this.boss);
        this.addChild(this.messHealth);

        this.rectCollisder = new RectangleCollider();
    }

    update(delta, pipeShot) {
        this.messHealth.text = this.health;
        this.updateHealth(pipeShot);
    }

    setPosition() {
        this.boss.position.set(GameConstant.BOSS_X, GameConstant.BOSS_Y);
        this.messHealth.position.set(820, 300)
    }

    updateHealth(pipeShot) {
        if (this.health == 0) {
            this.emit(GameConstant.EVENT_WIN_GAME);
        }
        if (pipeShot == "boss") {
            this.health -= 1;
        }
    }

}