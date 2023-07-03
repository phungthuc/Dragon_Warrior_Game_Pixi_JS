import { GameConstant } from "../constants";

export default class DragonCollisder {
    constructor() {

    }

    wallCollision(y) {
        if (y < 0) {
            return "top";
        } else if (y > GameConstant.SCREEN_HEIGHT - GameConstant.DRAGON_HEIGHT - 32) {
            return "bottom"
        }
    }
}