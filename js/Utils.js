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
function reeiniciaTela(canvas, poligonos) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    startCanvas(canvas);
    poligonos.forEach(function (e) {
        desenhaPoligono(e);
    });
}

/**
 *  Desenha um único poligono
 *
 * @param poligono
 * @param cor
 */
function desenhaPoligono(poligono) {
    context.strokeStyle = poligono.cor;
    context.beginPath();
    context.moveTo(poligono._arestas[0]._pontoA._x, poligono._arestas[0]._pontoA._y);
    poligono.arestas.forEach(function (e) {
        context.lineTo(e._pontoB._x, e._pontoB._y);
    });
    context.closePath();
    context.stroke();
}

// método utilizado para desenhar polígonos regulares
function polRegular(lados, raio, centro) {
    let dots = [];
    let theta = 360.00 / lados;
    let ponto_temp;

    for (let i = 0; i < lados; i++) {
        aux_x = raio * Math.cos(2 * Math.PI * i / lados + theta) + centro.x;
        aux_y = raio * Math.sin(2 * Math.PI * i / lados + theta) + centro.y;
        dots.push(new Ponto(aux_x, aux_y));
        if (i === 0) {
            ponto_temp = new Ponto(aux_x, aux_y);
        } else {
            arestas.push(new Aresta(ponto_temp, new Ponto(aux_x, aux_y)));
            ponto_temp = new Ponto(aux_x, aux_y);
        }
    }
    // ja adicionando as coordenadas aos poligonos
    arestas.push(new Aresta(ponto_temp, dots[0])); // fechando o poligono
    aux_dots = extremos(dots);
    poligonos.push(new Poligono(arestas, aux_dots[0], aux_dots[2], aux_dots[1], aux_dots[3], dots, $('#cor').val()));
    arestas = [];
    console.log(dots);
    return dots;
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
