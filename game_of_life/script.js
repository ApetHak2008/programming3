var socket = io();
side = 20;
weath = "summer";

// function AddGrass(){

// }
// function AddGrassEater(){
// }
// function AddPredator(){
// }
// function AddMush(){
// }
// function AddPoison(){
// }
// function Restart(){
// }

function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');
    frameRate(8)

}

socket.on("weather", function (data) {
    weath = data
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weath == "winter") { 
                    fill("white");
                 }
                 else if (weath == "summer") {
                    fill("orange")
                } else if (weath == "autumn") {
                    fill("darkgreen")
                } else if (weath == "spring") {
                    fill("ligthgreen")
                }
            } else if (matrix[y][x] == 3) {
                if(weath == "winter"){
                    fill("blue");
                }else if(weath == "summer"){
                    fill("aqua")
                }else if(weath == "autumn"){
                    fill("#9E8CF0")
                }else if(weath == "spring"){
                    fill("blueviolet")
                }
             
            } else if (matrix[y][x] == 2) {
                if(weath == "winter"){ 
                    fill("lightblue");
                }else if(weath == "summer"){
                    fill("blue")
                }else if(weath == "autumn"){
                    fill("yellow")
                }else if(weath == "spring"){
                    fill("orange")
                }
               
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

function AddGrass() {
    socket.emit("add grass")
}
function AddGrassEater() {
    socket.emit("add grassEater")
}
function AddPredator() {
    socket.emit("add predator")
}
function AddMush() {
    socket.emit("add mush")
}
function AddPoison() {
    socket.emit("add poison")
}
function Restart() {
    socket.emit("restart")
}