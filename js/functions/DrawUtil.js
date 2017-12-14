function fillPoligonoContext1(face, color){

    var zoom = 1;

    if (maximized) {
        zoom = 2;
    }

    var width = canvasFrente.width;
    var height = canvasFrente.height;

    var extremos = face.extremos;

    for(let i = extremos[4]; i < extremos[1]; i++){

        let scanline = new Aresta(new Ponto(0, i , 0), new Ponto(width, i, 0));
        var pontos = [];

        face.arestas.forEach(function (aresta) {

            if(intercepta(scanline.pontoA, scanline.pontoB, aresta.pontoA, aresta.pontoB)){

                let pteste = interseccao(aresta, scanline);

                if(pteste){
                    pontos.push(pteste);
                }
            }

        });

        if(pontos.length == 1){
            continue;
        }


        if ((pontos.length % 2) != 0) { //Resolve o problema de vertice compartilhado
            for (let y = 0; y < pontos.length; y++) {
                for (let w = y + 1; w < pontos.length; w++) {
                    if ((pontos[y].x == pontos[w].x) && (pontos[y].y == pontos[w].y)) {
                        pontos.splice(w, 1);
                    }
                }
            }
        }

        pontos.sort(function(a, b) {
            return a.x - b.x;
        });

        var contaux = 0;

        while (contaux < pontos.length) { // Pinta conforme a paridade

            var p1 = new Ponto(pontos[contaux].x, pontos[contaux].y, 0);
            ++contaux;

            var p2 = new Ponto(pontos[contaux].x, pontos[contaux].y, 0);
            ++contaux;

            context1.strokeStyle = color;

            context1.beginPath();
            context1.moveTo(p1.x * zoom, p1.y * zoom);
            context1.lineTo(p2.x * zoom, p2.y * zoom);

            context1.closePath();
            context1.stroke();
        }


    }
}

function fillPoligonoContext2(face, color){

    var zoom = 1;

    if (maximized) {
        zoom = 2;
    }

    var width = canvasFrente.width;
    var height = canvasFrente.height;

    var extremos = face.extremos;

    for(let i = extremos[5]; i < extremos[2]; i++){

        let scanline = new Aresta(new Ponto(0, 0 , i), new Ponto(width, 0, i));
        var pontos = [];

        face.arestas.forEach(function (aresta) {

            if(intercepta(scanline.pontoA, scanline.pontoB, aresta.pontoA, aresta.pontoB)){


                let pteste = interseccao(aresta, scanline);

                if(pteste){
                    pontos.push(pteste);
                }
            }

        });

        if(pontos.length == 1){
            continue;
        }


        if ((pontos.length % 2) != 0) { //Resolve o problema de vertice compartilhado
            for (let y = 0; y < pontos.length; y++) {
                for (let w = y + 1; w < pontos.length; w++) {
                    if ((pontos[y].x == pontos[w].x) && (pontos[y].z == pontos[w].z)) {
                        pontos.splice(w, 1);
                    }
                }
            }
        }

        pontos.sort(function(a, b) {
            return a.x - b.x;
        });

        var contaux = 0;

        while (contaux < pontos.length) { // Pinta conforme a paridade

            var p1 = new Ponto(pontos[contaux].x, pontos[contaux].y, 0);
            ++contaux;

            var p2 = new Ponto(pontos[contaux].x, pontos[contaux].y, 0);
            ++contaux;

            context2.strokeStyle = color;

            context2.beginPath();
            context2.moveTo(p1.x * zoom, p1.y * zoom);
            context2.lineTo(p2.x * zoom, p2.y * zoom);

            context2.closePath();
            context2.stroke();
        }


    }
}
