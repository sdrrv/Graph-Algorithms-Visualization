class Vertice {
    constructor(X, Y, ID) {
        this.x = X;
        this.y = Y;
        this.id = ID;
        this.selected = false;
    }

    getId() {
        return this.id;
    }

    select() {
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }
}