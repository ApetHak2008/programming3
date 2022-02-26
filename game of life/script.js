var socket = io();
side = 20;


function AddGrass(){
    
}
function AddGrassEater(){
}
function AddPredator(){
}
function AddMush(){
}
function AddPoison(){
}
function Restart(){
}
   
function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');
    frameRate(8)
    
}
function nkarel(matrix) {
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

    
}

    socket.on('send matrix', nkarel)
