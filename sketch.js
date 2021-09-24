function setup() {
    createCanvas(windowWidth, windowHeight);
    shadow(2, 2);
    zoom = 50;
    grid = [];
    vertices = {};
    count = 0;
}

function draw() {
    background(200);
    drawGrid(zoom, 8);
    drawVertices();
}


function drawVertices() {
    for (let key in vertices) {
        vertice = vertices[key];
        /*if (count > 1 && i != count - 1) { // Connector Line
            shadow(2, 2);
            stroke(2);
            //line(vertice.x, vertice.y, vertices[i + 1].x, vertices[i + 1].y);
        }*/

        if (dist(vertice.x, vertice.y, mouseX, mouseY) <= zoom * 0.8 || vertice.selected) { // Hover
            shadow(3, 3);
            fill(255);
            noStroke();
            circle(vertice.x, vertice.y, zoom * 0.7);
            //-------Hover Text--------
            shadow(0, 0);
            fill(0);
            textSize(22);
            textAlign(CENTER, CENTER);
            textFont('Georgia');
            text(vertice.getId(), vertice.x, vertice.y);
        } else {
            shadow(3, 3);
            fill(230);
            noStroke();
            circle(vertice.x, vertice.y, zoom * 0.7);
        }
    }
}

function drawGrid(zoom, maxSize) {
    shadow(3, 3);
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
        if ((dist(grid[i][0], grid[i][1], mouseX, mouseY) <= grid[i][2] * 1.05)) {
            if (checkForVertice(grid[i][0], grid[i][1])) { // does not exist
                vertices[count] = new Vertice(grid[i][0], grid[i][1], count);
                count++;
            } else { // exists
                print("Hello");
            }
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

function getDicKeys(Dic) {
    return Object.keys(Dic);
}