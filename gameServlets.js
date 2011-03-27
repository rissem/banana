var http = require('http'),
     sys = require('sys'),
     url = require('url'),
      fs = require('fs'),
    path = require('path'),
  events = require('events'),
      io = require('socket.io');


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

