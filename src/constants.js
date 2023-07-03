export const GameConstant = {
    //Screen
    SCREEN_WIDTH: 1080,
    SCREEN_HEIGHT: 720,
    X_MESS: 380,
    Y_MESS: 320,

    //Event
    EVENT_WIN_GAME: "gameWin",
    EVENT_LOSS_GAME: "lossGame",
    EVENT_DONE_PIPE: "donePipe",
    EVENT_DRAGON_FLAP: "flap",

    //Boss
    BOSS_WIDTH: 304,
    BOSS_HEIGHT: 336,
    BOSS_X: 760,
    BOSS_Y: 340,
    EXPLOSION_X: 760,
    EXPLOSION_Y: 400,

    //Dragon
    DRAGON_WIDTH: 256,
    DRAGON_HEIGHT: 128,
    DRAGON_VY: 0,
    GRAVITY: 9.81,
    MAX_ACCELERATION: 16,
    FORCE: -8,
    ACCELERATION_SCALE: 0.05,

    //Dragon Fire
    DRAGON_FIRE_WIDTH: 72,
    DRAGON_FIRE_HEIGHT: 30,
    DRAGON_FIRE_SPEED: 5,

    //Boss Fire
    BOSS_FIRE_WIDTH: 72,
    BOSS_FIRE_HEIGHT: 30,
    BOSS_FIRE_SPEED: 5,
    BOSS_FIRE_ANGLE: Math.PI / 18,
    BOSS_FIRE_VY: Math.PI / 4,
    BOSS_FIRE_QUANTITY: 6,


    //Pipe
    PIPE_WIDTH: 52,
    PIPE_HEIGHT: 640,
    DISTANCE_PIPE: 160,
    PIPE_X: 1080,
    PIPE_VX: 3,
    PIPE_QUANTITY: 5,
};