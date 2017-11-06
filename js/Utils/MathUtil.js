
function calcula_n(VRP, P) {

    var N = [];

    // VRP - P
    for (let i = 0; i < 3; i++) {
        N[i] = VRP[i] - P[i];
    }

    // Normaliza N
    var n = normaVetor(N);

    return n;
}

function calcula_v(n) {

    // Projetar um vetor Y com norma 1 (0,1,0)
    // Y1 = (Y*n) * n
    // V = Y - Y1

    var Y = [0, 0, -1];
    var Y1 = scale(n, dot(Y, n));
    var V = subVetor(Y, Y1);

    // Normaliza V
    var v = normaVetor(V);

    return v;
}

function calcula_u(v, n) {

    // u = vxn
    var u = [];

    //cross
    var x = v[1] * n[2] - v[2] * n[1];
    var y = v[2] * n[0] - v[0] * n[2];
    var z = v[0] * n[1] - v[1] * n[0];

    u[0] = x;
    u[1] = y;
    u[2] = z;

    return u;
}

function dot (vet1, vet2) {
    return vet1[0] * vet2[0] + vet1[1] * vet2[1] + vet1[2] * vet2[2];
}

function scale (vet, s) {

    var result = [];

    result[0] = vet[0] * s;
    result[1] = vet[1] * s;
    result[2] = vet[2] * s;

    return result;
}

function subVetor(a, b){

    var result = [];

    for (let i = 0; i < 3; i++) {
        result[i] = a[i] - b[i];
    }
    return result;
}

function normaVetor(a){
    var N = 0;
    var result = [];

    for (let i = 0; i < 3; i++) {
        N += Math.pow(a[i], 2);
    }
    N = Math.sqrt(N);

    for (let i = 0; i < 3; i++) {
        result[i] = a[i]/N;
    }

    return result;
}

function multiplicaMatriz (a, b) {

    let r, s, c;

    c = [];

    for (let i = 0; i < a.length; i++) {
        r = [];
        for (let j = 0; j < b[0].length; j++) {
            s = 0;
            for (let k = 0; k < b.length; k++) {
                s += a[i][k] * b[k][j];
            }
            r.push(s);
        }
        c.push(r);
    }

    return c
}
