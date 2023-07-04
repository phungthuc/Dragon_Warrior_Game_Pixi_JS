import { Container } from "pixi.js";
import { DragonFire } from "../models/dragon_fire";
import { GameConstant } from "../constants";
import { RectangleCollider } from "../collision/rectangle_collider";
import { PipeManagerEvent } from "./pipe_manager";

export class DragonFireManager extends Container {
    constructor(pipeContainer) {
        super();

        this.pipeContainer = pipeContainer;

        this.offsetX = null;
        this.offsetY = null;
        this.dragonX = null;
        this.dragonY = null;

        this.dragonFires = [];
        this.pipeShot = [];
        this.isDonePipe = false;
        this.rectCollider = new RectangleCollider();

        window.addEventListener("mouseup", this.onMouseUp.bind(this), false);

        this.checkEventEmitter();
    }

    _init() {
        this.dragonFire = new DragonFire(this.dragonX, this.dragonY);
        this.addChild(this.dragonFire);
        this.dragonFires.push(this.dragonFire);
    }

    update(delta, dragonX, dragonY, pipePosition) {
        this.dragonX = dragonX + GameConstant.DRAGON_WIDTH - 72;
        this.dragonY = dragonY + GameConstant.DRAGON_HEIGHT / 2;

        this.pipeShot = this.onCollision(pipePosition);

        if (this.dragonFires != null) {
            for (let i = 0; i < this.dragonFires.length; i++) {
                if (this.dragonFires[i].update(delta)) {
                    this.dragonFires.splice(i, 1);
                }
            }
        }
        return this.pipeShot;
    }

    onMouseUp(event) {
        if (event.which == 1) {
            this._init();
        }
    }

    onCollision(pipePosition) {
        if (this.isDonePipe == false) {
            for (let i = 0; i < this.dragonFires.length; i++) {
                for (let j = 0; j < pipePosition.length; j++) {
                    if (this.dragonFires[i] != null) {
                        if (this.rectCollider.checkCollision(this.dragonFires[i].getPosition()[0], this.dragonFires[i].getPosition()[1],
                            GameConstant.DRAGON_FIRE_WIDTH, GameConstant.DRAGON_FIRE_HEIGHT, pipePosition[j].xTop, pipePosition[j].yTop,
                            GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT) != null) {
                            this.dragonFires[i].enableParticle();
                            this.dragonFires.splice(i, 1);
                            return [
                                "top",
                                j
                            ];
                        } else if (this.rectCollider.checkCollision(this.dragonFires[i].getPosition()[0], this.dragonFires[i].getPosition()[1],
                            GameConstant.DRAGON_FIRE_WIDTH, GameConstant.DRAGON_FIRE_HEIGHT, pipePosition[j].xBottom, pipePosition[j].yBottom,
                            GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT) != null) {
                            this.dragonFires[i].enableParticle();
                            this.dragonFires.splice(i, 1);
                            return [
                                "bottom",
                                j
                            ]
                        }

                    }
                }
            }
        } else {
            for (let i = 0; i < this.dragonFires.length; i++) {
                if (this.rectCollider.checkCollision(this.dragonFires[i].getPosition()[0], this.dragonFires[i].getPosition()[1],
                    GameConstant.DRAGON_FIRE_WIDTH, GameConstant.DRAGON_FIRE_HEIGHT, GameConstant.BOSS_X + GameConstant.DRAGON_FIRE_WIDTH, GameConstant.BOSS_Y, GameConstant.BOSS_WIDTH, GameConstant.BOSS_HEIGHT) != null) {
                    this.dragonFires[i].enableParticle();
                    this.dragonFires.splice(i, 1);
                    return "boss";
                }
            }
        }
    }

    checkEventEmitter() {
        this.pipeContainer.on(PipeManagerEvent.EVENT_DONE_PIPE, () => {
            this.isDonePipe = true;
        });
    }
}