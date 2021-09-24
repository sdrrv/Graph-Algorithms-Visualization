class Vertice {
    constructor(X, Y, ID) {
        this.x = X;
        this.y = Y;
        this.id = ID;
        this.selected = false;
        this.connections = {};
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

    addConnector(vertice) {
        this.connections[vertice.getId()] = vertice;
    }

    getConnections() {
        return this.connections;
    }

    getConnectionsKeys() {
        return Object.keys(this.connections);
    }
}