"use strict";

var Board = require('./board');

/**
 *	A class that manages the current Whack-a-Mole game
 *	@param {array} boardSize - An array that contains the x & y size of this games board
 *  @param {int} totalMoles - How many moles should be on this board
 */
var Game = function(boardSize, totalMoles){
    // Holes our board instance
    this.board = new Board(boardSize[0], boardSize[1], totalMoles);

    // A variable to check whether or not there's a game going
    this.gameInProgress = false;

    // A function that gets run every time a user's score changes
    // Defaulting to nothing
    this.onUserScoreChanged = function(score){};

    // A function that runs every time the moles get moved
    // Defaulting to nothing
    this.onMolesMoved = function(moles){};

    // Keeping track of our user's current score
    this.userScore = 0;

    // The variable that holds our current timeout for the game loop
    this.__gameLoop = null;

    // The delay for each loop
    this.__gameLoopDelay = 1500;
};

/**
 *	A simple method that gets run when the user hits a mole
 */
Game.prototype.increaseUserScore = function(){
    // Increment our score
    this.userScore++

    // Running our user-defined method that the score has been changed
    this.onUserScoreChanged(this.userScore);

    // Resetting the game speed if the game has been stopped and reset
    if( this.userScore == 0 )
        this.__gameLoopDelay = 1500;

    // We want to slightly increase the game's speed to make things a
    // little more interesting
    if( this.userScore % 2 == 0 && this.__gameLoopDelay >= 500 )
        this.__gameLoopDelay -= 300;
};

/**
 *	Is run when the user has indicated a specific cell on the board
 *	@param {int} x - The column the user clicked
 *	@param {int} y - The row the user clicked
 *	@param {func} onCellFilled - The method to run if there was a mole present
 *	@param {func} onCellEmpty - The method to run if there was nothing in the cell
 */
Game.prototype.locationChosen = function(x, y, onCellFilled, onCellEmpty){
    // Getting the mole with the given coords
    var theMole = this.board.moleAtLocation(x, y);

    // Running the correct functions based on if a mole was found
    if( theMole )
        onCellFilled(theMole);
    else
        onCellEmpty();
};

/**
 *	Starts a game loop which progresses the game
 */
Game.prototype.start = function(){
    // Setting our game as in-progress
    this.gameInProgress = true;

    // A closer which performs the next step of the game
    var moveMoles = function(){
        // Move all the moles around randomly
        this.board.moveAllMolesRandomly();

        // Allow the user's method to run after the change
        this.onMolesMoved(this.board.moles);

        // Delaying a bit and then starting it all over. I'm choosing
        // setTimeout instead of setInterval because I know there won't
        // be cycles stacking on top of each other. Also because
        // the delay changes along with the user's score
        this.__gameLoop = setTimeout(moveMoles, this.__gameLoopDelay);

    }.bind(this);

    // Starting the loop
    moveMoles();
};

/**
 *	Pauses the came and leaves the moles where they are
 */
Game.prototype.pause = function(){
    // Updating our var
    this.gameInProgress = false;

    // Stopping and clearing our loop
    clearTimeout(this.__gameLoop);
    this.__gameLoop = null;
};

/**
 *	Stops the game, removes the moles and resets the user's scoare
 */
Game.prototype.stop = function(){
    this.gameInProgress = false;
    this.userScore = 0;
    this.board.clearMoles();

    // Running the user-defined functions
    this.onMolesMoved(this.board.moles);
    this.onUserScoreChanged(this.userScore);

    // Stopping and clearing the loop var
    clearTimeout(this.__gameLoop);
    this.__gameLoop = null;
};

module.exports = Game;
