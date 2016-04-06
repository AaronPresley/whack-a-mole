"use strict";

var Mole = require('./mole');

/**
 *	This ckass represents a single board within a game.
 *	@param {int} xLength - How many columns the board's grid should have
 *	@param {int} yLength - How many rows the board's grid should have
 */
var Board = function(xLength, yLength, totalMoles){
    // Assigning these to a main property so it's easy to read their
    // x and y length without counting the grid arrays.
    // NOTE: Subtracting 1 because everything else is zero-based
    this.gridX = xLength;
    this.gridY = yLength;

    // The array of arrays that hold our grid
    this.grid = this.__generateGrid(xLength, yLength);

    // The array that hold our moles
    this.moles = this.__generateMoles(totalMoles);

    // Scrample the moles!
    this.moveAllMolesRandomly();
};

/**
 *	This generates the grid arrays based on the passed params
 *	@param {int} xLength - How many columns to give this grid
 *	@param {int} yLength - How many rows to give this grid
 *  @returns {Array}
 */
Board.prototype.__generateGrid = function(xLength, yLength){
    // Starting empty
    var thisGrid = [];

    // Loop through the total numbered of desired rows
    for( var y = 0; y < yLength; y++ ){
        // Creating our empty row
        var thisRow = [];

        // Pushing to this row for as many cols as we want
        for( var x = 0; x < xLength; x++ )
            thisRow.push(x);

        // Pushing this row to the overall grid
        thisGrid.push(thisRow);
    }

    return thisGrid;
};

/**
 *	Generates x many moles and adds them to this board
 *	@param {int} totalMoles - How many moles we want to generate
 *  @returns {Array}
 */
Board.prototype.__generateMoles = function(totalMoles) {

    // The total number of cells on this board
    var totalBlocks = this.gridX * this.gridY;

    // Ensure that there aren't more moles than cells (minus 1)
    var maxMoles = totalBlocks - 1
    if( totalMoles > totalBlocks - 1 )
        throw new Error("With this grid, your max moles are " + maxMoles);

    // An empty array to hole our moles
    var theMoles = [];

    // Creating the empty moles and pushing to the array
    for(var x = 0; x < totalMoles; x++ ){
        var thisMole = new Mole();
        theMoles.push(thisMole);
    }

    return theMoles;
};

/**
 *	A helper method to generate a random number within a range. This
 *  COULD have been made a private method, but I didn't want a new instance
 *  to be created in memory every time it ran
 *	@param {int} min - The lowest (inclusive) possible number to return
 *	@param {int} max - The highest (inclusive) possible number to return
 *  @returns {int}
 */
Board.prototype.__randomInRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *	Moves a single mole object to a specific location within the board
 *	@param {Mole} mole - The mole object we want to move
 *	@param {int} x - The column we want to move to
 *	@param {int} y - The row we want to move to
 */
Board.prototype.moveMoleToLocation = function(mole, x, y) {
    // Ensure the target location fits within our board
    if( x > this.gridX || y > this.gridY )
        throw new Error("The desired location for this mole doesn't exist on the board.");

    // Perform the move
    mole.moveTo(x, y);
};

/**
 *	Moves a single mole object around randomly on the board
 *	@param {Mole} mole - The mole we're wanting to move around
 */
Board.prototype.moveMoleRandomly = function(mole){
    var xMax = this.gridX-1;
    var yMax = this.gridY-1;

    // Get random numbers within our board ranges
    var xRandom = this.__randomInRange(0, xMax);
    var yRandom = this.__randomInRange(0, yMax);

    // Ensure that we never place two moles on the same cell
    while( this.moleAtLocation(xRandom, yRandom) != null ){
        var xRandom = this.__randomInRange(0, xMax);
        var yRandom = this.__randomInRange(0, yMax);
    }

    // Perform the move
    this.moveMoleToLocation(mole, xRandom, yRandom);
};

/**
 *	Loops through all moles on this board and moves them to
 *  a random location.
 */
Board.prototype.moveAllMolesRandomly = function(){
    for( var x in this.moles )
        this.moveMoleRandomly(this.moles[x]);
};

/**
 *	Sets all mole's locations to null
 */
Board.prototype.clearMoles = function(){
    // Looping through each mole
    for( var x = 0; x < this.moles.length; x++ ){
        // Setting their coords to null
        this.moles[x].x = null;
        this.moles[x].y = null;
    }
};

/**
 *	Returns the mole object at the given location, or returns
 *  null if there isn't one there
 *	@param {int} xPos - The column to test for a mole presence
 *	@param {int} yPos - The row to test for a mole presence
 *  @returns {Mole|null}
 */
Board.prototype.moleAtLocation = function(xPos, yPos){
    // Looping through each mole to determine if there's
    // one living there
    for( var x = 0; x < this.moles.length; x++ ){
        var thisMole = this.moles[x];

        // Does this mole match the passed location?
        if( thisMole.x == xPos && thisMole.y == yPos )
            return thisMole;
    }

    // No mole was found so return null;
    return null;
};

module.exports = Board;
