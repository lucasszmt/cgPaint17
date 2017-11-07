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

    get centroide(){
        var x = 0;
        var y = 0;
        var z = 0;

        var count = 0;

        this._vertices.forEach(function (vertice) {
            x = x + vertice.x;
            y = y + vertice.y;
            z = z + vertice.z;

            count++;
        });

        x = x / count;
        y = y / count;
        z = z / count;

        return new Ponto(x, y, z);
    }

}


