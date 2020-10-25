
const fs = require('fs');
const http = require('http');

let http_root = "./http_basic_root"
let http_default_file = "index.html"
let http_port = 9191

const requestListener = function (req, res) {

    let notFound = function() {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    }
    //console.log("http request", res);
    let url = req.url
    if ( url === "/" ) url += http_default_file
    let method = req.method
    let cont_type = req.headers.accept.split(",")[0]
    console.log("http request for ", url , cont_type)

    // you may have to add options to this switch depending on the
    // Content-Type of the files that you serve
    switch (cont_type) {
        case "*/*":
            let ending = url
            if ( ending.split(".").pop() === "js"  ) {
                res.writeHead(200, { "Content-Type": "text/javascript" });
            }
            if ( ending.split(".").pop() === "json"  ) {
                res.writeHead(200, { "Content-Type": "text/json" });
            }
            if ( ending.split(".").pop() === "ttf"  ) {
                res.writeHead(200, { "Content-Type": "font/ttf" });
            }
            //
            break;
        case "image/webp":
            res.writeHead(200, { "Content-Type": "image/webp" });
            break;
        case "text/css":
            res.writeHead(200, { "Content-Type": "text/css" });
            break;
        case "text/html":
            res.writeHead(200, { "Content-Type": "text/html" });
            break;
        case "image/avif":
            res.writeHead(200, { "Content-Type": "image/avif" });
            break;
        default:
            // unknown Content-Type send 404 not found responce
            notFound()
            return;
    }

    // This line opens the file as a readable stream
    let readStream = fs.createReadStream( http_root + url );

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
        //console.log(err);
        console.log("readstream error", cont_type, url);
        notFound()
        return;

    });


}

const server = http.createServer(requestListener);
server.listen(http_port, "0.0.0.0");
console.log(`HTTP Server started on port ${http_port} `);
