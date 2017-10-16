//pegando o canvas
var canvasFrente = $('#canvas_frente').get(0);
var canvasTopo = $('#canvas_topo').get(0);
var canvasLateral = $('#canvas_lateral').get(0);
var canvasPerspectiva = $('#canvas_perspectiva').get(0);

// adicionando o contexto
var context = canvasFrente.getContext('2d');
var context2 = canvasTopo.getContext('2d');
var context3 = canvasLateral.getContext('2d');
var context4 = canvasPerspectiva.getContext('2d');

//iniciando os canvas
startCanvas(canvasFrente, context); // montando as grids
startCanvas(canvasTopo, context2);
startCanvas(canvasLateral, context3); // montando as grids
startCanvas(canvasPerspectiva, context4);

//lista de poligonos
var poligonos = [];
var ponto = new Ponto();

//globais
var opcao = 1;

var pontos = []; // para manter uma lista de pontos por precaução
var ponto_temp;
var arestas = [];
var started = false;
var closed = true;
var selecionado = false;
//
var view_selecionada = 0
var selecionado_index;

var movendo = false;

var x_init;
var y_init;

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;

        var clone = JSON.parse(text);
//            console.log(clone[0]);
        for (let i = 0; i < clone.length; i ++) {
            poligonos.push(new Poligono(
                clone[i]._arestas, clone[i]._x_max, clone[i]._x_min, clone[i]._y_max, clone[i]._y_min, clone[i]._pontos
            ));
        }

        reeiniciaTela(canvas, poligonos);

    };
    reader.readAsText(input.files[0]);
};

// adicionando os eventos para os canvas
canvasFrente.addEventListener('click', ev_mouseclick, false);
canvasTopo.addEventListener('click', ev_mouseclick, false);
canvasLateral.addEventListener('click', ev_mouseclick, false);

// só pra verificar as coordenadas!
canvas.addEventListener('auxclick', function (ev) {
    console.log(ev.offsetX, ev.offsetY);
    p = new Ponto(ev.offsetX, ev.offsetY);
}, false);

canvas.addEventListener('mousedown', function(e) {
    movendo = true;
    x_init = e.offsetX;
    y_init = e.offsetY;

//        canvas.addEventListener('mousemove', function(e) {
//            if (movendo) {
////                console.log(e.offsetX + " " + e.offsetY)
//            }
//
//            if (opcao == 4) {
//                let x_diff = e.layerX - x_init;
//                let y_diff = e.layerY - y_init;
//
//            console.log(x_diff + ' ' +  y_diff);
////                translar(poligonos[selecionado_index], x_diff, y_diff);
//            }
//        });
}, false);



canvas.addEventListener('mouseup', function (ev) {

    movendo = false;
    if (opcao == 4) {
        let x_diff = ev.layerX - x_init;
        let y_diff = ev.layerY - y_init;

//            console.log(x_diff + ' ' +  y_diff);
        translar(poligonos[selecionado_index], x_diff, y_diff);
    }
});


/**
 * Método que maximiza a view desejada
 *
 *
 */
function mudaView() {
    let valor = $('#visao').val();

    switch (valor) {
        case '1':
            canvasTopo.style.display = 'none';
            canvasLateral.style.display = 'none';
            canvasPerspectiva.style.display = 'none';
            canvasFrente.style.display = 'inline';

            canvasFrente.width = 600;
            canvasFrente.height = 600;
            startCanvas(canvasFrente, context);
            break;

        case '2':
            canvasFrente.style.display = 'none';
            canvasLateral.style.display = 'none';
            canvasPerspectiva.style.display = 'none';
            canvasTopo.style.display = 'inline';

            canvasTopo.width = 600;
            canvasTopo.height = 600;
            startCanvas(canvasTopo, context2);
            break;

        case '3':
            canvasTopo.style.display = 'none';
            canvasFrente.style.display = 'none';
            canvasPerspectiva.style.display = 'none';
            canvasLateral.style.display = 'inline';

            canvasLateral.width = 600;
            canvasLateral.height = 600;
            startCanvas(canvasLateral, context3);
            break;

        case '4':
            canvasTopo.style.display = 'none';
            canvasLateral.style.display = 'none';
            canvasFrente.style.display = 'none';
            canvasPerspectiva.style.display = 'inline';

            canvasPerspectiva.width = 600;
            canvasPerspectiva.height = 600;
            startCanvas(canvasPerspectiva, context4);
            break;

        case '0':
            canvasLateral.style.display = 'inline';
            canvasFrente.style.display = 'inline';
            canvasTopo.style.display = 'inline';
            canvasPerspectiva.style.display = 'inline';

            canvasTopo.width = 400;
            canvasTopo.height = 300;

            canvasFrente.width = 400;
            canvasFrente.height = 300;

            canvasLateral.width = 400;
            canvasLateral.height = 300;

            canvasPerspectiva.width = 400;
            canvasPerspectiva.height = 300;
            break;
    }
}
