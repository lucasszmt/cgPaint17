class Aresta {
    constructor(pontoA, pontoB) {
        this._pontoA = pontoA;
        this._pontoB = pontoB;
    }

    get pontoA() {
        return this._pontoA;
    }

    set pontoA(value) {
        this._pontoA = value;
    }

    get pontoB() {
        return this._pontoB;
    }

    set pontoB(value) {
        this._pontoB = value;
    }

    /**
     * Utilizado para translação
     *
     * @param x_diff
     * @param y_diff
     */
    addDiff(x_diff, y_diff) {
        this.pontoA.x += x_diff;
        this.pontoA.y += y_diff;
        this.pontoB.x += x_diff;
        this.pontoB.y += y_diff;
    }

    /**
     * Utilizado no escalonamento
     *
     * @param S_x
     * @param S_y
     */
    multPontos(S_x, S_y) {
        this.pontoA.x *= S_x;
        this.pontoA.y *= S_y;
        this.pontoB.x *= S_x;
        this.pontoB.y *= S_y;
    }

}
