"use strict";

var Mole = require('./mole');

var Board = function(xLength, yLength, totalMoles){
    // Assigning these to a main property so it's easy to read their
    // x and y length without counting the grid arrays
    this.gridX = xLength;
    this.gridY = yLength;

    // The array of arrays that hold our grid
    this.grid = this.__generateGrid(xLength, yLength);

    // The array that hold our moles
    this.moles = this.__generateMoles(totalMoles);
    this.moveAllMolesRandomly();
};

Board.prototype.__randomInRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Board.prototype.__generateGrid = function(xLength, yLength){
    var thisGrid = [];

    for( var y = 0; y < yLength; y++ ){
        var thisRow = [];
        for( var x = 0; x < xLength; x++ ){
            thisRow.push(x);
        }
        thisGrid.push(thisRow);
    }

    return thisGrid;
};

Board.prototype.__generateMoles = function(totalMoles) {
    // First we need to make sure there aren't more moles than
    // blocks in the grid minus 1
    var totalBlocks = this.grid[0].length * this.grid[1].length
    if( totalMoles > totalBlocks - 1 )
        throw "With this grid, your max moles are " + totalMoles;

    var theMoles = [];
    for(var x = 0; x < totalMoles; x++ ){
        var thisMole = new Mole();
        theMoles.push(thisMole);
    }

    return theMoles;
};

Board.prototype.moveMoleToLocation = function(mole, x, y) {
    mole.moveTo(x, y);
    return this;
};

Board.prototype.moveMoleRandomly = function(mole){
    var xMax = this.grid[0].length-1;
    var yMax = this.grid.length-1;

    var xRandom = this.__randomInRange(0, xMax);
    var yRandom = this.__randomInRange(0, yMax);

    while( this.moleAtLocation(xRandom, yRandom) != null ){
        var xRandom = this.__randomInRange(0, xMax);
        var yRandom = this.__randomInRange(0, yMax);
    }

    mole.moveTo(xRandom, yRandom);

    return this;
};

Board.prototype.moveAllMolesRandomly = function(){
    for( var x in this.moles ){
        this.moveMoleRandomly(this.moles[x]);
    }

    return this;
};

Board.prototype.clearMoles = function(){
    for( var x = 0; x < this.moles.length; x++ ){
        this.moles[x].x = null;
        this.moles[x].y = null;
    }
}

Board.prototype.moleAtLocation = function(xPos, yPos){

    for( var x = 0; x < this.moles.length; x++ ){
        var thisMole = this.moles[x];
        if( thisMole.x == xPos && thisMole.y == yPos )
            return thisMole;
    }

    return null;
};

module.exports = Board;
