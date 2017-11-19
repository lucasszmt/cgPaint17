function close_pencil(ev){

    ev.preventDefault();

    switch (tool){
        case 'pencil':
            if (pencil_pontos.length >= 3) {
                var arestas = [];
                var faces = [];
                var vertices = [];

                let ponto_temp;
                let ponto_atual;

                for (let i = 0; i < pencil_pontos.length; i++) {

                    if (i === 0) {
                        ponto_temp = pencil_pontos[i];
                        vertices.push(ponto_temp);
                    } else {
                        ponto_atual = pencil_pontos[i];
                        vertices.push(ponto_atual);
                        arestas.push(new Aresta(ponto_temp, ponto_atual));
                        ponto_temp = ponto_atual;
                    }
                }
                arestas.push(new Aresta(ponto_temp, vertices[0]));

                faces.push(new Face(arestas));

                poligonos3D.push(new Poligono(arestas, vertices, faces, 'white', 'black'));

                pencil_pontos = [];

                desenhaPoligono();

            } else {
                alert("Desenhe um polígono com 3 lados ao menos!");
            }
            break;
    }

}

function mouseclick_context1(ev){


    var x = ev.layerX;
    var y = ev.layerY;

    switch (tool){
        case 'select':

            var ponto = new Ponto(x, y, 0);

            var selected = false;
            for(let i = poligonos3D.length - 1; i >= 0; i--){
                selected = verificaPontoPoligono(poligonos3D[i], ponto, 1);
                if(selected){
                    if(poligono_selected != -1){
                        poligonos3D[poligono_selected].cor_aresta = 'black';
                    }
                    poligono_selected = i;
                    poligonos3D[poligono_selected].cor_aresta = 'red';
                    desenhaPoligono();
                    break;
                }
            }

            if(!selected){
                if(poligono_selected != -1){
                    poligonos3D[poligono_selected].cor_aresta = 'black';
                    desenhaPoligono();
                }
                poligono_selected = -1;
            }
            break;

        case 'pencil':

            pencil_pontos.push(new Ponto(x, y, width_default/2));

            var zoom = 1;

            if(maximized){
                zoom = 2;
            }

            if(pencil_pontos.length > 1){
                context1.strokeStyle = 'black';

                context1.beginPath();
                context1.moveTo(pencil_pontos[pencil_pontos.length - 1].x * zoom, pencil_pontos[pencil_pontos.length -1].y * zoom);
                context1.lineTo(pencil_pontos[pencil_pontos.length - 2].x * zoom, pencil_pontos[pencil_pontos.length - 2].y * zoom);

                context1.closePath();
                context1.stroke();
            }

            break;
    }
}

function mousedown_context1(ev) {
    context1_dragging = true;
}

function mousewheel_context1(ev) {

    if(poligono_selected != -1){
        switch (tool){
            case 'resize':
                if(ev.wheelDelta > 0){
                    escalonar(poligonos3D[poligono_selected], 1.1, 1);
                }else{
                    escalonar(poligonos3D[poligono_selected], 0.9, 1);
                }
                break;

            case 'rotation':
                rotacao(poligonos3D[poligono_selected], 'x');
                break;
        }
    }


}

function mouseup_context1(ev) {
    context1_dragging = false;
}

function mousemove_context1(ev) {

    var x = 0;
    var y = 0;

    if(context1_dragging){
        if (ev.layerX || ev.layerX == 0) { // Firefox
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera - Chrome
            x = ev.offsetX;
            y = ev.offsetY;
        }

        if(poligono_selected != -1){

            if(tool == 'move'){
                translar(poligonos3D[poligono_selected], x, y, 1);
            }

        }

    }

}

//Context 2

function mouseclick_context2(ev){

    var x = ev.layerX;
    var z = ev.layerY;

    switch (tool){
        case 'select':

            var ponto = new Ponto(x, 0, z);

            var selected = false;
            for(let i = poligonos3D.length - 1; i >= 0; i--){
                selected = verificaPontoPoligono(poligonos3D[i], ponto, 2);
                if(selected){
                    if(poligono_selected != -1){
                        poligonos3D[poligono_selected].cor_aresta = 'black';
                    }
                    poligono_selected = i;
                    poligonos3D[poligono_selected].cor_aresta = 'red';
                    desenhaPoligono();

                    break;

                }
            }

            if(!selected){
                if(poligono_selected != -1){
                    poligonos3D[poligono_selected].cor_aresta = 'black';
                    desenhaPoligono();
                }
                poligono_selected = -1;
            }

            break;
        case 'pencil':

            pencil_pontos.push(new Ponto(x, (width_default/2), z));

            var zoom = 1;

            if(maximized){
                zoom = 2;
            }

            if(pencil_pontos.length > 1){
                context2.strokeStyle = 'black';

                context2.beginPath();
                context2.moveTo(pencil_pontos[pencil_pontos.length - 1].x * zoom, pencil_pontos[pencil_pontos.length -1].z * zoom);
                context2.lineTo(pencil_pontos[pencil_pontos.length - 2].x * zoom, pencil_pontos[pencil_pontos.length - 2].z * zoom);

                context2.closePath();
                context2.stroke();
            }

            break;
    }
}

function mousedown_context2(ev) {
    context2_dragging = true;
}

function mousewheel_context2(ev) {

    if(poligono_selected != -1){

        switch (tool) {
            case 'resize':
                if (ev.wheelDelta > 0) {
                    escalonar(poligonos3D[poligono_selected], 1.1, 1);
                } else {
                    escalonar(poligonos3D[poligono_selected], 0.9, 1);
                }
                break;

            case 'rotation':
                rotacao(poligonos3D[poligono_selected], 'z');
                break;
        }
    }
}

function mouseup_context2(ev) {
    context2_dragging = false;
}

function mousemove_context2(ev) {

    var x = 0;
    var y = 0;

    if(context2_dragging){
        if (ev.layerX || ev.layerX == 0) { // Firefox
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera - Chrome
            x = ev.offsetX;
            y = ev.offsetY;
        }

        if(poligono_selected != -1){
            if (tool == 'move') {

                translar(poligonos3D[poligono_selected], x, y, 2);
            }
        }

    }

}

//Context 3

function mouseclick_context3(ev){

    var z = ev.layerX;
    var y = ev.layerY;

    switch (tool){
        case 'select':
            var z = ev.layerX;
            var y = ev.layerY;
            var ponto = new Ponto(0, y, z);

            var selected = false;

            for(let i = poligonos3D.length - 1; i >= 0; i--){
                selected = verificaPontoPoligono(poligonos3D[i], ponto, 3);
                if(selected){
                    if(poligono_selected != -1){
                        poligonos3D[poligono_selected].cor_aresta = 'black';
                    }
                    poligono_selected = i;
                    poligonos3D[poligono_selected].cor_aresta = 'red';
                    desenhaPoligono();

                    break;

                }
            }

            if(!selected){
                if(poligono_selected != -1){
                    poligonos3D[poligono_selected].cor_aresta = 'black';
                    desenhaPoligono();
                }
                poligono_selected = -1;
            }
            break;

        case 'pencil':

            pencil_pontos.push(new Ponto((width_default/2), y, z));

            var zoom = 1;

            if(maximized){
                zoom = 2;
            }

            if(pencil_pontos.length > 1){
                context3.strokeStyle = 'black';

                context3.beginPath();
                context3.moveTo(pencil_pontos[pencil_pontos.length - 1].z * zoom, pencil_pontos[pencil_pontos.length -1].y * zoom);
                context3.lineTo(pencil_pontos[pencil_pontos.length - 2].z * zoom, pencil_pontos[pencil_pontos.length - 2].y * zoom);

                context3.closePath();
                context3.stroke();
            }

            break;
    }
}

function mousedown_context3(ev) {
    context3_dragging = true;
}

function mousewheel_context3(ev) {

    if(poligono_selected != -1){

        switch (tool) {
            case 'resize':
                if (ev.wheelDelta > 0) {
                    escalonar(poligonos3D[poligono_selected], 1.1, 1);
                } else {
                    escalonar(poligonos3D[poligono_selected], 0.9, 1);
                }
                break;

            case 'rotation':
                rotacao(poligonos3D[poligono_selected], 'y');
                break;
        }
    }
}

function mouseup_context3(ev) {
    context3_dragging = false;
}

function mousemove_context3(ev) {

    var x = 0;
    var y = 0;

    if(context3_dragging){
        if (ev.layerX || ev.layerX == 0) { // Firefox
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera - Chrome
            x = ev.offsetX;
            y = ev.offsetY;
        }

        if(poligono_selected != -1){
            if (tool == 'move') {
                translar(poligonos3D[poligono_selected], x, y, 3);
            }
        }

    }

}