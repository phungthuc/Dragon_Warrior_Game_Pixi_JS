import { Container, ParticleContainer, Point, Sprite, resources, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { Emitter, Particle } from "pixi-particles";
import * as  particleSettings from "../emitter.json";

export class DragonFire extends Container {
    constructor(xP, yP, dataDragon) {
        super();

        this.dragonFire = new Sprite(utils.TextureCache["assets/images/dragon/iblast_02.png"]);

        this.xP = xP;
        this.yP = yP;
        this.dataDragon = dataDragon;

        this.dragonFire.width = this.dataDragon.w;
        this.dragonFire.height = this.dataDragon.h;

        this.setPosition();
        this.addChild(this.dragonFire);

        this.particleContainer = new ParticleContainer();
        this.addChild(this.particleContainer);

        this.emitter = new Emitter(this.particleContainer, utils.TextureCache["assets/images/dragon/particle.png"], particleSettings);

    }

    update(delta) {
        this.dragonFire.x += this.dataDragon.velocity;
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