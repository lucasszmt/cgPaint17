function criarPoligono(lados, raio, centro) {

    var arestas = [];
    var vertices = [];
    var faces = [];

    let theta = 360.00 / lados;

    let ponto_temp;
    let ponto_atual;

    for (let i = 0; i < lados; i++) {

        aux1 = raio * Math.cos(2 * Math.PI * i / lados + theta) + centro.x;
        aux2 = raio * Math.sin(2 * Math.PI * i / lados + theta) + centro.y;

        if (i === 0) {
            ponto_temp = new Ponto(aux1, aux2, centro.x);
            vertices.push(ponto_temp);
        } else {
            ponto_atual = new Ponto(aux1, aux2, centro.x);
            vertices.push(ponto_atual);
            arestas.push(new Aresta(ponto_temp, ponto_atual));
            ponto_temp = ponto_atual;
        }
    }
    arestas.push(new Aresta(ponto_temp, vertices[0]));

    faces.push(new Face(arestas));

    poligonos3D.push(new Poligono(arestas, vertices, faces, 'white', 'black'));
}

function desenhaPoligono() {

    var zoom = 1;

    if(maximized){
        zoom = 2;
    }

    reeiniciaTela();

    poligonos3D.forEach(function (poligono) {

       context1.strokeStyle = poligono.cor_aresta;

        poligono.faces.forEach(function (face) {

            face.arestas.forEach(function (aresta) {

                context1.beginPath();
                context1.moveTo(aresta.pontoA.x * zoom, aresta.pontoA.y * zoom);
                context1.lineTo(aresta.pontoB.x * zoom, aresta.pontoB.y * zoom);

                context1.closePath();
                context1.stroke();

            });

        });
    });

    poligonos3D.forEach(function (poligono) {

        context2.strokeStyle = poligono.cor_aresta;

        poligono.faces.forEach(function (face) {
            context2.beginPath();
            face.arestas.forEach(function (aresta) {


                context2.moveTo(aresta.pontoA.x * zoom, aresta.pontoA.z * zoom);
                context2.lineTo(aresta.pontoB.x * zoom, aresta.pontoB.z * zoom);


            });
            context2.closePath();
            context2.fillStyle = 'blue';
            context2.fill();

            context2.stroke();
        });
    });

    poligonos3D.forEach(function (poligono) {

        context3.strokeStyle = poligono.cor_aresta;

        poligono.faces.forEach(function (face) {
            face.arestas.forEach(function (aresta) {

                context3.beginPath();
                context3.moveTo(aresta.pontoA.z * zoom, aresta.pontoA.y * zoom);
                context3.lineTo(aresta.pontoB.z * zoom, aresta.pontoB.y * zoom);
                context3.closePath();
                context3.stroke();

            });
        });
    });

    poligonos3D.forEach(function (poligono) {

        context4.strokeStyle = poligono.cor_aresta;

        poligono.faces.forEach(function (face) {
            face.arestas.forEach(function (aresta) {

                var Mpontos = [];

                Mpontos[0] = [];
                Mpontos[1] = [];
                Mpontos[2] = [];
                Mpontos[3] = [];

                Mpontos[0][0] = aresta.pontoA.x;
                Mpontos[1][0] = aresta.pontoA.y;
                Mpontos[2][0] = aresta.pontoA.z;
                Mpontos[3][0] = 1;

                Mpontos[0][1] = aresta.pontoB.x;
                Mpontos[1][1] = aresta.pontoB.y;
                Mpontos[2][1] = aresta.pontoB.z;
                Mpontos[3][1] = 1;

                var pontosfinal = multiplicaMatriz(projetor, Mpontos);

                for (let j = 0; j < 2; j++) {
                    pontosfinal[0][j] = pontosfinal[0][j] / pontosfinal[3][j];
                    pontosfinal[1][j] = pontosfinal[1][j] / pontosfinal[3][j];
                    pontosfinal[2][j] = pontosfinal[2][j] / pontosfinal[3][j];
                    pontosfinal[3][j] = pontosfinal[3][j] / pontosfinal[3][j];
                }

                context4.beginPath();
                context4.moveTo(pontosfinal[0][0] * zoom, pontosfinal[1][0] * zoom);
                context4.lineTo(pontosfinal[0][1] * zoom, pontosfinal[1][1] * zoom);
                context4.closePath();
                context4.stroke();

            });
        });
    });

}

function translar(poligono, value1, value2, op) {

    switch (op){
        case 1:
            var centroide = poligono.centroide;

            var diff1 = value1 - centroide.x;
            var diff2 = value2 - centroide.y;

            poligono.vertices.forEach(function (vertice) {
                vertice.x += diff1;
                vertice.y += diff2;
            });
            break;
        case 2:
            var centroide = poligono.centroide;

            var diff1 = value1 - centroide.x;
            var diff2 = value2 - centroide.z;

            poligono.vertices.forEach(function (vertice) {
                vertice.x += diff1;
                vertice.z += diff2;
            });
            break;
        case 3:
            var centroide = poligono.centroide;

            var diff1 = value2 - centroide.y;
            var diff2 = value1 - centroide.z;

            poligono.vertices.forEach(function (vertice) {
                vertice.y += diff1;
                vertice.z += diff2;
            });
            break;
    }

    desenhaPoligono();
}

function escalonar(poligono, plus) {

    var centroide = poligono.centroide;

    poligono.vertices.forEach(function (vertice) {
        vertice.x = ((vertice.x - centroide.x) * plus) + centroide.x;
        vertice.y = ((vertice.y - centroide.y) * plus) + centroide.y;
        vertice.z = ((vertice.z - centroide.z) * plus) + centroide.z;
    });

    desenhaPoligono();
}

function revolucao(poligono, eixo, angulo, secoes, gap){

    var graus = 0;

    var centroide = poligono.centroide;

    var origem = [[1, 0, 0, -centroide.x],
                [0, 1, 0, -centroide.y + poligono.raio + parseInt(gap)],
                [0, 0, 1, -centroide.z],
                [0, 0, 0, 1]];

    var pos = [[1, 0, 0, centroide.x],
                [0, 1, 0, centroide.y + poligono.raio + parseInt(gap)],
                [0, 0, 1, centroide.z],
                [0, 0, 0, 1]];

    var graus_section = angulo/secoes;

    for (let i = 0; i <= secoes; i++) {

        graus += graus_section;

        var value = (graus * Math.PI)/180;

        var rot_x = [[1, 0, 0, 0],
                    [0, Math.cos(value), -Math.sin(value), 0],
                    [0, Math.sin(value), Math.cos(value), 0],
                    [0, 0, 0, 1]];

        var rot_y = [[Math.cos(value), 0, Math.sin(value), 0],
                        [0, 1, 0, 0],
                        [-Math.sin(value), 0, Math.cos(value), 0],
                        [0, 0, 0, 1]];

        var rot_z = [[Math.cos(value), -Math.sin(value), 0, 0],
                    [Math.sin(value), Math.cos(value), 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]];

        var Mpontos = [];
        var count = 0;

        Mpontos[0] = [];
        Mpontos[1] = [];
        Mpontos[2] = [];
        Mpontos[3] = [];

        poligono.faces[0].arestas.forEach(function (aresta) {

            Mpontos[0][count] = aresta.pontoA.x;
            Mpontos[1][count] = aresta.pontoA.y;
            Mpontos[2][count] = aresta.pontoA.z;
            Mpontos[3][count] = 1;

            ++count;
        });

        switch (eixo) {
            case 'x':
                var M = multiplicaMatriz(rot_x, origem);
                var Mfinal = multiplicaMatriz(pos, M);
                break;
            case 'y':
                var M = multiplicaMatriz(rot_y, origem);
                var Mfinal = multiplicaMatriz(pos, M);
                break;
            case 'z':
                var M = multiplicaMatriz(rot_z, origem);
                var Mfinal = multiplicaMatriz(pos, M);
                break;
        }

        var pontosfinal = multiplicaMatriz(Mfinal, Mpontos);

        var newpontos = [];
        for (let j = 0; j < count; j++) {
            pontosfinal[0][j] = pontosfinal[0][j] / pontosfinal[3][j];
            pontosfinal[1][j] = pontosfinal[1][j] / pontosfinal[3][j];
            pontosfinal[2][j] = pontosfinal[2][j] / pontosfinal[3][j];
            pontosfinal[3][j] = pontosfinal[3][j] / pontosfinal[3][j];

            var ponto = new Ponto(pontosfinal[0][j], pontosfinal[1][j], pontosfinal[2][j])

            newpontos.push(ponto);
            poligono.vertices.push(ponto);

        }

        var arestas = [];

        for (let x = 0; x < count; x++) {

            if (x == 0) {
                ponto_temp = newpontos[x];
            } else {
                ponto_atual = newpontos[x];
                arestas.push(new Aresta(ponto_temp, ponto_atual));
                ponto_temp = ponto_atual;
            }
        }

        arestas.push(new Aresta(ponto_temp, newpontos[0]));

        poligono.faces.push(new Face(arestas));

    }

    delete poligono.faces[0];

    var faces_aux = [];

    poligono.faces.forEach(function (face, index) {

        var arestas = [];

        var face_aux;

        if(poligono.faces.length - 1 != index){

            face_aux = poligono.faces[index + 1];

            for (let i = 0; i < face.arestas.length; i++) {
                arestas.push(face.arestas[i]);
                arestas.push(face_aux.arestas[i]);

                var a = new Aresta(face.arestas[i].pontoA, face_aux.arestas[i].pontoA);
                var b = new Aresta(face.arestas[i].pontoB, face_aux.arestas[i].pontoB);

                arestas.push(a);
                arestas.push(b);
            }
        }

        faces_aux.push(new Face(arestas));
    });

    poligono.faces = faces_aux;

    desenhaPoligono();
}

function rotacao(poligono, option) {

    var centroide = poligono.centroide;

    var origem = [[1, 0, 0, -centroide.x],
                [0, 1, 0, -centroide.y],
                [0, 0, 1, -centroide.z],
                [0, 0, 0, 1]];

    var pos = [[1, 0, 0, centroide.x],
                    [0, 1, 0, centroide.y],
                    [0, 0, 1, centroide.z],
                    [0, 0, 0, 1]];

    var value = (10 * Math.PI)/180;

    var rot_x = [[1, 0, 0, 0],
                [0, Math.cos(value), -Math.sin(value), 0],
                [0, Math.sin(value), Math.cos(value), 0],
                [0, 0, 0, 1]];

    var rot_y = [[Math.cos(value), 0, Math.sin(value), 0],
                [0, 1, 0, 0],
                [-Math.sin(value), 0, Math.cos(value), 0],
                [0, 0, 0, 1]];

    var rot_z = [[Math.cos(value), -Math.sin(value), 0, 0],
                [Math.sin(value), Math.cos(value), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]];


    var Mpontos = [];
    var count = 0;

    Mpontos[0] = [];
    Mpontos[1] = [];
    Mpontos[2] = [];
    Mpontos[3] = [];

    poligono.vertices.forEach(function (vertice) {

        Mpontos[0][count] = vertice.x;
        Mpontos[1][count] = vertice.y;
        Mpontos[2][count] = vertice.z;
        Mpontos[3][count] = 1;

        ++count;
    });

    switch (option){
        case 'x':
            var M3 = multiplicaMatriz(rot_x, origem);
            var Mfinal = multiplicaMatriz(pos, M3);
            break;
        case 'y':
            var M2 = multiplicaMatriz(rot_y, origem);
            var Mfinal = multiplicaMatriz(pos, M2);
            break;
        case 'z':
            var M1 = multiplicaMatriz(rot_z, origem);
            var Mfinal = multiplicaMatriz(pos, M1);
            break;
        case 'all':
            var M1 = multiplicaMatriz(rot_z, origem);
            var M2 = multiplicaMatriz(rot_y, M1);
            var M3 = multiplicaMatriz(rot_x, M2);
            var Mfinal = multiplicaMatriz(pos, M3);
            break;
    }

    var pontosfinal = multiplicaMatriz(Mfinal, Mpontos);

    for (let j = 0; j < count; j++) {
        pontosfinal[0][j] = pontosfinal[0][j] / pontosfinal[3][j];
        pontosfinal[1][j] = pontosfinal[1][j] / pontosfinal[3][j];
        pontosfinal[2][j] = pontosfinal[2][j] / pontosfinal[3][j];
        pontosfinal[3][j] = pontosfinal[3][j] / pontosfinal[3][j];
    }

    count = 0;
    poligono.vertices.forEach(function (vertice) {

        vertice.x = pontosfinal[0][count];
        vertice.y = pontosfinal[1][count];
        vertice.z = pontosfinal[2][count];

        ++count;
    });

    desenhaPoligono();
}

function cisalhamento(poligono, sh, eixo) {

    var centroide = poligono.centroide;

    switch (eixo){
        case 'x':
            poligono.vertices.forEach(function (vertice) {
                vertice.x = ((vertice.x - centroide.x) * sh) + centroide.x;
            });
            break;

        case 'y':
            poligono.vertices.forEach(function (vertice) {
                vertice.y = ((vertice.y - centroide.y) * sh) + centroide.y;
            });
            break;

        case 'z':
            poligono.vertices.forEach(function (vertice) {
                vertice.z = ((vertice.z - centroide.z) * sh) + centroide.z;
            });
            break;
    }

    desenhaPoligono();
}

function verificaPontoPoligono(poligono, p, context) {

    var extremos = poligono.extremos;

    switch (context){
        case 1:
            if (p.x < extremos[3] || p.x > extremos[0] ||
                p.y < extremos[4] || p.y > extremos[1]) {
                return false;
            } else {
                return true;
            }
            break;
        case 2:
            if (p.x < extremos[3] || p.x > extremos[0] ||
                p.z < extremos[5] || p.z > extremos[2]) {
                return false;
            } else {
                return true;
            }
            break;
        case 3:
            if (p.z < extremos[5] || p.z > extremos[2] ||
                p.y < extremos[4] || p.y > extremos[1]) {
                return false;
            } else {
                return true;
            }
            break;
    }

}

function deleteAll(){

    poligonos3D = [];

    poligono_selected = -1;
    reeiniciaTela();

}

function deleteSelected(){

    poligonos3D.splice(poligono_selected, 1);

    poligono_selected = -1;
    desenhaPoligono();

}

var openPoligons = function(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();

    reader.onload = function(e) {

        var text = reader.result;

        var clone = JSON.parse(text);

        for (let i = 0; i < clone.length; i ++) {

            var faces = [];
            var arestas = [];
            var vertices = [];
            for (let f = 0; f < clone[i]._faces.length; f ++) {

                var arestas_aux = [];

                for (let a = 0; a < clone[i]._faces[f]._arestas.length; a ++) {

                    var pontoA = new Ponto(
                        clone[i]._faces[f]._arestas[a]._pontoA._x,
                        clone[i]._faces[f]._arestas[a]._pontoA._y,
                        clone[i]._faces[f]._arestas[a]._pontoA._z
                    );
                    var pontoB = new Ponto(
                        clone[i]._faces[f]._arestas[a]._pontoB._x,
                        clone[i]._faces[f]._arestas[a]._pontoB._y,
                        clone[i]._faces[f]._arestas[a]._pontoB._z
                    );

                    vertices.push(pontoA);
                    vertices.push(pontoB);

                    arestas.push(new Aresta(pontoA, pontoB));
                    arestas_aux.push(new Aresta(pontoA, pontoB));
                }

                faces.push(new Face(arestas_aux));
            }

            poligonos3D.push(
              new Poligono(
                  arestas, vertices, faces, clone[i]._cor, clone[i]._cor_aresta
              ));
        }

        desenhaPoligono();
    };
    reader.readAsText(file);
};

