function setup() {
    createCanvas(windowWidth, windowHeight);
    //noCursor();
    print(windowHeight);
}

function draw() {
    background(220);
    createGrid(50);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createGrid(zoom) {
    for (var i = 10; i < width; i += zoom) {

        for (var j = 10; j < height; j += zoom) {
            circle(i, j, 3);
        }

    }
}