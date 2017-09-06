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
            extremos_pol[1], extremos_pol[3], pontos, $('#cor').val())); // cria um novo poligono
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

$('#translar').click(function () {
    if (selecionado) {
        opcao = 4;
    } else {
        alert("Selecione um poligono antes!")
    }
});

$('#escala-plus-x').click(function () {
    if (selecionado) {
        escalonar(poligonos[selecionado_index], 1.1, 1)
    } else {
        alert("Selecione um poligono antes!")
    }
});

$('#escala-plus-y').click(function () {
    if (selecionado) {
        escalonar(poligonos[selecionado_index], 1, 1.1)
    } else {
        alert("Selecione um poligono antes!")
    }
});

$('#escala-minus-x').click(function () {
    if (selecionado) {
        escalonar(poligonos[selecionado_index], 0.9, 1)
    } else {
        alert("Selecione um poligono antes!")
    }
});

$('#escala-minus-y').click(function () {
    if (selecionado) {
        escalonar(poligonos[selecionado_index], 1, 0.9)
    } else {
        alert("Selecione um poligono antes!")
    }
});

$('#cisalhamento-plus').click(function () {
    if (selecionado) {
        cisalhamento(poligonos[selecionado_index], -0.1)
    } else {
        alert("Selecione um poligono antes!")
    }
});

$('#cisalhamento-minus').click(function () {
    if (selecionado) {
        cisalhamento(poligonos[selecionado_index], 0.1)
    } else {
        alert("Selecione um poligono antes!")
    }
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

$('#save').click(function () {
    var a = document.createElement("a");

    var clone = JSON.stringify(poligonos); // Remove os ciclos

    var file = new Blob([clone], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'tela.fjd';
    a.click();
});

// $('#open').click(function(event) {
//     var input = event.target;
//
//     var reader = new FileReader();
//     reader.onload = function(){
//         var text = reader.result;
//
//         var clone = JSON.retrocycle(JSON.parse(text));
//
//         vertices        = clone[0];
//         arestas         = clone[1];
//         poligonos       = clone[2];
//
//         Canvas1.desenha();
//     };
//     reader.readAsText(input.files[0]);
// });

$('#open').click(function() {
    $('#file-input').trigger('click');
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

$('#pintar').click(function () {
    if (selecionado) {
        context.strokeStyle = $('#cor').val();
        poligonos[selecionado_index]._cor = $('#cor').val();
        reeiniciaTela(canvas, poligonos);

    } else {
        alert("Selecione um poligono antes!")
    }
})
