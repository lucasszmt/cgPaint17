class Poligono {

    constructor(arestas, x_max, x_min, y_max, y_min) {
        this._arestas = arestas;
        this._x_max = x_max;
        this._x_min = x_min;
        this._y_max = y_max;
        this._y_min = y_min;
        this._cor = '#000000';
    }

    get arestas() {
        return this._arestas;
    }

    set arestas(value) {
        this._arestas = value;
    }

    get x_max() {
        return this._x_max;
    }

    set x_max(value) {
        this._x_max = value;
    }

    get x_min() {
        return this._x_min;
    }

    set x_min(value) {
        this._x_min = value;
    }

    get y_max() {
        return this._y_max;
    }

    set y_max(value) {
        this._y_max = value;
    }

    get y_min() {
        return this._y_min;
    }

    set y_min(value) {
        this._y_min = value;
    }

    get cor() {
        return this._cor;
    }

    set cor(value) {
        this._cor = value;
    }
}
