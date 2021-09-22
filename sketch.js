function setup() {
    createCanvas(windowWidth, windowHeight);
    //noCursor();
    zoomSlider = createSlider(30, 200, 50);
    zoomSlider.position(windowWidth * 0.98 - zoomSlider.width, windowHeight * 0.94 - zoomSlider.height);
    zoomSlider.style('height', '80px');
    grid = [];
}

function draw() {
    background(220);
    createGrid(zoomSlider.value(), 8);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createGrid(zoom, maxSize) {
    for (var i = 10; i < width; i += zoom) {

        for (var j = 10; j < height; j += zoom) {
            grid.push(circle(i, j, zoom * 0.06 + getSizeToGrow(i, j, maxSize)));
        }

    }
}

function getSizeToGrow(x, y, maxSize) {
    var distance = dist(x, y, mouseX, mouseY);
    var res = 200 / distance;
    if (res > maxSize)
        return maxSize;

    return res;
}