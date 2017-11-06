class Poligono {

    constructor(arestas, vertices, faces, cor) {
        this._arestas = arestas;
        this._vertices = vertices;
        this._faces = faces;
        this._cor = cor;
    }

    get arestas() {
        return this._arestas;
    }

    set arestas(value) {
        this._arestas = value;
    }

    get vertices() {
        return this._vertices;
    }

    set vertices(value) {
        this._vertices = value;
    }

    get faces() {
        return this._faces;
    }

    set faces(value) {
        this._faces = value;
    }

    get cor() {
        return this._cor;
    }

    set cor(value) {
        this._cor = value;
    }

}


