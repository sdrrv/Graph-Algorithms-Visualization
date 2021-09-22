function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
}

function draw() {
    background(220);
    fill(0);
    circle(windowWidth / 2, windowHeight / 2, 50);
    fill(color(250, 0, 0));
    noStroke();
    circle(mouseX, mouseY, 10);
    //rect(30, 20, 55, 55, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}