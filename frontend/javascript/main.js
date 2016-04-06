"use strict";

var Game = require('./whackAMole/game');
var GameRenderer = require('./gameRenderer');

// Instaniating a new game
var thisGame = new Game([8,8], 8);

// Passing our game object to our GameRenderer object to
// get this party started
new GameRenderer(thisGame, "#gameContainer");
