var http = require('http'),
     sys = require('sys');

var serverState = exports;

var state = {};
var userSocketMap = {};

serverState.registerUser = function(userName, gameName){
    if(!this.isPlayerInGame(userName, gameName)){
        var players = state[gameName];
        players.push(userName);
        state[gameName] = players;

        sys.puts("ADDED PLAYER: " + userName + " TO GAME: " + gameName);
        this.publishGameInfo(gameName, userName + " has joined the game!");
    }
}

serverState.doesGameExist = function(gameName){
    var players = state[gameName];
    if(players == null || typeof(players) == 'undefined'){
        return false;
    }
    return true;
}

serverState.isPlayerInGame = function(userName, gameName){
    if(this.doesGameExist(gameName)){
        var players = state[gameName];
        for(var i=0; i<players.length; i++){
            if(userName == players[i]){
                return true;
            }
        }
    }
    return false;
}

serverState.makeGame = function(gameName){
    state[gameName] = new Array();
    sys.puts("MADE GAME: " + gameName);
}

serverState.getPlayers = function(gameName){
    return state[gameName];
}




serverState.addSocketMapping = function(clientId, socket){
    userSocketMap[clientId] = socket;
}

serverState.removeSocketMapping = function(clientId){
    userSocketMap[clientId] = null;
}

serverState.getUserSocket = function(clientId){
    var sock = userSocketMap[clientId];
    if(sock == null || typeof(sock) == 'undefined'){
        return null;
    }
    return sock;
}

serverState.publishGameInfo = function(gameName, msg){
     var players = state[gameName];
     for(var i=0; i< players.length; i++){
         var clientId = players[i] + "." + gameName;
         var sock = this.getUserSocket(clientId);
         if(sock != null){
             sys.puts("PUBLISHED [" + msg + "] TO: " + clientId);
             sock.send(msg);
         }
         else{
             sys.puts("DIDNT PUBLISH [" + msg + "] TO: " + clientId);
         }
     }
     
}




// MOCK DB CALLS?


serverState.getGame = function (gameName){
    return state[gameName];
}










