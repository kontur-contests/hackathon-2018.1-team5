var socket = io();


var mapC = document.getElementById("map");
var map = mapC.getContext("2d");

mapC.width = 1024;
mapC.height = 768;


var playerC = document.getElementById("player");
var objM = playerC.getContext("2d");


playerC.width = 1024;
playerC.height = 768;


var objC = document.getElementById("obj");
var objI = objC.getContext("2d");


objC.width = 1024;
objC.height = 768;


conn.hello();

socket.on('adduser', function(data) {
    name = data.player;

});


var control = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
    "mouseX": 0,
    "mouseY": 0,
}


var centerX = 150;
var centerY = 200;
var radius = 100;
var startingAngle = 1.25 * Math.PI;
var endingAngle = 1.75 * Math.PI;

// Рисуем дугу на основе этой информации
// objI.arc(centerX, centerY, radius, startingAngle, endingAngle);
// objI.stroke();


socket.on('up', function(data) {
    number = 0;
    // $('.info').text(JSON.stringify(data));
    map.clearRect(0, 0, mapC.width, mapC.height);
    objI.clearRect(0, 0, mapC.width, mapC.height);
    objM.clearRect(0, 0, mapC.width, mapC.height);


    for (var i = 0; i < data.map.mapa.length; i++) {
        // data.map.mapa[i]
        for (var j = 0; j < data.map.mapa[i].length; j++) {

            for (var k = 0; k < data.players.length; k++) {
                if (data.players[k].name == socket.json.id) number = k;
            }

            tx = data.map.mapa[j][i][0];
            ty = data.map.mapa[j][i][1];
            x = 64 * i;
            y = 64 * j;
            // x = x + data.players[number].x;
            // y = y + data.players[number].y;
            // console.log(tx + "/" + ty)
            map.drawImage(texture, 64 * tx, 64 * ty, 64, 64, x, y, 64, 64);



            //player
            for (var p = 0; p < data.players.length; p++) {
                xP = data.players[p].x;
                yP = data.players[p].y;
                ratP = data.players[p].rat;

                // objI.arc(xP, yP, radius, startingAngle, endingAngle);
                // objI.stroke();
                drawRotatedImage(man, xP, yP, ratP);
            }



        }
    }

    // map.drawImage(texture, 74*5, 74*5, 64, 64, 0, 0, 64, 64);

    socket.emit('move', { player: name, control: control });
});








var TO_RADIANS = Math.PI / 180;

function drawRotatedImage(image, x, y, angle) {
    objM.save();
    objM.translate(x, y);
    objM.rotate(TO_RADIANS * angle);
    objM.drawImage(image, -(image.width / 2), -(image.height / 2));
    objM.restore();
}


$(document).mousemove(function(e) {
    CW = $(document).width();
    CH = $(document).height();
    x = e.pageX - CW / 2
    y = e.pageY - CH / 2
    control.mouseX = x;
    control.mouseY = y;
});

$(document).keydown(function(eventObject) {
    switch (eventObject.which) {
        case 87:
            control.w = true;
            break;

        case 65:
            control.a = true;
            break;

        case 83:
            control.s = true;
            break;

        case 68:
            control.d = true;
            break;

        default:
            break;
    }
});

$(document).keyup(function(eventObject) {
    switch (eventObject.which) {
        case 87:
            control.w = false;
            break;

        case 65:
            control.a = false;
            break;

        case 83:
            control.s = false;
            break;

        case 68:
            control.d = false;
            break;

        default:
            break;
    }

});