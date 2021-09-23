function setup() {
    createCanvas(windowWidth, windowHeight);
    shadow(2, 2);
    zoom = 50;
    grid = [];
    vertices = [];
}

function draw() {
    background(200);
    drawGrid(zoom, 8);
    drawVertices();
}


function drawVertices() {
    for (var i = 0; i < vertices.length; i++) {
        vertice = vertices[i];

        if (vertices.length > 1 && i != vertices.length - 1) { // Connector Line
            stroke(2);
            line(vertice.x, vertice.y, vertices[i + 1].x, vertices[i + 1].y);
        }

        if (dist(vertice.x, vertice.y, mouseX, mouseY) <= zoom * 0.8) {

            fill(255);
            noStroke();
            circle(vertice.x, vertice.y, zoom * 0.7);

            fill(0);
            textSize(22);
            textAlign(CENTER, CENTER);
            text(vertice.id, vertice.x, vertice.y);
        } else {
            fill(230);
            noStroke();
            circle(vertice.x, vertice.y, zoom * 0.7);
        }
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
    print("Click");
    for (var i = 0; i < grid.length; i++) {
        if ((dist(grid[i][0], grid[i][1], mouseX, mouseY) <= grid[i][2] * 1.05) && checkForVertice(grid[i][0], grid[i][1])) {
            print("Hit");
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