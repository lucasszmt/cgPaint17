/**
 * Desenha a tela inicial
 * @param canvas
 */
function startCanvas(canvas) {

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
    context.moveTo(poligono.arestas[0].pontoA.x, poligono.arestas[0].pontoA.y);
    poligono.arestas.forEach(function (e) {
        context.lineTo(e.pontoB.x, e.pontoB.y);
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
    poligonos.push(new Poligono(arestas, aux_dots[0], aux_dots[2], aux_dots[1], aux_dots[3]));
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
        min_x = Number.POSITIVE_INFINITY, min_y = Number.POSITIVE_INFINITY;

    pontos.forEach(function (element) {
        if (element.x > max_x)
            max_x = element.x;

        if (element.x < min_x)
            min_x = element.x;

        if (element.y > max_y)
            max_y = element.y;

        if (element.y < min_y)
            min_y = element.y;
    });

    return [max_x, max_y, min_x, min_y];
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