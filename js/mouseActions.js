// Pega as ações do mouse
function ev_mouseclick(ev) {
    var x, y;
    switch (opcao) {

        // opção de desenho livre
        case 1:

            let contexto = NaN;

            // todo ver como arrumar isso, maximizar a tela antes de deixar pintar!
            if (ev.target.id == 'canvas_frente') {
                contexto = context;
            } else if (ev.target.id == 'canvas_topo') {
                contexto = context2;
            } else if (ev.target.id == 'canvas_lateral') {
                contexto = context3;
            }

            //inicia o desenho livre
            contexto.strokeStyle = $('#cor').val();

            // Pegam a posição do mouse no elemento selecionado
            if (ev.layerX || ev.layerX == 0) { // Firefox
                x = ev.layerX;
                y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera - Chrome
                x = ev.offsetX;
                y = ev.offsetY;
            }

            // se o desenho do poligono não foi iniciado
            if (!started) {
                contexto.beginPath();
                contexto.moveTo(x, y);
                started = true;
                closed = false;

                // verificando qual view está selecionada para salvar os pontos corretamente
                if (view_selecionada == 1) {
                    ponto_temp = new Ponto(x, y, 1);
                    pontos.push(new Ponto(x, y, 1)); // lista geral de pontos
                } else if (view_selecionada == 2) {
                    ponto_temp = new Ponto(x, 1, y);
                    pontos.push(new Ponto(x, 1, y)); // lista geral de pontos
                } else if (view_selecionada == 3) {
                    ponto_temp = new Ponto(x, y, 1);
                    pontos.push(new Ponto(x, y, 1)); // lista geral de pontos
                }

            } else {
                contexto.lineTo(x, y);
                contexto.stroke();

                let aux = NaN;

                if (view_selecionada == 1) {
                    aux = new Ponto(x, y, 1);
                    pontos.push(aux); // lista geral de pontos
                } else if (view_selecionada == 2) {
                    aux = new Ponto(x, 1, y);
                    pontos.push(aux); // lista geral de pontos
                } else if (view_selecionada == 3) {
                    aux = new Ponto(x, y, 1);
                    pontos.push(aux); // lista geral de pontos
                }

                arestas.push(new Aresta(ponto_temp, aux));
                ponto_temp = aux;
            } // todo fechar o método de fechar desenho auwehuwahewa
            break;

        // aciona o método de desenho de poligonos regulares
        case 2:
            context.strokeStyle = $('#cor').val();

            if (ev.layerX || ev.layerX == 0) { // Firefox
                x = ev.layerX;
                y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera - Chrome
                x = ev.offsetX;
                y = ev.offsetY;
            }

            // verifica se os campos estão preenchidos
            let raio = $('#radius').val();
            let lados = $('#sides').val();
            if ($('#radius').val() && $('#sides').val()) {
                pontos = polRegular(lados, raio, new Ponto(x, y));

                pontos.forEach(function (element) {
                    if (!started) {
                        // console.log(element.x + ' ' + element.y);
                        context.beginPath();
                        context.moveTo(element.x, element.y);
                        started = true;
                    } else {
                        // console.log(element.x + ' ' + element.y);
                        context.lineTo(element.x, element.y);
                        context.stroke();
                    }
                });
                context.closePath();
                context.stroke();
                started = false;
            } else if (lados < 3) {
                alert("O número de lados deve ser maior ou igual a 3");
            }
            else {
                alert("Preencha os campos abaixo");
            }
            break;

        // seleção de poligonos
        case 3:

            if (ev.layerX || ev.layerX == 0) { // Firefox
                x = ev.layerX;
                y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera - Chrome
                x = ev.offsetX;
                y = ev.offsetY;
            }

            ponto = new Ponto(x, y);

            // irá percorrer os poligonos de tras pra frente, por questão de prioridade
            for (let i = poligonos.length - 1; i >= 0; i--) {
                if (verificaPontoRect(ponto, poligonos[i])) {
                    reeiniciaTela(canvas, poligonos);
                    selecionado_index = i;
                    console.log(selecionado_index);

                    selecionado = true;
                    //desenhando caixa de seleção do poligono
                    drawSelectionRect(poligonos, i);
                    break;
                } else {
                    reeiniciaTela(canvas, poligonos);
                    console.log('false');
                    selecionado_index = -1;
                    selecionado = false;
                }
            }
            break;
    }

}


/**
 * Calcula diferença arrastada com o mouse e transalada o poligono
 *
 * @param poligono
 * @param x_diff
 * @param y_diff
 */
function translar(poligono, x_diff, y_diff) {

    poligono._x_max += x_diff;
    poligono._x_min += x_diff;
    poligono._y_max += y_diff;
    poligono._y_min += y_diff;

    // translando
    poligono._arestas.forEach(function (e, index) {
        poligono._arestas[index].addDiff(x_diff, y_diff);
    });

    reeiniciaTela(canvas, poligonos);
    drawSelectionRect(poligonos, selecionado_index);
}

function escalonar(poligono, S_x, S_y) {

    let centro_x = (poligono.x_max + poligono.x_min) / 2;
    let centro_y = (poligono.y_max + poligono.y_min) / 2;

    poligono.x_max *= S_x;
    poligono.x_min *= S_x;
    poligono.y_max *= S_y;
    poligono.y_min *= S_y;

    //  escalonando
    poligono.arestas.forEach(function (e, index) {
        poligono.arestas[index].multPontos(S_x, S_y);
    });

    let centro_x_atual = (poligono.x_max + poligono.x_min) / 2;
    let centro_y_atual = (poligono.y_max + poligono.y_min) / 2;

    let diffx = centro_x - centro_x_atual;
    let diffy = centro_y - centro_y_atual;

    translar(poligono, diffx, diffy);

    reeiniciaTela(canvas, poligonos);
    drawSelectionRect(poligonos, selecionado_index);
}

function rotar(poligono, theta) {

    // rotacionando
    poligono.arestas.forEach(function (e, index) {
        poligono.arestas[index].rotacionarPontos(theta);
    });

    reeiniciaTela(canvas, poligonos);
    drawSelectionRect(poligonos, selecionado_index);
}

function rotacao(poligono) {
    // transla pra origem
    let minx = -poligono.x_min;
    let miny = -poligono.y_min;
    translar(poligono, minx, miny);

    rotar(poligono, 0.4);
    reeiniciaTela(canvas, poligonos);

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
