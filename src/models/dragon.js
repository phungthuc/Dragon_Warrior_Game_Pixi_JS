import { AnimatedSprite, Container, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { eventEmitter } from "../utils/utils";
import DragonCollider from "../collision/dragon_collider";
import RectangleCollider from "../collision/rectangle_collider";

export default class Dragon extends Container {
    constructor() {
        super();

        this.acceleration = 0;

        this.dragon_01 = new Sprite(utils.TextureCache["assets/images/dragon/strike_01.png"]);
        this.dragon_02 = new Sprite(utils.TextureCache["assets/images/dragon/strike_02.png"]);
        this.dragon_03 = new Sprite(utils.TextureCache["assets/images/dragon/strike_03.png"]);
        this.dragon_04 = new Sprite(utils.TextureCache["assets/images/dragon/strike_04.png"]);
        this.dragon_05 = new Sprite(utils.TextureCache["assets/images/dragon/strike_05.png"]);

        this.textures = [
            this.dragon_01.texture,
            this.dragon_02.texture,
            this.dragon_03.texture,
            this.dragon_04.texture,
            this.dragon_05.texture
        ];

        this.animatedSprite = new AnimatedSprite(this.textures);
        this.animatedSprite.width = GameConstant.DRAGON_WIDTH;
        this.animatedSprite.height = GameConstant.DRAGON_HEIGHT;
        this.animatedSprite.position.set(0, GameConstant.SCREEN_HEIGHT / 2 - GameConstant.DRAGON_HEIGHT);
        this.vy = GameConstant.DRAGON_VY;

        this.animatedSprite.animationSpeed = 0.12;
        this.animatedSprite.loop = true;

        this.addChild(this.animatedSprite);

        this.animatedSprite.play();

        this.checkEventEmitter();

        this.dragonCollisder = new DragonCollider();
        this.rectCollider = new RectangleCollider();
    }

    update(delta, pipesPosition) {
        this.acceleration += delta * GameConstant.GRAVITY * GameConstant.ACCELERATION_SCALE;
        if (this.acceleration > GameConstant.MAX_ACCELERATION) {
            this.acceleration = GameConstant.MAX_ACCELERATION
        }
        this.animatedSprite.y += this.acceleration;

        this.onCollision(pipesPosition);
    }

    setPosition() {

    }

    getPosition() {
        return [
            this.animatedSprite.x,
            this.animatedSprite.y
        ];
    }

    onCollision(pipesPosition) {
        if (this.dragonCollisder.wallCollision(this.animatedSprite.y) == "top") {
            this.animatedSprite.y = 0;
        } else if (this.dragonCollisder.wallCollision(this.animatedSprite.y) == "bottom") {
            this.animatedSprite.y = GameConstant.SCREEN_HEIGHT - GameConstant.DRAGON_HEIGHT - 32;
        }

        pipesPosition.forEach(pipePosition => {
            if (this.rectCollider.checkCollision(this.animatedSprite.x + GameConstant.DRAGON_WIDTH / 3,
                this.animatedSprite.y + GameConstant.DRAGON_HEIGHT / 2, GameConstant.DRAGON_WIDTH / 3, GameConstant.DRAGON_HEIGHT / 2,
                pipePosition.xTop, pipePosition.yTop - 20, GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT) != null ||
                this.rectCollider.checkCollision(this.animatedSprite.x + GameConstant.DRAGON_WIDTH / 3,
                    this.animatedSprite.y + GameConstant.DRAGON_HEIGHT / 2, GameConstant.DRAGON_WIDTH / 3, GameConstant.DRAGON_HEIGHT / 2,
                    pipePosition.xBottom, pipePosition.yBottom + 20, GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT) != null) {
                eventEmitter.emit(GameConstant.EVENT_LOSS_GAME);
            }
        });
    }

    checkEventEmitter() {
        eventEmitter.on(GameConstant.EVENT_DRAGON_FLAP, () => {
            this.acceleration = GameConstant.FORCE;
        });
    }
}