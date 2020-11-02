
const WebSocket = require('ws');

let wss_port = 5555
let client_id = 0
let CLIENTS = { }
let wss_m = null


function startWebSocketServer() {

    wss_m = new WebSocket.Server({ port: wss_port });

    wss_m.on('connection', function connection(ws, req) {

        console.log("INFO--> New Connection ");
        // give an id and setup client in CLIENTS
        ws.client_id = client_id;
        client_id += 1;
        CLIENTS[ws.client_id] = { ws_ref: ws , id : ws.client_id }


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

        });

        ws.on('error', function error(err) {
            console.log("websocket error", err);
        });


    });

}

function stopWebSocketServer() {
    if (wss_m !== null) {// maybe add socket status check
        for (let clientid in CLIENTS) {
            CLIENTS[clientid].ws_ref.close()
        }
    }
    wss_m.close();
    wss_m = null
}


function sendToOneClient(packet, clientid) {
    if (wss_m !== null) {// maybe add socket status check
        if (CLIENTS[clientid]) {
            CLIENTS[clientid].ws_ref.send(JSON.stringify(packet))
        }
    }
}



function sendToAllClients(packet) {
    if (wss_m !== null) {// maybe add socket status check
        for (let client_id in CLIENTS) {
            CLIENTS[client_id].ws_ref.send(JSON.stringify(packet))
        }
    }
}
