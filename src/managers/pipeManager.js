import { Container } from "pixi.js";
import { GameConstant } from "../constants";
import { Pipe } from "../models/pipe";

export const PipeManagerEvent = Object.freeze({
    EVENT_DONE_PIPE: "pipemanager:done",
});

export class PipeManager extends Container {
    constructor(numPipe, distancePipes, dataPipes) {
        super();

        this.numPipe = numPipe;
        this.dataPipes = dataPipes;
        this.distancePipes = distancePipes;

        this.pipes = [];
        this.pipesPosition = [];
        this._init();
        this.countPipe = 1;
        this.isDone = false;
    }

    _init() {
        this.pipe = new Pipe(this.distancePipes, this.dataPipes[0].x, this.dataPipes[0].y_bottom, this.dataPipes[0].w,
            this.dataPipes[0].h, this.dataPipes[0].velocity, this.dataPipes[0].health);
        this.addChild(this.pipe);
        this.pipes.push(this.pipe);
        this.pipesPosition.push({
            xTop: this.pipe.getPosition()[0],
            yTop: this.pipe.getPosition()[1],
            xBottom: this.pipe.getPosition()[2],
            yBottom: this.pipe.getPosition()[3]
        });
    }

    update(delta, pipeShot) {
        if (pipeShot != undefined) {
            this.pipes[pipeShot[1]].updateHealth(pipeShot[0]);
        }

        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].update(delta);

            this.pipesPosition[i].xTop = this.pipes[i].getPosition()[0];
            this.pipesPosition[i].yTop = this.pipes[i].getPosition()[1];
            this.pipesPosition[i].xBottom = this.pipes[i].getPosition()[2];
            this.pipesPosition[i].yBottom = this.pipes[i].getPosition()[3];

            if (this.pipes[i].getExistencePipe()[0] == false) {
                this.pipesPosition[i].xTop = null;
                this.pipesPosition[i].xTop = null;
            } else if (this.pipes[i].getExistencePipe()[1] == false) {
                this.pipesPosition[i].xBottom = null;
                this.pipesPosition[i].xBottom = null;
            }
        }

        this.addPipe();

        this.remove();

    }

    create() {
        this.pipe = new Pipe(this.distancePipes, this.dataPipes[this.countPipe].x, this.dataPipes[this.countPipe].y_bottom, this.dataPipes[this.countPipe].w,
            this.dataPipes[this.countPipe].h, this.dataPipes[this.countPipe].velocity, this.dataPipes[this.countPipe].health);
        this.addChild(this.pipe);
        this.pipes.push(this.pipe);
        this.pipesPosition.push({
            xTop: this.pipe.getPosition()[0],
            yTop: this.pipe.getPosition()[1],
            xBottom: this.pipe.getPosition()[2],
            yBottom: this.pipe.getPosition()[3]
        });
    }

    getPosition() {
        return this.pipesPosition;
    }

    getCountPipe() {
        return this.countPipe;
    }

    addPipe() {
        if (this.countPipe < this.numPipe) {
            if (this.pipesPosition[this.pipes.length - 1].xTop < GameConstant.SCREEN_WIDTH / 2 &&
                this.pipesPosition[this.pipes.length - 1].xBottom < GameConstant.SCREEN_WIDTH / 2) {
                this.create();
                this.countPipe += 1;
            }
        } else if (this.isDone == false && this.pipesPosition[this.pipes.length - 1].xTop < -GameConstant.PIPE_WIDTH ||
            this.isDone == false && this.pipesPosition[this.pipes.length - 1].xBottom < -GameConstant.PIPE_WIDTH) {
            this.emit(PipeManagerEvent.EVENT_DONE_PIPE);
            this.isDone = true;
        }
    }

    remove() {
        for (let i = 0; i < this.pipes.length; i++) {
            if (this.pipesPosition[i].xTop < - GameConstant.PIPE_WIDTH) {
                this.removeChild(this.pipes[i]);
                this.pipes.splice(i, 1);
                this.pipesPosition.splice(i, 1);
            }
        }
    }
}