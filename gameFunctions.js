var http = require('http'),
     sys = require('sys');

var gameFunctions = exports;

var userSocketMap = {};

gameFunctions.registerUser = function(userName, gameName){
    if(!this.isPlayerInGame(userName, gameName)){
        var players = state[gameName];
        players.push(userName);
        state[gameName] = players;

        sys.puts("ADDED PLAYER: " + userName + " TO GAME: " + gameName);
        this.publishGameInfo(gameName, userName + " has joined the game!");
    }
}



gameFunctions.createGame = function(gameName, userName){
    var players = new Array();
    players.push(userName);
    
    var game = {};
    game["id"] = "XXX";
    game["name"] = gameName;
    game["players"] = players;
    
    this.saveGame(game);
}

gameFunctions.joinGame = function(gameName, userName){
    
    var game = this.getGame(gameName);
    if(this.isPlayerInGame(game)){
        return;
    }
    
    var players = game["players"];
    players.push(userName);
    this.saveGame(game);
}


//
// util functions
//
gameFunctions.isPlayerInGame = function(game, userName){
    var players = game["players"];
    for(var i=0; i<players.length; i++){
        if(userName == players[i]){
            return true;
        }
    }    
    return false;
}


//
// mock db functions
//
var games = {};
gameFunctions.getGame = function(gameName){
    var game = games[gameName];
    if(game == null || typeof(game) == 'undefined'){
        return null;
    }
    return game;
}
gameFunctions.saveGame = function(gameName, game){
    games[gameName] = game;
}


