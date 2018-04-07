var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000, "10.34.34.49");


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


for (var i = 0; i < Things.length; i++) {
    Things[i]
}
global.players = [];

io.on('connection', function(socket) {

    console.log("user connect " + socket.id);
    global.players[player.length].idSocker = socket.id;

});