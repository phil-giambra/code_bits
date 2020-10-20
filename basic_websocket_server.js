
const WebSocket = require('ws');

let wss_port = 5555
let client_id = 0
const wss_m = new WebSocket.Server({ port: wss_port });

let CLIENTS = { }

wss_m.on('connection', function connection(ws, req) {

    console.log("INFO--> New Connection ");
    // give an id and setup client in CLIENTS
    ws.client_id = client_id;
    CLIENTS[client_id] = { ws_ref: ws , id : client_id }
    client_id += 1;
    
    //handle incoming messages
    ws.on('message', function incoming(message) {

        let packet = JSON.parse( message )
        packet.client_id = ws.client_id
        console.log("INFO--> New Message from Client");


    });
    // handle disconnects or quits
    ws.on('close', function close() {

        let id = ws.client_id
        delete  CLIENTS[id];
        console.log(`INFO--> Client disconnected: id ${ id } `);
        // remove the client from ws


    });

    ws.on('error', function error(err) {
        console.log("websocket error", err);
    });


});
