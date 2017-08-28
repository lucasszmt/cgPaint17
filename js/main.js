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
                    context.beginPath();
                    context.moveTo(poligonos[i].x_min, poligonos[i].y_min);
                    context.lineTo(poligonos[i].x_max, poligonos[i].y_min);
                    context.lineTo(poligonos[i].x_max, poligonos[i].y_max);
                    context.lineTo(poligonos[i].x_min, poligonos[i].y_max);
                    context.closePath();
                    context.strokeStyle = '#544aff';
                    context.stroke();
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
