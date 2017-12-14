/**
 * Método para criação de poligonos regulares
 * @param lados
 * @param raio
 * @param centro
 */
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
    console.log(new Poligono(arestas, vertices, faces, 'white', 'black'))
}

function ordenaFaces(faces, coordenada) {
    faces.sort(function(a, b) {
        return a.centroide[coordenada] - b.centroide[coordenada];
    });
}

/**
 * todo pintar todos os poligosno
 */
function desenhaPoligono() {

    var zoom = 1;

    if (maximized) {
        zoom = 2;
    }

    reeiniciaTela();

    poligonos3D.forEach(function (poligono) {

        context1.strokeStyle = poligono.cor_aresta;

        var faces = [];

        poligono.faces.forEach(function (face) {

            var norma = calculoDaNormal(face.arestas[0].pontoA,
                face.arestas[0].pontoB,
                face.arestas[1].pontoB,
                new Ponto(200, 150, 1000)
            );

            if(norma){
                faces.push(face);
            }

        });

        ordenaFaces(faces, 'z');

        faces.forEach(function (face) {

            fillPoligonoContext1(face, poligono.cor);

            context1.strokeStyle = poligono.cor_aresta;

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

        var faces = [];

        poligono.faces.forEach(function (face) {

            var norma = calculoDaNormal(face.arestas[0].pontoA,
                face.arestas[0].pontoB,
                face.arestas[1].pontoB,
                new Ponto(200, 1000, 150)
            );

            if(norma){
                faces.push(face);
            }

        });

        ordenaFaces(faces, 'y');

        faces.forEach(function (face) {

            fillPoligonoContext2(face, 'green');

            context2.strokeStyle = poligono.cor_aresta;

            face.arestas.forEach(function (aresta) {

                context2.beginPath();
                context2.moveTo(aresta.pontoA.x * zoom, aresta.pontoA.z * zoom);
                context2.lineTo(aresta.pontoB.x * zoom, aresta.pontoB.z * zoom);

                context2.closePath();
                context2.stroke();

            });

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

function interseccao(Line1, Line2) {

    //Retorna o Ponto interseccao das duas retas
    // Numerador
    let p1x = Line1.pontoA.x;
    let p1y = Line1.pontoA.y;
    let p2x = Line1.pontoB.x;
    let p2y = Line1.pontoB.y;
    let p3x = Line2.pontoA.x;
    let p3y = Line2.pontoA.y;
    let p4x = Line2.pontoB.x;
    let p4y = Line2.pontoB.y;

    let na = (((p4x - p3x) * (p1y - p3y)) - ((p4y - p3y) * (p1x - p3x)));
    let nb = (((p2x - p1x) * (p1y - p3y)) - ((p2y - p1y) * (p1x - p3x)));
    // Denominador
    let da = (((p4y - p3y) * (p2x - p1x)) - ((p4x - p3x) * (p2y - p1y)));
    let db = (((p4y - p3y) * (p2x - p1x)) - ((p4x - p3x) * (p2y - p1y)));

    let ua = na / da;
    let ub = nb / db;

    // Se elas são paralelas ou coincidentes
    if (da == 0 && db == 0) {
        // Paralelas
        return null;
    }

    if (na == 0 && nb == 0) {
        // Coincidentes
        return null;
    }

    let X = p1x + ua * (p2x - p1x);
    let Y = p1y + ua * (p2y - p1y);

    return new Ponto(parseInt(X), parseInt(Y), 0);  //Retorna o ponto de interseccao
}


function translar(poligono, value1, value2, op) {

    switch (op) {
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

function revolucao(poligono, eixo, angulo, secoes, gap) {

    var graus = 0;

    var centroide = poligono.centroide;
    //move centroide pra origem + raio + gap
    var origem = [[1, 0, 0, -centroide.x],
        [0, 1, 0, -centroide.y + poligono.raio + parseInt(gap)],
        [0, 0, 1, -centroide.z],
        [0, 0, 0, 1]];
    // retorna
    var pos = [[1, 0, 0, centroide.x],
        [0, 1, 0, centroide.y + poligono.raio + parseInt(gap)],
        [0, 0, 1, centroide.z],
        [0, 0, 0, 1]];

    // graus das sessões
    var graus_section = angulo / secoes;

    for (let i = 0; i <= secoes; i++) {

        graus += graus_section;

        //radianos
        var value = (graus * Math.PI) / 180;

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
        //norma
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

    // cria as faces laterais
    poligono.faces.forEach(function (face, index) {

        if (poligono.faces.length - 1 != index) {

            var face_aux = poligono.faces[index + 1];

            for (let i = 0; i < face.arestas.length; i++) {

                var arestas = [];

                var a = new Aresta(face.arestas[i].pontoA, face_aux.arestas[i].pontoA);
                var b = new Aresta(face.arestas[i].pontoB, face_aux.arestas[i].pontoB);

                arestas.push(face.arestas[i]);

                arestas.push(a);

                arestas.push(face_aux.arestas[i]);

                arestas.push(b);

                faces_aux.push(new Face(arestas));
            }


        }
    });

    poligono.faces = faces_aux;

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

    var value = (10 * Math.PI) / 180;

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

    switch (option) {
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

    switch (eixo) {
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

    switch (context) {
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

function deleteAll() {

    poligonos3D = [];

    poligono_selected = -1;
    reeiniciaTela();

}

function deleteSelected() {

    poligonos3D.splice(poligono_selected, 1);

    poligono_selected = -1;
    desenhaPoligono();

}

var openPoligons = function (e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();

    reader.onload = function (e) {

        var text = reader.result;

        var clone = JSON.parse(text);

        for (let i = 0; i < clone.length; i++) {

            var faces = [];
            var arestas = [];
            var vertices = [];
            for (let f = 0; f < clone[i]._faces.length; f++) {

                var arestas_aux = [];

                for (let a = 0; a < clone[i]._faces[f]._arestas.length; a++) {

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


/**
 * Realiza o calculo da normal
 *
 * @param p1
 * @param p2
 * @param p3
 * @param n
 * @returns {boolean}
 */
function calculoDaNormal(p1, p2, p3, vrp) {

    var a = (p3.y - p2.y) * (p1.z - p2.z) - (p1.y - p2.y) * (p3.z - p2.z);
    var b = (p3.z - p2.z) * (p1.x - p2.x) - (p1.z - p2.z) * (p3.x - p2.x);
    var c = (p3.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (p3.y - p2.y);

    var d = -(a * p2.x) - (b * p2.y) - (c * p2.z);

    var total = (a * vrp.x) + (b * vrp.y) + (c * vrp.z) + d;

    if (total > 0) {
        return true
    } else {
        return false;
    }
}

/**
 * Realiza o cálculo da normal para um dado poligono como parâmetro
 *
 * @param poligono
 */
function facesVisiveis(poligono) {
    faces_visiveis = [];
    poligono.faces.forEach(function (face) {
        console.log(face);
        // if (face.arestas.length > 0) {
        if (calculoDaNormal(face.arestas[0].pontoA,
                face.arestas[0].pontoB,
                face.arestas[1].pontoB, v_n)) {
            faces_visiveis.push(face);
        }
        // }
    });
}

/**
 * Verifica se q está entre p e r
 * @param p
 * @param q
 * @param r
 * @returns {boolean}
 */
function onSegment(p, q, r) {
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
        return true;
    return false;
}

function orientacao(p, q, r) {
    var val = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0;  // colinear
    return (val > 0) ? 1 : 2; // clock or counterclock wise
}

/**
 * Verifica se duas retas se interceptam
 *
 * @param p1
 * @param q1
 * @param p2
 * @param q2
 * @returns {boolean}
 */
function intercepta(p1, q1, p2, q2) {
    // Find the four orientations needed for general and
    // special cases
    var o1 = orientacao(p1, q1, p2);
    var o2 = orientacao(p1, q1, q2);
    var o3 = orientacao(p2, q2, p1);
    var o4 = orientacao(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4)
        return true;

    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    if (o1 == 0 && onSegment(p1, p2, q1)) return true;

    // p1, q1 and p2 are colinear and q2 lies on segment p1q1
    if (o2 == 0 && onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    if (o3 == 0 && onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    if (o4 == 0 && onSegment(p2, q1, q2)) return true;

    return false;
}

function isInside(polygon, p) {

    // Create a point for line segment from p to infinite
    var extreme = new Ponto(Number.POSITIVE_INFINITY, p.y);

    // Count intersections of the above line with sides of polygon
    var count = 0, i = 0;
    do {
        var next = (i + 1) % n;

        // Check if the line segment from 'p' to 'extreme' intersects
        // with the line segment from 'polygon[i]' to 'polygon[next]'
        if (intercepta(polygon[i], polygon[next], p, extreme)) {
            // If the point 'p' is colinear with line segment 'i-next',
            // then check if it lies on segment. If it lies, return true,
            // otherwise false
            if (orientacao(polygon[i], p, polygon[next]) == 0)
                return onSegment(polygon[i], p, polygon[next]);

            count++;
        }
        i = next;
    } while (i != 0);

    // Return true if count is odd, false otherwise
    return count % 2 == 1;  // Same as (count%2 == 1)
}
