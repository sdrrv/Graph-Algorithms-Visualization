function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    frameRate(60);
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
    createGrid();
}


function draw() {
    background(200);
    drawGrid(zoom, 8);
    drawFPS();
    drawConnections();
    drawVertices();
}

function createGrid() {
    for (var i = 10; i < width; i += zoom) {
        for (var j = 10; j < height; j += zoom) {
            grid.push([i, j, zoom * 0.2]);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawFPS() {
    /*shadow(0, 0);
    textSize(15);
    var fps = frameRate();
    fill(0);
    stroke(0);
    text("FPS: " + fps.toFixed(2), width * 0.97, height * 0.98); */
    print(frameRate());
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

function drawConnectionsText(vertice, offset) {
    var connections = vertice.getConnections();
    for (var connectionKey in connections) {
        var connection = connections[connectionKey];
        shadow(3, 3);
        //fill(color(178, 34, 34));
        fill(color(55, 105, 0));
        stroke(2);
        textSize(30);
        var textPos = getLineMiddle(connection.getVertice1(), connection.getVertice2());
        text(connection.getValue(), textPos[0] * (1 + offset), textPos[1] * (1 + offset));
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
            drawConnectionsText(vertice, 0.005);
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
    for (var gridIndex in grid) {
        var point = grid[gridIndex];
        var toGrow = getSizeToGrow(point[0], point[1], maxSize);
        noStroke();
        fill(color(0, 0, 0, 80));
        circle(point[0], point[1], zoom * 0.06 + toGrow);
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
                        var newConnection = createConnection(selectedVertice, vertice, 1);
                        selectedVertice.addConnector(newConnection);
                        if (!unidirectional) {
                            vertice.addConnector(newConnection);
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
    var connection = new Connection(Vertice1, Vertice2, Value);
    connections.push(connection);
    return connection;
}

function getLineMiddle(Vertice1, Vertice2) {
    var p1 = [Vertice1.x, Vertice1.y];
    var p2 = [Vertice2.x, Vertice2.y];

    var m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    var x = (p2[0] + p1[0]) / 2;
    var y = m * x - m * p1[0] + p1[1];
    return [x, y];
}