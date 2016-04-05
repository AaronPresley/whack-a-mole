"use strict";

var Board = require('./board');

var Game = function(boardSize, totalMoles){
    // Holds the the current status of our game board
    this.board = new Board(boardSize[0], boardSize[1], totalMoles);

    // A variable to check whether or not there's a going going
    this.gameInProgress = false;

    // A function that gets run every time a user's score changes
    this.onUserScoreChanged = function(score){};

    // A function that runs every time the moles move
    this.onMolesMoved = function(moles){};

    // Keeping track of our user's current score
    this.userScore = 0;

    // The variable that holds our current timeout for the game loop
    this.__gameLoop = null;
};

Game.prototype.increaseUserScore = function(){
    this.__userScore++
    this.onUserScoreChanged(this.userScore);
};

Game.prototype.start = function(){
    this.gameInProgress = true;
    var moveMoles = function(){
        this.board.moveAllMolesRandomly();
        this.onMolesMoved(this.board.moles);
        this.__gameLoop = setTimeout(moveMoles, 1500);
    }.bind(this);
    moveMoles();
};

Game.prototype.stop = function(){
    this.gameInProgress = false;
    this.board.clearMoles();
    this.onMolesMoved(this.board.moles);
    clearTimeout(this.__gameLoop);
};

module.exports = Game;
