import { Container, Text, TextStyle } from "pixi.js";
import data from "../../public/assets/levels/level.json";
import { LevelLoader } from "./level_loader";
import { GameManager } from "../managers/game_manager";
import { StartMenu, StartMenuEvent } from "../scene/start_menu";
import { RestartMenu } from "../scene/restart_menu";
import { NextMenu } from "../scene/next_menu";
import { EndMenu } from "../scene/end_menu";

export class LevelManager extends Container {
    constructor() {
        super();

        this.currentLevel = 1;
        this.dataLevel = null;
        this.dataLoaded = null;

        this.isStopGame = false;
        this.statusGame = "startMenu";
        this.isEndGame = false;

        this.load();
        this._init();

        this.textStyle = new TextStyle({
            fill: "#022c6e",
            fontFamily: "Times New Roman",
            fontSize: 40,
            fontWeight: 600
        });

        this.displayLevel = new Text("Level: " + this.currentLevel, this.textStyle);
        this.addChild(this.displayLevel);

        // this.checkEventEmitter();
    }

    load() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.dataLoaded = this.levelLoader.getData();
    }

    _init() {
        this.gameManager = new GameManager(this.dataLoaded);
        this.gameManager.visible = false;
        this.isStopGame = true;
        this.addChild(this.gameManager);

        this.startMenu = new StartMenu();
        this.startMenu.visible = true;
        this.addChild(this.startMenu);

        this.restartMenu = new RestartMenu();
        this.restartMenu.visible = false;
        this.addChild(this.restartMenu);
        this._registerEventStartMenu();

        this.nextMenu = new NextMenu();
        this.nextMenu.visible = false;
        this.addChild(this.nextMenu);

        this.endMenu = new EndMenu();
        this.endMenu.visible = false;
        this.addChild(this.endMenu);
    }

    _registerEventStartMenu() {
        this.startMenu.on(StartMenuEvent.ButtonClicked, this._startGame, this);
    }

    _startGame() {
        this.isStopGame = false;
        this.gameManager.visible = true;
        this.restartMenu.visible = false;
        this.startMenu.visible = false;
        this.nextMenu.visible = false;
        this.endMenu.visible = false;
    }

    update(delta) {
        this.displayLevel.text = "Level: " + this.currentLevel;
        if (this.isStopGame == false && this.currentLevel <= 3) {
            this.statusGame = this.gameManager.update(delta);
        }
        // this.checkStatusGame();
    }

    remove() {
        this.removeChild(this.gameManager);
    }

    create() {
        this.gameManager = new GameManager(this.dataLoaded);
        this.gameManager.visible = true;
        this.isStopGame = false;
        this.addChild(this.gameManager);
    }

    createNewLevel() {
        this.currentLevel += 1;
        this.load();
        this.create();
    }

    checkStatusGame() {
        switch (this.statusGame) {
            case "startMenu":
                this.gameManager.visible = false;
                this.startMenu.visible = true;
                this.restartMenu.visible = false;
                this.nextMenu.visible = false;
                this.endMenu.visible = false;
                this.startMenu.onCollision();
                break;
            case "startGame":
                this.isStopGame = false;
                this.gameManager.visible = true;
                this.restartMenu.visible = false;
                this.startMenu.visible = false;
                this.nextMenu.visible = false;
                this.endMenu.visible = false;
                break;
            case "loss":
                this.isStopGame = true;
                this.gameManager.visible = false;
                this.startMenu.visible = false;
                this.restartMenu.visible = true;
                this.nextMenu.visible = false;
                this.endMenu.visible = false;
                this.restartMenu.onCollision();
                break;
            case "restartGame":
                this.isStopGame = false;
                this.startMenu.visible = false;
                this.restartMenu.visible = false;
                this.nextMenu.visible = false;
                this.endMenu.visible = false;
                this.remove();
                this.create();
                break;
            case "win":
                if (this.currentLevel < 3) {
                    this.isStopGame = true;
                    this.gameManager.visible = false;
                    this.startMenu.visible = false;
                    this.restartMenu.visible = false;
                    this.nextMenu.visible = true;
                    this.endMenu.visible = false;
                    this.nextMenu.onCollision();
                } else {
                    this.isStopGame = true;
                    this.gameManager.visible = false;
                    this.startMenu.visible = false;
                    this.restartMenu.visible = false;
                    this.endMenu.visible = true;
                    this.endMenu.onCollision();
                }
                break;
            case "nextGame":
                this.isStopGame = false;
                this.startMenu.visible = false;
                this.restartMenu.visible = false;
                this.nextMenu.visible = false;
                this.remove();
                this.createNewLevel();
                break;
            default:
                break;
        }
    }

    checkEventEmitter() {
        this.startMenu.on("start", () => {
            this.statusGame = "startGame";
        });
        this.restartMenu.on("restart", () => {
            this.statusGame = "restartGame";
        });
        this.nextMenu.on("restartLevel", () => {
            this.statusGame = "restartGame";
        });
        this.nextMenu.on("nextLevel", () => {
            this.statusGame = "nextGame";
        });
        this.endMenu.on("restartLevel", () => {
            this.statusGame = "restartGame";
        });
    }

}