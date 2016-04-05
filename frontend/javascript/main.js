"use strict";

var Game = require('./whackAMole/game');
var GameRenderer = require('./gameRenderer');

var thisGame = new Game([8,8], 4);
new GameRenderer(thisGame, "#gameContainer");
