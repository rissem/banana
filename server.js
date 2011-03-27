var http = require('http'),
     sys = require('sys'),
     url = require('url'),
      fs = require('fs'),
    path = require('path'),
  events = require('events'),
      io = require('socket.io'),
      
      serverState = require('./serverState.js'),
      gameServlets = require('./gameServlets.js');

/*
 * stolen code to write a static file to the response
 * http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js
 */
function load_static_file(uri, response) {
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
        if(!exists) {
      		response.writeHead(404, {"Content-Type": "text/plain"});
      		response.write("404 Not Found\n");
      		response.end();
      		return;
      	}

      	fs.readFile(filename, "binary", function(err, file) {
      		if(err) {
      			response.writeHead(500, {"Content-Type": "text/plain"});
      			response.write(err + "\n");
      			response.end();
 				return;
      		}

      		response.writeHead(200);
      		response.write(file, "binary");
      		response.end();
      	});
    });
}

/*
 * Top level server stuff
 */
server = http.createServer(function(request, response){
    
    var uri = url.parse(request.url).pathname;
    
    // server debug
    //sys.puts(serverState.getState());
    
    // delegate to servlet(?) based on url
    if(uri == "/createGame"){
        // XXX: find out if i need to pass in serverState here, or if i can require it inside
        gameServlets.createGame(request, response, serverState);
    }
    else if(uri == "/joinGame"){
        gameServlets.joinGame(request, response, serverState);
    }
    else{
        load_static_file(uri, response);
    }


});
server.listen(1090);


/*
 * Socket io
 */
var socket = io.listen(server); 
socket.on('connection', function(client){ 
    client.on('message', function(clientId){
        sys.puts("GOT SOCKET MESSAGE FROM USER: " + clientId);
        serverState.addSocketMapping(clientId, client);
    }) 
    client.on('disconnect', function(){
        //serverState.removeSocketMapping(userName);
    }) 
});

sys.puts("Server running at http://localhost:1090/");  

