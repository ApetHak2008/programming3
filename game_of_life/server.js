var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
});

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

 matrix = generator(30, 80, 25, 25, 25, 4);

io.sockets.emit('send matrix', matrix);

 grassArr = []
 grassEaterArr = []
 predatorArr = []
 mushArr = []
 poisonArr = []

weath = "winter";

const Grass = require("./Grass");
const GrassEater = require("./GrassEater");
const Predator = require("./Predator");
const Mush = require("./Mush")
const Poison = require("./Poison")

function createObject() {
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
    io.sockets.emit('send matrix', matrix)
}



function game(){
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

    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 300)

function AddGrass(){
    for (let i = 0; i < 8; i++) {
        let x = Math.floor(Math.random() * 30);
        let y = Math.floor(Math.random() * 30);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddGrassEater(){
    for (let i = 0; i < 8; i++) {
        let x = Math.floor(Math.random() * 30);
        let y = Math.floor(Math.random() * 30);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
            var grEat = new GrassEater(x, y)
            grassEaterArr.push(grEat)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddPredator(){
    for (let i = 0; i < 8; i++) {
        let x = Math.floor(Math.random() * 30);
        let y = Math.floor(Math.random() * 30);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
            var pred = new Predator(x, y)
            predatorArr.push(pred)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddMush(){
    for (let i = 0; i < 8; i++) {
        let x = Math.floor(Math.random() * 30);
        let y = Math.floor(Math.random() * 30);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
            var mush = new Mush(x, y)
            mushArr.push(mush)
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function AddPoison(){
    for (let i = 0; i < 8; i++) {
        let x = Math.floor(Math.random() * 30);
        let y = Math.floor(Math.random() * 30);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
            var poi = new Poison(x, y)
            poisonArr.push(poi)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function Restart() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather,3000)

io.on('connection', function(socket) {
    createObject();
    socket.on("add grass",AddGrass)
    socket.on("add grassEater",AddGrassEater)
    socket.on("add predator",AddPredator)
    socket.on("add mush",AddMush)
    socket.on("add poison",AddPoison)
    socket.on("restart",Restart)
});


