import { Container, Text, TextStyle } from "pixi.js";
import data from "../../public/assets/levels/level.json";
import { LevelLoader } from "./levelLoader";
import { GameManager, GameManagerEvents } from "../managers/gameManager";
import { StartMenu, StartMenuEvent } from "../scene/startMenu";
import { RestartMenu, RestartMenuEvent } from "../scene/restartMenu";
import { NextMenu, NextMenuEvents } from "../scene/nextMenu";
import { EndMenu, EndMenuEvent } from "../scene/endMenu";

export class LevelManager extends Container {
    constructor() {
        super();

        this.currentLevel = 1;
        this.dataLevel = null;
        this.dataLoaded = null;

        this.isStopGame = false;
        this.statusGame = "startMenu";
        this.isEndGame = false;

        this._load();
        this._init();

        this.textStyle = new TextStyle({
            fill: "#022c6e",
            fontFamily: "Times New Roman",
            fontSize: 40,
            fontWeight: 600
        });

        this.displayLevel = new Text("Level: " + this.currentLevel, this.textStyle);
        this.addChild(this.displayLevel);
    }

    _load() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.dataLoaded = this.levelLoader.getData();
    }

    _init() {
        this.gameManager = new GameManager(this.dataLoaded);
        this.gameManager.visible = false;
        this.isStopGame = true;
        this.addChild(this.gameManager);
        this._registerEventGameManager();

        this.startMenu = new StartMenu();
        this.startMenu.visible = true;
        this.addChild(this.startMenu);
        this._registerEventStartMenu();

        this.restartMenu = new RestartMenu();
        this.restartMenu.visible = false;
        this.addChild(this.restartMenu);
        this._registerEventRestartMenu();

        this.nextMenu = new NextMenu();
        this.nextMenu.visible = false;
        this.addChild(this.nextMenu);
        this._registerEventNextMenu();

        this.endMenu = new EndMenu();
        this.endMenu.visible = false;
        this.addChild(this.endMenu);
        this._registerEventEndMenu();
    }

    _registerEventGameManager() {
        this.gameManager.on(GameManagerEvents.EVENT_LOSS_GAME, this._lossGame, this);
        this.gameManager.on(GameManagerEvents.EVENT_WIN_GAME, this._winGame, this);
    }

    _registerEventStartMenu() {
        this.startMenu.on(StartMenuEvent.ButtonClicked, this._startGame, this);
    }

    _registerEventRestartMenu() {
        this.restartMenu.on(RestartMenuEvent.ButtonClicked, this._restartLevel, this);
    }

    _registerEventNextMenu() {
        this.nextMenu.on(NextMenuEvents.ButtonRestartLevelOnClicked, this._restartLevel, this);
        this.nextMenu.on(NextMenuEvents.ButtonNextLevelOnClicked, this._nextLevel, this);
    }

    _registerEventEndMenu() {
        this.endMenu.on(EndMenuEvent.ButtonClicked, this._restartLevel, this);
    }

    _lossGame() {
        this.isStopGame = true;
        this.gameManager.visible = false;
        this.startMenu.visible = false;
        this.restartMenu.visible = true;
        this.nextMenu.visible = false;
        this.endMenu.visible = false;
    }

    _winGame() {
        if (this.currentLevel < 3) {
            this.isStopGame = true;
            this.gameManager.visible = false;
            this.startMenu.visible = false;
            this.restartMenu.visible = false;
            this.nextMenu.visible = true;
            this.endMenu.visible = false;
        } else {
            this.isStopGame = true;
            this.gameManager.visible = false;
            this.startMenu.visible = false;
            this.restartMenu.visible = false;
            this.endMenu.visible = true;
        }
    }

    _startGame() {
        this.isStopGame = false;
        this.gameManager.visible = true;
        this.restartMenu.visible = false;
        this.startMenu.visible = false;
        this.nextMenu.visible = false;
        this.endMenu.visible = false;
    }

    _restartLevel() {
        this.isStopGame = false;
        this.startMenu.visible = false;
        this.restartMenu.visible = false;
        this.nextMenu.visible = false;
        this.endMenu.visible = false;
        this._remove();
        this._create();
    }

    _nextLevel() {
        this.isStopGame = false;
        this.startMenu.visible = false;
        this.restartMenu.visible = false;
        this.nextMenu.visible = false;
        this._remove();
        this._createNewLevel();
    }

    update(delta) {
        this.displayLevel.text = "Level: " + this.currentLevel;
        if (this.isStopGame == false && this.currentLevel <= 3) {
            this.statusGame = this.gameManager.update(delta);
        }
    }

    _remove() {
        this.removeChild(this.gameManager);
    }

    _create() {
        this.gameManager = new GameManager(this.dataLoaded);
        this.gameManager.visible = true;
        this.isStopGame = false;
        this._registerEventGameManager();
        this.addChild(this.gameManager);
    }

    _createNewLevel() {
        this.currentLevel += 1;
        this._load();
        this._create();
    }
}