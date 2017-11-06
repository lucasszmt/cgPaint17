class Face {

    constructor(arestas) {
        this._arestas = arestas;
    }

    get arestas() {
        return this._arestas;
    }

    set arestas(value) {
        this._arestas = value;
    }
}