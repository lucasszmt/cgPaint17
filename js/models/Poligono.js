class Poligono {

    constructor(arestas, vertices, faces, cor, cor_aresta) {
        this._arestas = arestas;
        this._vertices = vertices;
        this._faces = faces;
        this._cor = cor;
        this._cor_aresta = cor_aresta;
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

    get cor_aresta() {
        return this._cor_aresta;
    }

    set cor_aresta(value) {
        this._cor_aresta = value;
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

    get raio(){

        var centro = this.centroide;
        var count = 0;
        var r = 0;
        this._vertices.forEach(function (vertice) {
            r += crides(centro, vertice);
            ++count;
        });

        return r/count;
    }

    get extremos() {

        let max_x = Number.NEGATIVE_INFINITY, min_x = Number.POSITIVE_INFINITY,
            max_y = Number.NEGATIVE_INFINITY, min_y = Number.POSITIVE_INFINITY,
            max_z = Number.NEGATIVE_INFINITY, min_z = Number.POSITIVE_INFINITY;

        this._vertices.forEach(function (vertice) {
            if (vertice.x > max_x)
                max_x = vertice.x;

            if (vertice.x < min_x)
                min_x = vertice.x;

            if (vertice.y > max_y)
                max_y = vertice.y;

            if (vertice.y < min_y)
                min_y = vertice.y;

            if (vertice.z > max_z)
                max_z = vertice.z;

            if (vertice.z < min_z)
                min_z = vertice.z;
        });

        return [max_x, max_y, max_z, min_x, min_y, min_z];
    }
}


