//MODELO DE CAMERA ALVY RAY SMITH

var windowVAR = [0, 0, 10, 5]; //(cu, cv) = centro da window su = 1/2 larg ura da window sv = 1/2 altura da window
var far = 130; //Zmax
var near = 70; //Zmin

function camera(vrp, ponto) {

    var auxP = [ponto[0], ponto[1], ponto[2]];
    var auxVRP = [vrp[0], vrp[1], vrp[2]];

    n = calcula_n(auxVRP, auxP);

    v_n = n;

    v = calcula_v(n);
    u = calcula_u(n, v);

    //Realiza uma seqüência de rotações que alinha os eixos dos sistemas de coordenadas do mundo e de câmera
    var R = [[u[0], u[1], u[2], 0],
        [v[0], v[1], v[2], 0],
        [n[0], n[1], n[2], 0],
        [0, 0, 0, 1]];

    //Realiza a translação que move a câmera para a origem do mundo
    var T = [[1, 0, 0, -vrp[0]],
        [0, 1, 0, -vrp[1]],
        [0, 0, 1, -vrp[2]],
        [0, 0, 0, 1]];

    return multiplicaMatriz(R, T);
}

function recorte(distancia) {

    //Faz um cisalhamento para alinhar o centro da imagem com o eixo z. Necessário porque a janela de imagem pode não estar centralizada.
    var D = [[1, 0, -windowVAR[0] / distancia, 0],
        [0, 1, -windowVAR[1] / distancia, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];

    //Faz um escalonamento tal que a base da pirâmide de visão seja mapeada o quadrado unitário sobre o plano z = 1
    var E = [[distancia / (windowVAR[2] * far), 0, 0, 0],
        [0, distancia / (windowVAR[3] * far), 0, 0],
        [0, 0, 1 / far, 0],
        [0, 0, 0, 1]];

    return multiplicaMatriz(E, D);
}

function ortografica() {

    var Fo = [[1, 0, 0, 0], //Translada zmin para a origem
        [0, 1, 0, 0],
        [0, 0, 1, -near],
        [0, 0, 0, 1]];

    var Go = [[0.1, 0, 0, 0], //Escala o volume canônico em z para que o plano traseiro coincida com o plano z = 1
        [0, 0.2, 0, 0],
        [0, 0, 1 / (far - near), 0],
        [0, 0, 0, 1]];

    O = multiplicaMatriz(Fo, Go);

    return O;
}

function perspectiva() {
    var zmin = 0.538462; //near/far

    var I; //Concatenação das Matrizes F, G e H

    var F = [[1, 0, 0, 0], //Translada zmin para a origem
        [0, 1, 0, 0],
        [0, 0, 1, -zmin],
        [0, 0, 0, 1]];

    var G = [[1, 0, 0, 0], //Escala o volume canônico em z para que o plano traseiro coincida com o plano z = 1
        [0, 1, 0, 0],
        [0, 0, 1 / (1 - zmin), 0],
        [0, 0, 0, 1]];

    var H = [[1, 0, 0, 0], //Realiza a transformação projetiva
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, (1 - zmin) / zmin, 1]];


    I = multiplicaMatriz(G, F);
    I = multiplicaMatriz(H, I);

    //Multiplica as 3 primeiras linhas da matriz I pelo escalar  1/zmin. Leva o tronco da pirâmide no prisma com dimensões 2.zmin em x e y e zmin em z.

    var J = [[1 / zmin * I[0][0], 0, 0, 0],
        [0, 1 / zmin * I[1][1], 0, 0],
        [0, 0, 1 / zmin * I[2][2], 1 / zmin * I[2][3]],
        [0, 0, I[3][2], 0]];

    var P = [];

    for (let i = 0; i < 4; i++) {
        P[i] = [];
        for (let j = 0; j < 4; j++) {
            P[i][j] = J[i][j] * zmin;
        }
    }

    return P;
}

function dispositivo() {

    var viewPort = [0, 0, 100, 100]; //Tamanho da tela
    var Dx = 400; //Xmax - Xmin da viewport
    var Dy = 400; //Ymax - Ymin da viewport
    var Dz = 60; //far - near
    //distancia entre o observador e os planos de recorte frontal e traseiro


    //Translada o volume de visão canônico de forma que o vértice (-1 -1 0 1) vá para a origem e aplica um fator de escala de 0,5 em x e y
    var K = [[0.5, 0, 0, 0.5],
        [0, 0.5, 0, 0.5],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];


    var L = [[Dx, 0, 0, viewPort[0]],
        [0, Dy, 0, viewPort[1]],
        [0, 0, Dz, near],
        [0, 0, 0, 1]];

    ///Faz o arredondamento para o pixel inteiro mais próximo
    var M = [[1, 0, 0, 0.5],
        [0, 1, 0, 0.5],
        [0, 0, 1, 0.5],
        [0, 0, 0, 1]];

    var S = multiplicaMatriz(L, K);

    return multiplicaMatriz(M, S);
}

function sruTOsrt(S, P, C, V, O, op) {

    if (op == 0) {
        var aux1 = multiplicaMatriz(C, V);
        var aux2 = multiplicaMatriz(S, P);
        return multiplicaMatriz(aux2, aux1);
    } else {
        var aux1 = multiplicaMatriz(O, V);
        var aux2 = multiplicaMatriz(S, aux1);
        return aux2;
    }
}

function criarProjetor(vrp, ponto, distancia) {

    //VRP: Posicao do observador no mundo
    //Ponto: onde a camera esta apontada
    //d: distancia entre o observador e o plano

    //Transformacao de camera
    //R*T = Realiza a conversão das coordenadas de mundo para coordenadas de câmera
    var V = camera(vrp, ponto);
    //Transformacao de Recorte
    //D*E = Realiza a transformação de recorte
    var C = recorte(distancia);
    //Transformacao perspectiva
    //Faz a projeção perspectiva levando o VRP para o infinito. A projeção passa a ser uma projeção paralela ortográfica ao ignorar a coordenada z
    var P = perspectiva();
    var O = ortografica();
    //M*L*K = Realiza o mapeamento do volume canônico para coordenadas da viewport
    //Trnasformacao do Dispositivo
    var S = dispositivo();
    //Concatenacao Final
    //S*P*C*V = Faz o mapeamento em perspectiva das coordenadas do objeto de SRU para SRT

    var TP = sruTOsrt(S, P, C, V, O, 0);//0 = Perspectiva  1 = Ortografica

    return TP;
}


