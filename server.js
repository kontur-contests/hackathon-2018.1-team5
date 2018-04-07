var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var path = require('path');
var mime = require('mime');


app.listen(3000);



var cache = {};

function handler(req, res) {
    var filePath = false;
    if (req.url == '/') {
        filePath = '/index.html';
    } else {
        filePath = req.url;
    }
    var absPath = __dirname + filePath;
    serveStatic(res, cache, absPath);
}


function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200, { "content-type": mime.lookup(path.basename(filePath)) }
    );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    // if (cache[absPath]) {
    //     sendFile(response, absPath, cache[absPath]);
    // } else {
    fs.exists(absPath, function(exists) {
        if (exists) {
            fs.readFile(absPath, function(err, data) {
                if (err) {
                    send404(response);
                } else {
                    cache[absPath] = data;
                    sendFile(response, absPath, data);
                }
            });
        } else {
            send404(response);
        }
    });
    // }
}



var mapa = fs.readFileSync("map.json", "utf8");
// console.log('{'+mapa+'}');
map = JSON.parse(mapa);

// Игровая механика 
var players = [];

io.on('connection', function(socket) {

    // console.log(socket);
    console.log("user connect " + socket.id);
    var UserCheck = false;
    // var = n
    for (var i = 0; i < players.length; i++) {
        if (players[i].name == socket.id) UserCheck = true;
    }

    if (!UserCheck) {
        num = players.length;
        players[num] = {};
        players[num].name = socket.id;
        players[num].x = 256;
        players[num].y = 256;
        players[num].rat = 0;
        players[num].speed = 3.5;
        socket.emit('adduser', { "player": socket.id, "players": players });
    }




    // setInterval(function(){
    // console.log(players)
    // }, 1000);

    setInterval(function() {
        socket.emit('up', { "player": socket.id, "players": players, "map": map });
    }, 1000 / 30);

    socket.on('move', function(data) {
        var number;
        //помер нашего пользователя 
        for (var i = 0; i < players.length; i++) {
            if (players[i].name == data.player) number = i;
        }
        rat = Math.atan2(data.control.mouseX, data.control.mouseY);
        rat = rat * 180 / 3.14159265;
        rat = 450 - rat;
        // console.log(rat);    
        if (data.control['s']) players[number].y = players[number].y + players[number].speed;
        if (data.control['w']) players[number].y = players[number].y - players[number].speed;
        if (data.control['a']) players[number].x = players[number].x - players[number].speed;
        if (data.control['d']) players[number].x = players[number].x + players[number].speed;
        players[number].rat = rat;
        // console.log(data);

    });

    // io.on('disconnect', function () {
    //   io.emit('user disconnected');
    //   delete players[socket.id];
    // });

});