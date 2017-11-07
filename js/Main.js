//pegando o canvas
var canvasFrente = $('#canvas_frente').get(0);
var canvasTopo = $('#canvas_topo').get(0);
var canvasLateral = $('#canvas_lateral').get(0);
var canvasPerspectiva = $('#canvas_perspectiva').get(0);

// adicionando o contexto
var context1 = canvasFrente.getContext('2d');
var context2 = canvasTopo.getContext('2d');
var context3 = canvasLateral.getContext('2d');
var context4 = canvasPerspectiva.getContext('2d');

//iniciando os canvas
startCanvas(canvasFrente, context1);
startCanvas(canvasTopo, context2);
startCanvas(canvasLateral, context3);
startCanvas(canvasPerspectiva, context4);

var poligonos3D = [];
criarPoligonoFoda();
desenhaPoligono();

var width_default = 400;
var height_default = 300;
var maximized = false;

var tool = 'select';

var context1_dragging = false;
var context2_dragging = false;
var context3_dragging = false;

// adicionando os eventos para os canvas
//canvasFrente.addEventListener('click', mouseclick_context1, false);
canvasFrente.addEventListener('mousedown', mousedown_context1, false);
canvasFrente.addEventListener('mouseup', mouseup_context1, false);
canvasFrente.addEventListener('mousemove', mousemove_context1, false);
canvasFrente.addEventListener('mousewheel', mousewheel_context1, false);

//canvasTopo.addEventListener('click', mouseclick_context2, false);
canvasTopo.addEventListener('mousedown', mousedown_context2, false);
canvasTopo.addEventListener('mouseup', mouseup_context2, false);
canvasTopo.addEventListener('mousemove', mousemove_context2, false);
canvasTopo.addEventListener('mousewheel', mousewheel_context2, false);

//canvasTopo.addEventListener('click', mouseclick_context2, false);
canvasLateral.addEventListener('mousedown', mousedown_context3, false);
canvasLateral.addEventListener('mouseup', mouseup_context3, false);
canvasLateral.addEventListener('mousemove', mousemove_context3, false);
canvasLateral.addEventListener('mousewheel', mousewheel_context3, false);


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