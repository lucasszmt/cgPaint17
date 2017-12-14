//opções selecionadas
$('#desenha-poligono-regular').click(function () {
    var lados = $('#lados').val();

    var centro = new Ponto(width_default/2, height_default/2, 0);

    criarPoligono(lados, 60, centro);
    desenhaPoligono();

    $('#lados').val('');
    $('#raio').val('');
});

$('#gerar-revolucao').click(function () {

    if(poligono_selected != -1){
        poligono = poligonos3D[poligono_selected];

        var eixo = $('#eixo_revolucao').val();
        var angulo = $('#angulo').val();
        var secoes = $('#secoes').val();
        var gap = $('#gap').val();
        revolucao(poligono, eixo, angulo, secoes, gap);
    }

});

$('#cisalhamento').click(function () {

    if(poligono_selected != -1){
        poligono = poligonos3D[poligono_selected];

        var eixo = $('#eixo-cisalhamento').val();
        var sh = $('#sh').val();

        cisalhamento(poligono, sh, eixo);
    }
});

$("#opt-select").change(function() {
    if(this.checked) {
        tool = 'select';
    }
});

$("#opt-move").change(function() {
    if(this.checked) {
        tool = 'move';
    }
});

$("#opt-rotation").change(function() {
    if(this.checked) {
        tool = 'rotation';
    }
});

$("#opt-resize").change(function() {
    if(this.checked) {
        tool = 'resize';
    }
});

$("#opt-pencil").change(function() {
    if(this.checked) {
        tool = 'pencil';
    }
});


$('#save').click(function () {
    var a = document.createElement("a");

    var clone = JSON.stringify(poligonos3D);

    var file = new Blob([clone], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'vaio3D.uau';
    a.click();
});

$('#open').click(function(event) {
     var input = event.target;

     var reader = new FileReader();
     reader.onload = function(){
         var text = reader.result;

         var clone = JSON.retrocycle(JSON.parse(text));

         console.log(clone);
         vertices        = clone[0];
         arestas         = clone[1];
         poligonos       = clone[2];

         Canvas1.desenha();
     };
     reader.readAsText(input.files[0]);
});

$('#open').click(function() {
    $('#file-input').trigger('click');
});
