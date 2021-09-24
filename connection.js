class Connection {
    constructor(vertice1, vertice2, value) {
        this._vertice1 = vertice1;
        this._vertice2 = vertice2;
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setValue(newValue) {
        this.value = newValue;
    }
}