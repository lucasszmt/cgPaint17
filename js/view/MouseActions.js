function mousedown_context1(ev) {
    context1_dragging = true;
}

function mousewheel_context1(ev) {

    poligono = poligonos3D.pop();
    poligonos3D.push(poligono);

    switch (tool){
        case 'resize':
            if(ev.wheelDelta > 0){
                escalonar(poligono, 1.1, 1);
            }else{
                escalonar(poligono, 0.9, 1);
            }
            break;

        case 'rotation':
            rotacao(poligono, 'x');
            break;
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

        if(tool == 'move'){
            poligono = poligonos3D.pop();
            poligonos3D.push(poligono);

            translar(poligono, x, y, 1);
        }

    }

}

//Context 2

function mousedown_context2(ev) {
    context2_dragging = true;
}

function mousewheel_context2(ev) {

    poligono = poligonos3D.pop();
    poligonos3D.push(poligono);

    switch (tool){
        case 'resize':
            if(ev.wheelDelta > 0){
                escalonar(poligono, 1.1, 1);
            }else{
                escalonar(poligono, 0.9, 1);
            }
            break;

        case 'rotation':
            rotacao(poligono, 'z');
            break;
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

        if(tool == 'move'){
            poligono = poligonos3D.pop();
            poligonos3D.push(poligono);

            translar(poligono, x, y, 2);
        }

    }

}

//Context 3

function mousedown_context3(ev) {
    context3_dragging = true;
}

function mousewheel_context3(ev) {

    poligono = poligonos3D.pop();
    poligonos3D.push(poligono);

    switch (tool){
        case 'resize':
            if(ev.wheelDelta > 0){
                escalonar(poligono, 1.1, 1);
            }else{
                escalonar(poligono, 0.9, 1);
            }
            break;

        case 'rotation':
            rotacao(poligono, 'y');
            break;
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

        if(tool == 'move'){
            poligono = poligonos3D.pop();
            poligonos3D.push(poligono);

            translar(poligono, x, y, 3);
        }

    }

}