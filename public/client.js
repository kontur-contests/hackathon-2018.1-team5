var socket = io('10.34.32.57');

var mapC = document.getElementById("map");
var mapL = mapC.getContext("2d");

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

var inteface = document.getElementById("obj");
var inteface = inteface.getContext("2d");


inteface.width = 1024;
inteface.height = 768;

window.player = {
    x: 0,
    y: 0,
    rotation: 0,
    oxygen: 0,
    speed: 4
}


socket.on('texture', function(d) {
    localStorage.setItem("texture", JSON.stringify(d))
});
socket.on('map', function(d) {
    window.maps = d;
    // console.log(window.maps);
});
socket.on('players', function(d) {
    window.players = d;
});
socket.on('hello', function(d) {
    localStorage.setItem("token", d.token)
});

socket.on('you', function(d) {
    window.player.oxygen = d.oxygen;
});

// $(document).ready(function() {
socket.emit('hello', { username: 'test' });
// });



var control = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
    "mouseX": 0,
    "mouseY": 0,
}





function draw() {
    mapL.clearRect(0, 0, mapC.width, mapC.height);
    objI.clearRect(0, 0, mapC.width, mapC.height);
    objM.clearRect(0, 0, mapC.width, mapC.height);
    texture = JSON.parse(localStorage.getItem('texture'));
    for (var i = 0; i < texture.length; i++) {
        src = texture[i];
        texture[i] = new Image();
        texture[i].src = src;
    }

    for (var l = 0; l < 64; l++) {
        for (var j = 0; j < 16; j++) {
            for (var i = 0; i < 16; i++) {
                x = (64 * i) + 512;
                x = x + window.maps[l].x * 1024;
                y = (64 * j) + 368;
                y = y + window.maps[l].y * 1024;
                mapL.drawImage(texture[window.maps[l].map[i][j].texture], 0, 0, 64, 64, x - window.player.x, y + window.player.y, 64, 64);
            }
        }
    }
    for (var l = 0; l < 64; l++) {
        for (var j = 0; j < 16; j++) {
            for (var i = 0; i < 16; i++) {
                x = (64 * i) + 512;
                x = x + window.maps[l].x * 1024;
                y = (64 * j) + 368;
                y = y + window.maps[l].y * 1024;
                objI.drawImage(texture[window.maps[l].obj[i][j].texture], 0, 0, 64, 64, x - window.player.x, y + window.player.y, 64, 64);
            }
        }
    }
    drawRotatedImage(texture[7], 512, 368, window.player.rotation);

    for (var i = 0; i < window.players.length; i++) {
        // console.log(window.players[i].x)
        if (window.players[i].token != localStorage.getItem('token')) {
            objM.font = "14px Tahoma";
            objM.strokeStyle = "black";
            objM.strokeText(window.players[i].token, window.players[i].x + 400 - window.player.x, -window.players[i].y + 335 + window.player.y);
            drawRotatedImage(texture[7], window.players[i].x + 512 - window.player.x, -window.players[i].y + 368 + window.player.y, window.players[i].rotation);
            // objM.drawImage(texture[11], window.players[i].x+512- window.player.x, -window.players[i].y+368+ window.player.y);
        }
    }
    socket.emit('you', window.player);

    rotation = Math.atan2(control.mouseX, control.mouseY);
    rotation = rotation * 180 / 3.14159265;
    rotation = 450 - rotation;
    if (control['s']) window.player.y = window.player.y - window.player.speed;
    if (control['w']) window.player.y = window.player.y + window.player.speed;
    if (control['a']) window.player.x = window.player.x - window.player.speed;
    if (control['d']) window.player.x = window.player.x + window.player.speed;
    window.player.rotation = rotation;
    // console.log(window.player)
    // console.log(control)
}

setInterval(draw, 1000 / 30)



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