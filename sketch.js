function setup() {
    createCanvas(windowWidth, windowHeight);
    shadow(2, 2);
    zoom = 50;
    grid = [];
    vertices = [];

    drawGrid(zoom, 8, true);
}

function draw() {
    background(220);
    drawGrid(zoom, 8, false);
    drawVertices();
}


function drawVertices() {
    for (var i = 0; i < vertices.length; i++) {
        if (vertices.length > 1 && i != vertices.length - 1) {
            stroke(2);
            line(vertices[i].x, vertices[i].y, vertices[i + 1].x, vertices[i + 1].y);
        }
        fill(250);
        noStroke();
        circle(vertices[i].x, vertices[i].y, zoom * 0.7);
        fill(0);
        textSize(22);
        textAlign(CENTER, CENTER);
        text(vertices[i].id, vertices[i].x, vertices[i].y);
    }
}

function drawGrid(zoom, maxSize, firstRoll) {
    for (var i = 10; i < width; i += zoom) {
        for (var j = 10; j < height; j += zoom) {
            var toGrow = getSizeToGrow(i, j, maxSize);
            noStroke();
            fill(color(0, 0, 0, 80));
            circle(i, j, zoom * 0.06 + toGrow);
            if (firstRoll) {
                grid.push([i, j, zoom * 0.06 + toGrow]);
            }
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
        if ((dist(grid[i][0], grid[i][1], mouseX, mouseY) <= grid[i][2]) && checkForVertice(grid[i][0], grid[i][1])) {
            vertices.push(new Vertice(grid[i][0], grid[i][1], vertices.length));
        }
    }
}

function checkForVertice(X, Y) {
    for (var i = 0; i < vertices.length; i++) {
        if (vertices[i].x == X && vertices[i].y == Y)
            return false;
    }
    return true;
}