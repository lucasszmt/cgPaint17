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
     * @param z_diff
     */
    addDiff(x_diff, y_diff, z_diff) {
        this.pontoA.x += x_diff;
        this.pontoA.y += y_diff;
        this.pontoA.z += z_diff;

        this.pontoB.x += x_diff;
        this.pontoB.y += y_diff;
        this.pontoB.z += z_diff;
    }

    /**
     * Utilizado no escalonamento
     *
     * @param S_x
     * @param S_y
     * @param S_z
     */
    multPontos(S_x, S_y, S_z) {
        this.pontoA.x *= S_x;
        this.pontoA.y *= S_y;
        this.pontoA.z *= S_z;

        this.pontoB.x *= S_x;
        this.pontoB.y *= S_y;
        this.pontoB.z *= S_z;
    }

    // todo refazer
    rotacionarPontosOld(theta) {
        let aux = [];

        let x_l = (this.pontoA.x * Math.cos(theta)) - (this.pontoA.y * Math.sin(theta));
        let y_l = (this.pontoA.x * Math.sin(theta)) + (this.pontoA.y * Math.cos(theta));
        this.pontoA.x = x_l;
        this.pontoA.y = y_l;
        // aux.push(x_l, y_l);

        x_l = (this.pontoB.x * Math.cos(theta)) - (this.pontoB.y * Math.sin(theta));
        y_l = (this.pontoB.x * Math.sin(theta)) + (this.pontoB.y * Math.cos(theta));
        this.pontoB.x = x_l;
        this.pontoB.y = y_l;
        // aux.push(x_l, y_l);

        // let aux = [this.pontoA.x, this.pontoA.y, this.pontoB.x, this.pontoB.y];
        // return aux;
    }
}
