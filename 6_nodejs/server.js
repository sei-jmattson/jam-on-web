const fs = require('fs');
const http = require('http');
//const Buffer = require('buffer').Buffer;
const StringDecoder = require('string_decoder').StringDecoder;
let _apidata;
let _layout;

http.createServer(function(request, response) {

    // if there is an error in processing the request, return this
	request.on('error', function(err) {
		console.error(err);
		response.writeHead(500, { 'Content-Type': 'text/plain'});
	    response.end("Application Error");
	});

    // load the data if it isn't already loaded
    if (!_apidata) {
        _apidata = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));
    }
    if (!_layout) {
        _layout = fs.readFileSync(__dirname + "/layout.tmpl", 'utf-8');
    }

    let handled = false;

    // if the http request is a GET
    if (request.method == 'GET') {

        if (request.url == '/') {
            handled = true;
            response.writeHead(200, 'text/plain');
            response.end(_layout);
        }


        if (request.url.startsWith('/weather')
            || request.url.startsWith('/news')) {
            handled = true;
            const segs = request.url.split('/');
            const page = segs[1];
            const item = (segs.length > 2)
                ? segs[2]
                : 'today';
            const value = _apidata[page].find(t => t.date == item).value;
            fs.readFile(`${__dirname}/widget.tmpl`, function (err, data) {
                if (err) {
                    response.writeHead(200, 'text/plain');
                    response.end(_layout);
                    return;
                }
                result = data.toString('utf-8')
                    .replace(/<!--PAGE-->/g, page)
                    .replace(/<!--VALUE-->/g, value);
                response.writeHead(200, 'text/html');
                response.end(_layout.replace(/<!--BODY-->/, result));
            });
        }

        if (request.url.startsWith('/api')) {
            response.writeHead(200, 'application/json');
            response.end(JSON.stringify(_apidata));
            handled = true;
        }

        if (!handled) {

            switch(request.url) {

                //if no custom handling, return the file requested
                default:
                    fs.readFile(`${__dirname}${request.url}`, function (err, data) {
                        if (err) {
                            response.writeHead(404, { 'Content-Type': 'text/plain'});
                            response.end("File Not Found");
                            return console.error(err);
                        }
                        var contentType = '';
                        switch (request.url.substr(request.url.indexOf('.'))) {
                            case '.js':
                                contentType = 'text/javascript';
                                break;
                            case '.json':
                                contentType = 'application/json';
                                break;
                            case '.html':
                                contentType = 'text/html';
                                break;
                            case '.css':
                                contentType = 'text/css';
                                break;
                            case '.png':
                            case '.jpg':
                            case '.gif':
                                contentType = 'application/octet-stream';
                                break;
                            case '.svg':
                                contentType = 'image/svg+xml';
                                break;
                            default:
                                contentType = 'text/plain';
                                break;
                        }
                        response.writeHead(200, contentType);
                        response.end(data);
                        //console.log(data);
                    });
                break;
            }
        }

    }

    if (request.method == 'POST') {

        var of = fs.createWriteStream(__dirname + request.url);

        if (request.url.indexOf('/img/upload')==0) {
            nip(request, function(err, header, request) {
                console.log(header);
                response.writeHead(200, 'application/json');
                response.end('"ok"');
            });
        } else {
            request.pipe(of);
            response.writeHead(200, 'application/json');
            response.end();
        }

    }

}).listen(8080);
console.log("sketch server listening on :8080");

function nip(request, callback) {
    var of = fs.createWriteStream(__dirname + request.url);
    request.on('readable', onReadable);
    function onReadable() {
        var chunk, mark = [];
        while (null !== (chunk = request.read())) {
            for (var i = 0; i < chunk.length; i++) {
                if (mark.length == 4) {
                    var header = chunk.toString('utf-8', 0, i);
                    of.write(chunk.slice(i));
                    request.pipe(of);
                    callback(null, header, request);
                    break;
                }
                if (chunk[i] == 13 || chunk[i] == 10) {
                    mark.push(chunk[i]);
                }
                else
                    mark = [];
            }
        }
    };
}


