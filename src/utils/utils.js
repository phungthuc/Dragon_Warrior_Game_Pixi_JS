const EventEmitter = require("events");

export const eventEmitter = new EventEmitter();

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
