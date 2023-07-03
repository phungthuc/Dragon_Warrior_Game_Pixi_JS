import { eventEmitter } from "../utils/utils";

export default class PlayerController {
    constructor() {
        window.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp(event) {
        if (event.keyCode == 32) {
            eventEmitter.emit("flap");
        }
    }
}