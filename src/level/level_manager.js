import { Container } from "pixi.js";
import data from "../../public/assets/levels/level.json";
import { LevelLoader } from "./level_loader";
import { GameManager } from "../managers/game_manager";

export class LevelManager extends Container {
    constructor() {
        super();

        this.currentLevel = 1;
        this.dataLevel = null;
        this.dataLoaded = null;

        this.load();
        this._init();
    }

    load() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.dataLoaded = this.levelLoader.getData();
    }

    _init() {
        this.gameManager = new GameManager(this.dataLoaded);
        this.addChild(this.gameManager);
    }

    update(delta) {
        return this.gameManager.update(delta);
    }
}