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

    get extremos() {

        let max_x = Number.NEGATIVE_INFINITY, min_x = Number.POSITIVE_INFINITY,
           max_y = Number.NEGATIVE_INFINITY, min_y = Number.POSITIVE_INFINITY,
           max_z = Number.NEGATIVE_INFINITY, min_z = Number.POSITIVE_INFINITY;

        this._arestas.forEach(function (aresta) {
           if (aresta.pontoA.x > max_x)
               max_x = aresta.pontoA.x;
           if (aresta.pontoA.x < min_x)
               min_x = aresta.pontoA.x;

           if (aresta.pontoB.x > max_x)
               max_x = aresta.pontoB.x;
           if (aresta.pontoB.x < min_x)
               min_x = aresta.pontoB.x;

           if (aresta.pontoA.y > max_y)
               max_y = aresta.pontoA.y;
           if (aresta.pontoA.y < min_y)
               min_y = aresta.pontoA.y;

           if (aresta.pontoB.y > max_y)
               max_y = aresta.pontoB.y;
           if (aresta.pontoB.y < min_y)
               min_y = aresta.pontoB.y;

           if (aresta.pontoA.z > max_z)
               max_z = aresta.pontoA.z;
           if (aresta.pontoA.z < min_z)
               min_z = aresta.pontoA.z;

           if (aresta.pontoB.z > max_z)
               max_z = aresta.pontoB.z;
           if (aresta.pontoB.z < min_z)
               min_z = aresta.pontoB.z;
        });

        return [max_x, max_y, max_z, min_x, min_y, min_z];
    }

    get centroide() {
        var centroide = new Ponto(0, 0, 0);
        var k = 0;
        this.arestas.forEach(function (item) {
            centroide.x += item.pontoA.x;
            centroide.y += item.pontoA.y;
            centroide.z += item.pontoA.z;
            k++;
        });
        centroide.x = centroide.x / k;
        centroide.y = centroide.y / k;
        centroide.z = centroide.z / k;

        return centroide;
    }
}