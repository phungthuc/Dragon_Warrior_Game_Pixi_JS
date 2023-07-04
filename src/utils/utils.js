export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calcDistance(x1, y1, x2 = undefined, y2 = undefined) {
    if (x2 && y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    else {
        return Math.sqrt(x1 ** 2 + y1 ** 2);
    }
}

export function calcVector(x1, y1, x2, y2) {
    return {
        x: x2 - x1,
        y: y2 - y1
    }
}

export function calcAngle(x1, y1, x2, y2) {
    let dot = dotProduct(x1, y1, x2, y2);
    let d1 = calcDistance(x1, y1);
    let d2 = calcDistance(x2, y2);
    let cosAlpha = dot / (d1 * d2);
    return Math.acos(cosAlpha)
}

export function dotProduct(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
}

export function rotate(x, y, theta) {
    return {
        x: x * Math.cos(theta) - y * Math.sin(theta),
        y: x * Math.sin(theta) + y * Math.cos(theta),
    }
}


export function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
}

