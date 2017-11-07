function mudaView() {

    let valor = $('#visao').val();

    switch (valor) {
        case '1':
            canvasTopo.style.display = 'none';
            canvasLateral.style.display = 'none';
            canvasPerspectiva.style.display = 'none';
            canvasFrente.style.display = 'inline';

            canvasFrente.width = 800;
            canvasFrente.height = 600;

            maximized = true;
            desenhaPoligono();

            break;
        case '2':
            canvasFrente.style.display = 'none';
            canvasLateral.style.display = 'none';
            canvasPerspectiva.style.display = 'none';
            canvasTopo.style.display = 'inline';

            canvasTopo.width = 800;
            canvasTopo.height = 600;

            maximized = true;
            desenhaPoligono();

            break;
        case '3':
            canvasTopo.style.display = 'none';
            canvasFrente.style.display = 'none';
            canvasPerspectiva.style.display = 'none';
            canvasLateral.style.display = 'inline';

            canvasLateral.width = 800;
            canvasLateral.height = 600;

            maximized = true;
            desenhaPoligono();

            break;
        case '4':
            canvasTopo.style.display = 'none';
            canvasLateral.style.display = 'none';
            canvasFrente.style.display = 'none';
            canvasPerspectiva.style.display = 'inline';

            canvasPerspectiva.width = 800;
            canvasPerspectiva.height = 600;

            maximized = true;
            desenhaPoligono();

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

            maximized = false;
            desenhaPoligono();

            break;
    }
}

function startCanvas(canvas, context) {

    canvas.lineWidth = 0.1;
    context.beginPath();
    for (var x = 0.5; x < 800; x += 10) {
        context.moveTo(x, 0);
        context.lineTo(x, 800);
    }

    for (var y = 0.5; y < 800; y += 10) {
        context.moveTo(0, y);
        context.lineTo(800, y);
    }

    context.strokeStyle = "#eee";
    context.stroke();
    context.closePath();
}

function reeiniciaTela() {

    context1.clearRect(0, 0, canvasFrente.width, canvasFrente.height);
    startCanvas(canvasFrente, context1);

    context2.clearRect(0, 0, canvasTopo.width, canvasTopo.height);
    startCanvas(canvasTopo, context2);

    context3.clearRect(0, 0, canvasLateral.width, canvasLateral.height);
    startCanvas(canvasLateral, context3);

    context4.clearRect(0, 0, canvasPerspectiva.width, canvasPerspectiva.height);
}


