function generator(matLen, gr, grEat, pred, mush, poi) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < mush; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < poi; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }

    return matrix;
}

let side = 20;

let matrix = generator(30, 80, 25, 25, 25, 4);
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let mushArr = []
let poisonArr = []
function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(8)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                grassEaterArr.push(gre)
            } else if (matrix[y][x] == 3) {
                let gre = new Predator(x, y)
                predatorArr.push(gre)
            } else if (matrix[y][x] == 4) {
                let gr = new Mush(x, y)
                mushArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Poison(x, y)
                poisonArr.push(gr)
            }
        }
    }
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 3) {
                fill("blue");
            }
            else if (matrix[y][x] == 2) {
                fill("lightblue");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 4) {
                fill("red");
            } else if (matrix[y][x] == 5) {
                fill("black");

            } rect(x * side, y * side, side, side);
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    for (let i in mushArr) {
        mushArr[i]
    }
}

