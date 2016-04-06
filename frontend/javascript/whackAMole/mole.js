"use strict";

/**
 *	A class representing a single mole within a board
 */
var Mole = function(){
    // Our mole doesn't have a position on creation
    this.x = null;
    this.y = null;
};

/**
 *	Sets the mole's position to a single point on the board
 *	@param {int} x - The x coordinate for the new position
 *	@param {int} y - The y coordinate for the new position
 */
Mole.prototype.moveTo = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 *	Returns this mole's current position on the board
 *  in an array
 *  @returns {Array}
 */
Mole.prototype.currentPosition = function() {
    return [this.x, this.y];
};

module.exports = Mole;
