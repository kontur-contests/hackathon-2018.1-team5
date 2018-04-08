var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var Base64 = require('js-base64').Base64;
app.listen(80, "10.34.32.57");
var async = require('async');
var md5 = require('md5');
var mapGenerator = require('./map/mapGenerator');
var player = require('./player/player');
var calculator = require('./calcPosition');


var path = require('path');
var mime = require('mime');
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

//генерация карты
var map = mapGenerator.generateMap();
// console.log(map);

global.texture = [];
global.players = [];
global.res = {
    power: 0,
    h20: 0,
    tin: 0,
    copper: 0,
};

// var mapa = fs.readFileSync("map.json", "utf8");
// map = JSON.parse(mapa);
// console.log(map[0])

io.on('connection', function(socket) {
    // console.log(global.players)
    // texture = global.texture
    socket.emit('texture', global.texture);
    socket.emit('map', map);

    // console.log("user connect " + socket.id);

    socket.on('hello', function(d) {
        //

        token = md5(d.username + socket.id)
        var newPlayer = player.newPlayer(d.name, socket.id, token);
        global.players.push(newPlayer);
        // console.log(newPlayer);
        socket.emit('hello', {
            username: d.username,
            token: token
        });
    });

    socket.on('you', function(d) {
        for (var i = 0; i < global.players.length; i++) {
            if (global.players[i].socket == socket.id) {
                var landCoord = calculator.getCurrentBlockAndChank(d.x, d.y);
                global.players[i].chunkX = landCoord.chunkX;
                global.players[i].chunkY = landCoord.chunkY;
                global.players[i].blockX = landCoord.blockX;
                global.players[i].blockY = landCoord.blockY;

                global.players[i].oxygen = d.oxygen;
                global.players[i].energyLevel = d.energyLevel;
                global.players[i].temperature = d.temperature;

                global.players[i].x = d.x
                global.players[i].y = d.y
                global.players[i].rotation = d.rotation
            }
        }
    });



    setInterval(function() {
        for (var i = 0; i < global.players.length; i++) {

            if (global.players[i].oxygen != 0) global.players[i].oxygen = global.players[i].oxygen - 0.001;

            if (global.players[i].socket == socket.id) {
                io.sockets.sockets[global.players[i].socket].emit('you', global.players[i])
            }
        }
        socket.emit('players', global.players);

    }, 1000 / 30)

});


function getFiles(dirPath, callback) {

    fs.readdir(dirPath, function(err, files) {
        if (err) return callback(err);

        var filePaths = [];
        var name = [];
        async.eachSeries(files, function(fileName, eachCallback) {
            var filePath = path.join(dirPath, fileName);

            fs.stat(filePath, function(err, stat) {
                if (err) return eachCallback(err);

                if (stat.isDirectory()) {
                    getFiles(filePath, function(err, subDirFiles) {
                        if (err) return eachCallback(err);

                        filePaths = filePaths.concat(subDirFiles);
                        eachCallback(null);
                    });

                } else {
                    if (stat.isFile() && /\.png$/.test(filePath)) {
                        filePaths.push(filePath);
                        name = filePath.match(/[0-9]/)
                        name.push(filePath.match(/[0-9]/));
                    }

                    eachCallback(null);
                }
            });
        }, function(err) {
            callback(err, filePaths, name);
        });

    });
}


getFiles('./texture', function(err, files, name) {
    console.log("load texture ...")
    // console.log(err || files);
    for (var i = 0; i < files.length; i++) {
        global.texture[i] = "data:image/png;base64," + fs.readFileSync(files[i], 'base64');
    }
})