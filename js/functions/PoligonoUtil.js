function criarPoligono(lados, raio, centro) {

    var arestas = [];
    var vertices = [];
    var faces = [];

    let theta = 360.00 / lados;

    let ponto_temp;
    let ponto_atual;

    for (let i = 0; i < lados; i++) {

        aux1 = raio * Math.cos(2 * Math.PI * i / lados + theta) + centro.x;
        aux2 = raio * Math.sin(2 * Math.PI * i / lados + theta) + centro.y;

        if (i === 0) {
            ponto_temp = new Ponto(aux1, aux2, centro.x);
            vertices.push(ponto_temp);
        } else {
            ponto_atual = new Ponto(aux1, aux2, centro.x);
            vertices.push(ponto_atual);
            arestas.push(new Aresta(ponto_temp, ponto_atual));
            ponto_temp = ponto_atual;
        }
    }
    arestas.push(new Aresta(ponto_temp, vertices[0]));

    faces.push(new Face(arestas));

    poligonos3D.push(new Poligono(arestas, vertices, faces, 'black'));
}

function desenhaPoligono() {

    var zoom = 1;

    if(maximized){
        zoom = 2;
    }

    reeiniciaTela();

    poligonos3D.forEach(function (poligono) {

        context1.strokeStyle = poligono.cor;

        poligono.faces.forEach(function (face) {
            face.arestas.forEach(function (aresta) {

                context1.beginPath();
                context1.moveTo(aresta.pontoA.x * zoom, aresta.pontoA.y * zoom);
                context1.lineTo(aresta.pontoB.x * zoom, aresta.pontoB.y * zoom);
                context1.closePath();
                context1.stroke();

            });
        });
    });

    poligonos3D.forEach(function (poligono) {

        context2.strokeStyle = poligono.cor;

        poligono.faces.forEach(function (face) {
            face.arestas.forEach(function (aresta) {

                context2.beginPath();
                context2.moveTo(aresta.pontoA.x * zoom, aresta.pontoA.z * zoom);
                context2.lineTo(aresta.pontoB.x * zoom, aresta.pontoB.z * zoom);
                context2.closePath();
                context2.stroke();

            });
        });
    });

    poligonos3D.forEach(function (poligono) {

        context3.strokeStyle = poligono.cor;

        poligono.faces.forEach(function (face) {
            face.arestas.forEach(function (aresta) {

                context3.beginPath();
                context3.moveTo(aresta.pontoA.z * zoom, aresta.pontoA.y * zoom);
                context3.lineTo(aresta.pontoB.z * zoom, aresta.pontoB.y * zoom);
                context3.closePath();
                context3.stroke();

            });
        });
    });

    poligonos_perspectiva = convert3Dto2D([1000, 1000, 1000, 1], [0, 0, 0, 1], 20);

    poligonos_perspectiva.forEach(function (poligono) {

        context4.strokeStyle = poligono.cor;

        poligono.faces.forEach(function (face) {
            face.arestas.forEach(function (aresta) {

                context4.beginPath();
                context4.moveTo(aresta.pontoA.x * zoom, aresta.pontoA.y * zoom);
                context4.lineTo(aresta.pontoB.x * zoom, aresta.pontoB.y * zoom);
                context4.closePath();
                context4.stroke();

            });
        });
    });

}

function criarPoligonoFoda(){

    var b1 = new Ponto(50,50,50);
    var b2 = new Ponto(150,50,50);
    var b3 = new Ponto(150,50,150);
    var b4 = new Ponto(50,50,150);

    var t1 = new Ponto(50,150,50);
    var t2 = new Ponto(150,150,50);
    var t3 = new Ponto(150,150,150);
    var t4 = new Ponto(50,150,150);

    var vertices = [b1, b2, b3, b4, t1, t2, t3, t4];

    var ab1 = new Aresta(b1, b2);
    var ab2 = new Aresta(b2, b3);
    var ab3 = new Aresta(b3, b4);
    var ab4 = new Aresta(b4, b1);

    var at1 = new Aresta(t1, t2);
    var at2 = new Aresta(t2, t3);
    var at3 = new Aresta(t3, t4);
    var at4 = new Aresta(t4, t1);

    var al1 = new Aresta(t1, b1);
    var al2 = new Aresta(b2, t2);
    var al3 = new Aresta(b3, t3);
    var al4 = new Aresta(b4, t4);

    var arestas = [ab1, ab2, ab3, ab4, at1, at2, at3, at4, al1, al2, al3, al4];

    var fbase = new Face([ab1, ab2, ab3, ab4]);
    var ftopo = new Face([at1, at2, at3, at4]);

    var flateral1 = new Face([new Aresta(t1, t2), new Aresta(t2, b2), new Aresta(b2, b1), new Aresta(b1, t1)]);
    var flateral2 = new Face([new Aresta(t3, t2), new Aresta(t2, b2), new Aresta(b2, b3), new Aresta(b3, t3)]);
    var flateral3 = new Face([new Aresta(t4, t3), new Aresta(t3, b3), new Aresta(b3, b4), new Aresta(b4, t4)]);
    var flateral4 = new Face([new Aresta(t1, t4), new Aresta(t4, b4), new Aresta(b4, b1), new Aresta(b1, t1)]);

    var faces = [fbase, ftopo, flateral1, flateral2, flateral3, flateral4];
    //var faces = [flateral4];

    var poligonofoda = new Poligono (arestas, vertices, faces, 'black');

    poligonos3D.push(poligonofoda);

}

function translar(poligono, value1, value2, op) {

    switch (op){
        case 1:
            var centroide = poligono.centroide;

            var diff1 = value1 - centroide.x;
            var diff2 = value2 - centroide.y;

            poligono.vertices.forEach(function (vertice) {
                vertice.x += diff1;
                vertice.y += diff2;
            });
            break;
        case 2:
            var centroide = poligono.centroide;

            var diff1 = value1 - centroide.x;
            var diff2 = value2 - centroide.z;

            poligono.vertices.forEach(function (vertice) {
                vertice.x += diff1;
                vertice.z += diff2;
            });
            break;
        case 3:
            var centroide = poligono.centroide;

            var diff1 = value2 - centroide.y;
            var diff2 = value1 - centroide.z;

            poligono.vertices.forEach(function (vertice) {
                vertice.y += diff1;
                vertice.z += diff2;
            });
            break;
    }

    desenhaPoligono();
}

function escalonar(poligono, plus) {

    var centroide = poligono.centroide;

    poligono.vertices.forEach(function (vertice) {
        vertice.x = ((vertice.x - centroide.x) * plus) + centroide.x;
        vertice.y = ((vertice.y - centroide.y) * plus) + centroide.y;
        vertice.z = ((vertice.z - centroide.z) * plus) + centroide.z;
    });

    desenhaPoligono();
}

function rotacao(poligono, option) {

    var centroide = poligono.centroide;

    var origem = [[1, 0, 0, -centroide.x],
                [0, 1, 0, -centroide.y],
                [0, 0, 1, -centroide.z],
                [0, 0, 0, 1]];

    var pos = [[1, 0, 0, centroide.x],
                    [0, 1, 0, centroide.y],
                    [0, 0, 1, centroide.z],
                    [0, 0, 0, 1]];

    var value = Math.PI * 180 + 2;

    var rot_x = [[1, 0, 0, 0],
                [0, Math.cos(value), -Math.sin(value), 0],
                [0, Math.sin(value), Math.cos(value), 0],
                [0, 0, 0, 1]];

    var rot_y = [[Math.cos(value), 0, Math.sin(value), 0],
                [0, 1, 0, 0],
                [-Math.sin(value), 0, Math.cos(value), 0],
                [0, 0, 0, 1]];

    var rot_z = [[Math.cos(value), -Math.sin(value), 0, 0],
                [Math.sin(value), Math.cos(value), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]];


    var Mpontos = [];
    var count = 0;

    Mpontos[0] = [];
    Mpontos[1] = [];
    Mpontos[2] = [];
    Mpontos[3] = [];

    poligono.vertices.forEach(function (vertice) {

        Mpontos[0][count] = vertice.x;
        Mpontos[1][count] = vertice.y;
        Mpontos[2][count] = vertice.z;
        Mpontos[3][count] = 1;

        ++count;
    });

    switch (option){
        case 'x':
            var M3 = multiplicaMatriz(rot_x, origem);
            var Mfinal = multiplicaMatriz(pos, M3);
            break;
        case 'y':
            var M2 = multiplicaMatriz(rot_y, origem);
            var Mfinal = multiplicaMatriz(pos, M2);
            break;
        case 'z':
            var M1 = multiplicaMatriz(rot_z, origem);
            var Mfinal = multiplicaMatriz(pos, M1);
            break;
        case 'all':
            var M1 = multiplicaMatriz(rot_z, origem);
            var M2 = multiplicaMatriz(rot_y, M1);
            var M3 = multiplicaMatriz(rot_x, M2);
            var Mfinal = multiplicaMatriz(pos, M3);
            break;
    }

    var pontosfinal = multiplicaMatriz(Mfinal, Mpontos);

    for (let j = 0; j < count; j++) {
        pontosfinal[0][j] = pontosfinal[0][j] / pontosfinal[3][j];
        pontosfinal[1][j] = pontosfinal[1][j] / pontosfinal[3][j];
        pontosfinal[2][j] = pontosfinal[2][j] / pontosfinal[3][j];
        pontosfinal[3][j] = pontosfinal[3][j] / pontosfinal[3][j];
    }

    count = 0;
    poligono.vertices.forEach(function (vertice) {

        vertice.x = pontosfinal[0][count];
        vertice.y = pontosfinal[1][count];
        vertice.z = pontosfinal[2][count];

        ++count;
    });

    desenhaPoligono();
}

function cisalhamento(poligono, shx) {
    let max_x = Number.NEGATIVE_INFINITY,
        min_x = Number.POSITIVE_INFINITY;
    let aux;

    let centro_x = (poligono.x_max + poligono.x_min) / 2;
    let centro_y = (poligono.y_max + poligono.y_min) / 2;


    poligono.arestas.forEach(function (e, index) {
        aux = poligono.arestas[index].pontoA.x + shx * poligono.arestas[index].pontoA.y;
        poligono.arestas[index].pontoA.x = aux;

        if (aux > max_x) {
            max_x = aux;
        }
        if (aux < min_x) {
            min_x = aux
        }

        aux = poligono.arestas[index].pontoB.x + shx * poligono.arestas[index].pontoB.y;
        poligono.arestas[index].pontoB.x = aux;

        if (aux > max_x) {
            max_x = aux;
        }
        if (aux < min_x) {
            min_x = aux
        }
    });

    poligono.x_max = max_x;
    poligono.x_min = min_x;

    let centro_x_atual = (poligono.x_max + poligono.x_min) / 2;
    let centro_y_atual = (poligono.y_max + poligono.y_min) / 2;

    let diffx = centro_x - centro_x_atual;
    let diffy = centro_y - centro_y_atual;

    translar(poligono, diffx, diffy);

    // reeiniciaTela(canvas, poligonos);
    // drawSelectionRect(poligonos, selecionado_index);
}

/**
 * Retorna os menores e maiores pontos de um poligono
 * @param arestas
 */
function extremos(pontos) {

    let max_x = Number.NEGATIVE_INFINITY, max_y = Number.NEGATIVE_INFINITY,
        min_x = Number.POSITIVE_INFINITY, min_y = Number.POSITIVE_INFINITY,
        min_z = Number.POSITIVE_INFINITY, max_z = Number.NEGATIVE_INFINITY;

    pontos.forEach(function (element) {
        if (element.x > max_x)
            max_x = element.x;

        if (element.x < min_x)
            min_x = element.x;

        if (element.y > max_y)
            max_y = element.y;

        if (element.y < min_y)
            min_y = element.y;

        if (element.z > max_z)
            max_z = element.z;

        if (element.z < min_z)
            min_z = element.z;
    });

    return [max_x, max_y, min_x, min_y, max_z, min_z];
}

function atualizaExtremos(poligono) {
    aux = extremos(poligono.pontos);
    poligono.x_max = aux[0];
    poligono.y_max = aux[1];
    poligono.x_min = aux[2];
    poligono.y_min = aux[3];

}

/**
 * Verifica se o ponto está dentro do poligono,
 * a verificação irá começar de traz para frente
 * @param lista_poligonos
 */
function verificaPontoRect(p, poligono) {

    //
    if (p.x < poligono.x_min || p.x > poligono.x_max ||
        p.y < poligono.y_min || p.y > poligono.y_max) {
        return false;
    } else {
        return true;
    }
}

/**
 * Método de desenho do retangulo de seleção dos poligonos
 *
 * @param poligonos
 * @param index
 */
function drawSelectionRect(poligonos, index) {
    context.beginPath();
    context.moveTo(poligonos[index].x_min, poligonos[index].y_min);
    context.lineTo(poligonos[index].x_max, poligonos[index].y_min);
    context.lineTo(poligonos[index].x_max, poligonos[index].y_max);
    context.lineTo(poligonos[index].x_min, poligonos[index].y_max);
    context.closePath();
    context.strokeStyle = '#544aff';
    context.stroke();
}