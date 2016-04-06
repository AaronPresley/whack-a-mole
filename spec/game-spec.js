#!javascript


var Game = require('../frontend/javascript/whackAMole/game');
var Board = require('../frontend/javascript/whackAMole/board');

describe("Game Object", function(){
    it("...should initiate all of the default vars correctly", function(done){
        var game = new Game([2, 2], 3);

        expect(game.gameInProgress).toEqual(false);
        expect(game.userScore).toEqual(0);
        expect(game.__gameLoopDelay).toEqual(1500);

        done();
    });

    it("...should increase user score", function(done){
        var game = new Game([2, 2], 3);

        game.increaseUserScore();

        expect(game.userScore).toEqual(1);

        done();
    });

    it("...should increase game speed based on user score", function(done){
        var game = new Game([2, 2], 3);

        expect(game.__gameLoopDelay).toEqual(1500);

        for( var x = 0; x < 2; x++ )
            game.increaseUserScore();
        expect(game.__gameLoopDelay).toEqual(1200);

        for( var x = 0; x < 4; x++ )
            game.increaseUserScore();
        expect(game.__gameLoopDelay).toEqual(600);

        for( var x = 0; x < 400; x++ )
            game.increaseUserScore();
        expect(game.__gameLoopDelay).toEqual(300);

        done();
    });

    it("...should run user changed method", function(done){
        var game = new Game([2, 2], 1);
        game.onUserScoreChanged = function(){
            done();
        };

        game.increaseUserScore();
    });

    it("...should run mole changed method", function(done){
        var game = new Game([2, 2], 1);
        game.onMolesMoved = function(){
            done();
        };

        game.start();
        game.stop();
    });

    it("...should return a mole at a location", function(done){
        var game = new Game([2, 2], 1);
        var theMole = game.board.moles[0];

        theMole.moveTo(0, 0);

        game.locationChosen(0, 0, function(mole){
            done();
        }, function(){
            fail("A mole wasn't found when it should have been")
        });
    });

    it("...should return run the failed method on empty cell", function(done){
        var game = new Game([2, 2], 1);
        var theMole = game.board.moles[0];

        theMole.moveTo(0, 0);

        game.locationChosen(0, 1, function(mole){
            fail("A mole was found when it shouldn't have been")
        }, function(){
            done();
        });
    });

    it("...should stop a loop successfully", function(done){
        var game = new Game([2, 2], 1);

        expect(game.gameInProgress).toEqual(false);
        game.start();

        expect(game.gameInProgress).toEqual(true);
        game.stop();

        done();
    });
});
