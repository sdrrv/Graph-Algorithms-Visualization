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

    addConnector(connection) {
        if (connection.getVertice1().getId() == this.id) {
            this.connections[connection.getVertice2().getId()] = connection;
        } else {
            this.connections[connection.getVertice1().getId()] = connection;
        }
    }

    getConnections() {
        return this.connections;
    }

    getConnectionsKeys() {
        return Object.keys(this.connections);
    }
}