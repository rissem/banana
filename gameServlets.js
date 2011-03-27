var http = require('http'),
     sys = require('sys'),
     url = require('url'),
      fs = require('fs'),
    path = require('path'),
  events = require('events'),
      io = require('socket.io'), 
	  Db = require('./lib/mongodb').Db,
Connection = require('./lib/mongodb').Connection,
Server = require('./lib/mongodb').Server,
BSON = require('./lib/mongodb').BSONNative;



var gameServlets = exports;

gameServlets.joinGame = function(request, response, state){
    
    var params = url.parse(request.url, true);
    
    if(state.doesGameExist(params['query']['gameName'])){
        state.registerUser(params['query']['userName'], params['query']['gameName']);
    }
    else{
        // error
        sys.put('ERROR: game doesnt exists');
    }
    
    response.end();
}

gameServlets.createGame = function(request, response, state){
    
    var params = url.parse(request.url, true);
    
    if(state.doesGameExist(params['query']['gameName'])){
        sys.puts('ERROR: game already exists');
        response.write('ERROR: game already exists');
    }
    else{
        state.makeGame(params['query']['gameName']);
        state.registerUser(params['query']['userName'], params['query']['gameName']);
    }
	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

    var db = new Db('banana', new Server(host, port, {}), {native_parser:true});
			db.open(function(err, db) {		
						sys.puts("saving game db");		
				db.collection('games', function(err, collection) {
					collection.insert([{'name':params['query']['userName'], 'password': params['query']['gameName']}], function(docs) {
			          // Count the number of records
			          collection.count(function(err, count) {
			            sys.puts("There are " + count + " records.");
			          });
			});
				});	
				db.close();
			});
	
    response.end();
}

gameServlets.startGame = function(request, response, state){
    
    var params = url.parse(request.url, true);
    
    if(!state.doesGameExist(params['query']['gameName'])){
        sys.puts('ERROR: game doesnt exists');
        response.write('ERROR: game doesnt exists');
    }
    else{
        params['query']['userName']
        params['query']['gameName']
    }
    
    response.end();
}

gameServlets.getGameState = function(request, response, state){
    
    var params = url.parse(request.url, true);
    
    if(!state.doesGameExist(params['query']['gameName'])){
        sys.puts('ERROR: game doesnt exists');
        response.write('ERROR: game doesnt exists');
    }
    else{
        params['query']['gameName']
    }
    
    response.end();
}

gameServlets.playRedCard = function(request, response, state){
    
    var params = url.parse(request.url, true);
    
    if(!state.doesGameExist(params['query']['gameName'])){
        sys.puts('ERROR: game doesnt exists');
        response.write('ERROR: game doesnt exists');
    }
    else{
        params['query']['gameName']
        params['query']['userName']
        params['query']['redCard']
    }
    
    response.end();
}

gameServlets.pickRedCard = function(request, response, state){
    
    var params = url.parse(request.url, true);
    
    if(!state.doesGameExist(params['query']['gameName'])){
        sys.puts('ERROR: game doesnt exists');
        response.write('ERROR: game doesnt exists');
    }
    else{
        params['query']['gameName']
        params['query']['userName']
        params['query']['redCard']
    }
    
    response.end();
}

