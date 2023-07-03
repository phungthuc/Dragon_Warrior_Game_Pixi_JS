import { Container, ParticleContainer, Point, Sprite, resources, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { Emitter, Particle } from "pixi-particles";
import * as  particleSettings from "../emitter.json";

export class DragonFire extends Container {
    constructor(xP, yP) {
        super();

        this.dragonFire = new Sprite(utils.TextureCache["assets/images/dragon/iblast_02.png"]);

        this.dragonFire.width = GameConstant.DRAGON_FIRE_WIDTH;
        this.dragonFire.height = GameConstant.DRAGON_FIRE_HEIGHT;

        this.xP = xP;
        this.yP = yP;

        this.setPosition();
        this.addChild(this.dragonFire);

        this.particleContainer = new ParticleContainer();
        this.addChild(this.particleContainer);

        this.emitter = new Emitter(this.particleContainer, utils.TextureCache["assets/images/dragon/particle.png"], particleSettings);

    }

    update(delta) {
        this.dragonFire.x += GameConstant.DRAGON_FIRE_SPEED;
        if (this.dragonFire.x > GameConstant.SCREEN_HEIGHT + GameConstant.DRAGON_WIDTH) {
            this.removeChild(this.dragonFire);
            return true;
        }

        return false;
    }

    setPosition() {
        this.dragonFire.position.set(this.xP, this.yP);
    }

    getPosition() {
        return [
            this.dragonFire.x,
            this.dragonFire.y
        ];
    }

    enableParticle() {
        this.dragonFire.visible = false;
        this.emitter.autoUpdate = true;
        this.emitter.updateSpawnPos(this.dragonFire.x, this.dragonFire.y);
        this.emitter.emit = true;
    }
}