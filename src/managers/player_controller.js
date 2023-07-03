import { GameConstant } from "../constants";
import { eventEmitter } from "../utils/utils";

export default class PlayerController {
    constructor() {
        window.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp(event) {
        if (event.keyCode == 32) {
            eventEmitter.emit(GameConstant.EVENT_DRAGON_FLAP);
        }
    }
}