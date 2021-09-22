function setup() {
    createCanvas(windowWidth, windowHeight);
    //noCursor();
    slider = createSlider(30, 200, 50);
    slider.position(windowWidth * 0.98 - slider.width, windowHeight * 0.94 - slider.height);
    slider.style('height', '80px');
}

function draw() {
    background(220);
    createGrid(slider.value());

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createGrid(zoom) {
    for (var i = 10; i < width; i += zoom) {

        for (var j = 10; j < height; j += zoom) {
            circle(i, j, zoom * 0.06);
        }

    }
}