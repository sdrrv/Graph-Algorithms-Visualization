function setup() {
    createCanvas(windowWidth, windowHeight);
    //noCursor();
    shadow(2, 2);
    //zoomSlider = createSlider(30, 200, 50);
    //zoomSlider.position(windowWidth * 0.98 - zoomSlider.width, windowHeight * 0.94 - zoomSlider.height);
    //zoomSlider.style('height', '80px');
    zoom = 50;
    grid = [];
    vertices = [];

}

function draw() {
    background(220);
    drawGrid(zoom, 8);
    drawVertices();
}


function drawVertices() {
    for (var i = 0; i < vertices.length; i++) {
        fill(250);
        circle(vertices[i].x, vertices[i].y, zoom * 0.7);
    }
}

function drawGrid(zoom, maxSize) {
    grid = [];
    for (var i = 10; i < width; i += zoom) {

        for (var j = 10; j < height; j += zoom) {
            var toGrow = getSizeToGrow(i, j, maxSize);
            noStroke();
            fill(color(0, 0, 0, 80));
            circle(i, j, zoom * 0.06 + toGrow);
            grid.push([i, j, zoom * 0.06 + toGrow]);
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

function mousePressed() {
    for (var i = 0; i < grid.length; i++) {
        if (dist(grid[i][0], grid[i][1], mouseX, mouseY) <= grid[i][2]) {
            vertices.push(new Vertice(grid[i][0], grid[i][1], vertices.length + 1));
        }
    }
}