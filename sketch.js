function setup() {
    createCanvas(windowWidth, windowHeight);
    //noCursor();
    shadow(2, 2);
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
            var toGrow = getSizeToGrow(i, j, maxSize);
            noStroke();
            fill(color(255 - (toGrow * 5), 255 - (toGrow * 10), 255 - (toGrow * 5)));
            grid.push(circle(i, j, zoom * 0.06 + toGrow));
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

function shadow(xoff, yoff) {
    drawingContext.shadowOffsetX = xoff;
    drawingContext.shadowOffsetY = yoff;
    drawingContext.shadowBlur = 2;
    drawingContext.shadowColor = "black";
}