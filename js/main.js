// Pega as ações do mouse
function ev_mouseclick(ev) {
    var x, y;
    switch (opcao) {

        // opção de desenho livre
        case 1:

            //inicia o desenho livre
            context.strokeStyle = "#000000";

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
                context.beginPath();
                context.moveTo(x, y);
                started = true;
                closed = false;
                ponto_temp = new Ponto(x, y);
                pontos.push(new Ponto(x, y)); // lista geral de pontos
            } else {
                context.lineTo(x, y);
                context.stroke();

                pontos.push(new Ponto(x, y)); // lista geral de pontos

                arestas.push(new Aresta(ponto_temp, new Ponto(x, y)));
                ponto_temp = new Ponto(x, y);
            }
            break;

        // aciona o método de desenho de poligonos regulares
        case 2:
            context.strokeStyle = "#000000";

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

    poligono.x_max += x_diff;
    poligono.x_min += x_diff;
    poligono.y_max += y_diff;
    poligono.y_min += y_diff;

    // translando
    poligono.arestas.forEach(function (e, index) {
        poligono.arestas[index].addDiff(x_diff, y_diff);
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

    // reeiniciaTela(canvas, poligonos);
    // drawSelectionRect(poligonos, selecionado_index);
}

function rotacionar(poligono, theta) {

    // trazendo para origem
    diffx = 0 - poligono.x_min;
    diffy = 0 - poligono.y_min;
    console.log(diffx)
    translar(poligono, diffx, 0 - poligono.y_min);

    // rotacionando
    poligono.arestas.forEach(function (e, index) {
        poligono.arestas[index].rotacionarPontos(theta);
    });

    reeiniciaTela(canvas, poligonos);
}
