function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    //-------------------------------------
    zoom = 50;
    grid = [];
    vertices = {};
    count = 0;
    selectedVertice = null;
    connections = []; // Contains all the connections
    //-------------------------------------
    unidirectional = true;
    //-------------------------------------
}

function draw() {
    background(200);
    drawGrid(zoom, 8);
    drawConnections();
    drawVertices();
}

function drawConnections() {
    for (var connectionIndex in connections) {
        var connection = connections[connectionIndex];

        var vertice1 = connection.getVertice1();
        var vertice2 = connection.getVertice2();
        shadow(2, 2);
        stroke(2);
        strokeWeight(1);
        line(vertice1.x, vertice1.y, vertice2.x, vertice2.y);
    }
}

function drawVertices() {
    for (var key in vertices) {
        var vertice = vertices[key];

        if (vertice.selected) { // selected
            shadow(3, 3);
            fill(250);
            stroke(55, 105, 0);
            strokeWeight(4);
            circle(vertice.x, vertice.y, zoom * 0.8);
            //-------Text--------
            shadow(0, 0);
            fill(color(55, 105, 0));
            textSize(22);
            textAlign(CENTER, CENTER);
            strokeWeight(1);
            textFont('Georgia');
            text(vertice.getId(), vertice.x, vertice.y);
        } else if (dist(vertice.x, vertice.y, mouseX, mouseY) <= zoom * 0.8) { // Hover
            shadow(3, 3);
            fill(255);
            noStroke();
            circle(vertice.x, vertice.y, zoom * 0.8);
            //-------Hover Text--------
            shadow(0, 0);
            fill(0);
            textSize(22);
            text(vertice.getId(), vertice.x, vertice.y);
        } else { // Iddle
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
        if (dist(grid[i][0], grid[i][1], mouseX, mouseY) <= grid[i][2] * 1.15) {
            var vertice = getVertice(grid[i][0], grid[i][1]);
            if (vertice == null) { // does not exist
                vertices[count] = new Vertice(grid[i][0], grid[i][1], count);
                count++;
            } else { // exists
                if (!vertice.selected) { // Was not selected
                    if (selectedVertice != null) { // Add to connectors
                        createConnection(selectedVertice, vertice, 1);
                        selectedVertice.addConnector(vertice);
                        if (!unidirectional) {
                            vertice.addConnector(selectedVertice);
                        }
                    } else { // None was selected
                        vertice.select();
                        selectedVertice = vertice;
                    }
                } else { // was selected
                    selectedVertice.deselect();
                    selectedVertice = null;
                }
            }
        }
    }
}

function getVertice(X, Y) {
    for (var key in vertices) {
        var vertice = vertices[key];
        if (vertice.x == X && vertice.y == Y)
            return vertice;
    }
    return null;
}

function createConnection(Vertice1, Vertice2, Value) {
    connections.push(new Connection(Vertice1, Vertice2, Value));
}