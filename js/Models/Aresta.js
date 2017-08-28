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

}
