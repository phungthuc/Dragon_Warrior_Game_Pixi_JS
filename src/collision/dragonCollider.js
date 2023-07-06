import { GameConstant } from "../constants";

export class DragonCollider {
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