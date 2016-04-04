"use strict";

var Mole = function(name){
    this.x = null;
    this.y = null;
};

Mole.prototype.moveTo = function(x, y) {
    this.x = x;
    this.y = y;

    return this;
};

Mole.prototype.currentPosition = function() {
    return [this.x, this.y];
};

module.exports = Mole;
