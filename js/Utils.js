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

function clonePoligono(poligino){
    var vertices = [];

    poligino.vertices.forEach(function(vertice){
        var v = new Ponto(vertice.x, vertice.y, vertice.z);
        vertices.push(v);

    });

}

/**
 * Desenha a tela inicial
 * @param canvas
 */
function startCanvas(canvas, context) {

    canvas.lineWidth = 0.1;
    context.beginPath();
    for (var x = 0.5; x < 600; x += 10) {
        context.moveTo(x, 0);
        context.lineTo(x, 600);
    }

    for (var y = 0.5; y < 600; y += 10) {
        context.moveTo(0, y);
        context.lineTo(600, y);
    }

    context.strokeStyle = "#eee";
    context.stroke();
    context.closePath();
}

/**
 * Reepinta a tela do canvas
 * @param canvas
 * todo refazer o metodo
 */
function reeiniciaTela() {

    context.clearRect(0, 0, canvasFrente.width, canvasFrente.height);
    startCanvas(canvasFrente, context);

    context2.clearRect(0, 0, canvasTopo.width, canvasTopo.height);
    startCanvas(canvasTopo, context2);

    context3.clearRect(0, 0, canvasLateral.width, canvasLateral.height);
    startCanvas(canvasLateral, context3);

    context4.clearRect(0, 0, canvasPerspectiva.width, canvasPerspectiva.height);
    startCanvas(canvasPerspectiva, context4);

}

    function criarPoligono2D(lados, raio, centro, context) {

        var arestas = [];
        var vertices = [];
        var faces = [];

        let theta = 360.00 / lados;

        let ponto_temp;
        let ponto_atual;

        for (let i = 0; i < lados; i++) {

            aux1 = raio * Math.cos(2 * Math.PI * i / lados + theta) + centro.x;
            aux2 = raio * Math.sin(2 * Math.PI * i / lados + theta) + centro.y;

            switch (context){
                case '1':
                    if (i === 0) {
                        ponto_temp = new Ponto(aux1, aux2, 100);
                        vertices.push(ponto_temp);
                    } else {
                        ponto_atual = new Ponto(aux1, aux2, 100);
                        vertices.push(ponto_atual);
                        arestas.push(new Aresta(ponto_temp, ponto_atual));
                        ponto_temp = ponto_atual;
                    }
                    break;
                case '2':
                    if (i === 0) {
                        ponto_temp = new Ponto(aux2, 100, aux1);
                        vertices.push(ponto_temp);
                    } else {
                        ponto_atual = new Ponto(aux2, 100, aux1);
                        vertices.push(ponto_atual);
                        arestas.push(new Aresta(ponto_temp, ponto_atual));
                        ponto_temp = ponto_atual;
                    }
                    break;
                case '3':
                    if (i === 0) {
                        ponto_temp = new Ponto(100, aux2, aux1);
                        vertices.push(ponto_temp);
                    } else {
                        ponto_atual = new Ponto(100, aux2, aux1);
                        vertices.push(ponto_atual);
                        arestas.push(new Aresta(ponto_temp, ponto_atual));
                        ponto_temp = ponto_atual;
                    }
                    break;

            }

        }
        arestas.push(new Aresta(ponto_temp, vertices[0]));

        faces.push(new Face(arestas));

        var poligono = new Poligono(arestas, vertices, faces, 'black');

        return poligono;
    }

    function desenhaPoligono() {

        reeiniciaTela();

        context.strokeStyle = $('#cor').val();
        context2.strokeStyle = $('#cor').val();
        context3.strokeStyle = $('#cor').val();
        context4.strokeStyle = $('#cor').val();


        var vrp_x = $('#vrp_x').val();
        var vrp_y = $('#vrp_y').val();
        var vrp_z = $('#vrp_z').val();

        var p_x = $('#p_x').val();
        var p_y = $('#p_y').val();
        var p_z = $('#p_z').val();

        var distancia = $('#distancia').val();


        poligonos_ctx1 = convert3Dto2D([0, 0, 0, 1], [100, 100, 100,1], 2);

        poligonos_ctx1.forEach(function (poligono) {
            poligono.faces.forEach(function (face) {
                face.arestas.forEach(function (aresta) {

                    context.beginPath();
                    context.moveTo(aresta.pontoA.x, aresta.pontoA.y);
                    context.lineTo(aresta.pontoB.x, aresta.pontoB.y);
                    context.closePath();
                    context.stroke();

                });
            });
        });

        poligonos_ctx2 = convert3Dto2D([-100, -500, 0, 1], [0, 10, 0,1], 30);

        poligonos_ctx2.forEach(function (poligono) {
            poligono.faces.forEach(function (face) {
                face.arestas.forEach(function (aresta) {

                    context2.beginPath();
                    context2.moveTo(aresta.pontoA.x, aresta.pontoA.y);
                    context2.lineTo(aresta.pontoB.x, aresta.pontoB.y);
                    context2.closePath();
                    context2.stroke();

                });
            });
        });

        poligonos_ctx3 = convert3Dto2D([-500, -0, -100, 1], [0, 10, 0,1], 30);

        poligonos_ctx3.forEach(function (poligono) {
            poligono.faces.forEach(function (face) {
                face.arestas.forEach(function (aresta) {

                    context3.beginPath();
                    context3.moveTo(aresta.pontoA.x, aresta.pontoA.y);
                    context3.lineTo(aresta.pontoB.x, aresta.pontoB.y);
                    context3.closePath();
                    context3.stroke();

                });
            });
        });


        poligonos_ctx4 = convert3Dto2D([vrp_x, vrp_y, vrp_z, 1], [p_x, p_y, p_z,1], distancia);
        poligonos_ctx4.forEach(function (poligono) {
            poligono.faces.forEach(function (face) {
                face.arestas.forEach(function (aresta) {

                    context4.beginPath();
                    context4.moveTo(aresta.pontoA.x, aresta.pontoA.y);
                    context4.lineTo(aresta.pontoB.x, aresta.pontoB.y);
                    context4.closePath();
                    context4.stroke();

                });
            });
        });

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

