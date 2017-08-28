//opções selecionadas
$('#pencil').click(function () {
    opcao = 1;
});

//fecha o desenho
$('#close_pencil').click(function () {
    if (pontos.length >= 3) {
        // context.lineTo(pontos[0].x, pontos[0].y);
        context.closePath();
        context.stroke();
        arestas.push(new Aresta(ponto_temp, pontos[0]));
        started = false;
        closed = true;
        opcao = 1;

        //adicionando a ultima aresta, a de retorno
        let extremos_pol = extremos(pontos);
        poligonos.push(new Poligono(arestas, extremos_pol[0], extremos_pol[2],
            extremos_pol[1], extremos_pol[3])); // cria um novo poligono
        // limpa os pontos e arestas
        pontos = [];
        arestas = [];
    } else {
        alert("Desenhe um polígono com 3 lados ao menos!");
    }
});

$('#regularPolPencil').click(function () {
    if (closed == false) {
        context.closePath();
        context.stroke();
        closed = true;
        started = false;
    }
    opcao = 2;
});


// seleciona um poligono
$('#selecionar').click(function () {
    opcao = 3;
});

// remove o elemento selecionado
$('#remover').click(function () {
    if (selecionado) {
        poligonos.splice(selecionado_index, 1);
        console.log("Poligono " + selecionado_index + " removido.");
        reeiniciaTela(canvas, poligonos);
        selecionado = false;
        selecionado_index = -1;
    } else {
        alert("Selecione um objeto antes!");
    }
});


// limpa o canvas
$('#apagar').click(function () {
    context.closePath();
    context.stroke();
    context.beginPath();
    started = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    startCanvas(canvas);
    poligonos = [];
});
