#!javascript

var Board = require('../frontend/javascript/whackAMole/board');


describe("Board Object", function(){

    it("...should initialize a grid of any size", function(done){
        var board = new Board(5, 2, 5);

        var expectedGrid = [
            [ 0, 1, 2, 3, 4 ],
            [ 0, 1, 2, 3, 4 ],
        ];

        expect(board.grid).toEqual(expectedGrid);

        done();
    });

    it("...shouldn't allow there to be more moles than (cells - 1)", function(done){
        var board = new Board(5, 5, 24);
        expect(board.moles.length).toEqual(24);

        expect(function(){
            new Board(5, 5, 25);
        }).toThrow(new Error("With this grid, your max moles are 24"));

        expect(function(){
            new Board(5, 5, 26);
        }).toThrow();

        done();
    });

    it("...shouldn't move moles outside of the board", function(done){
        var board = new Board(2, 2, 3);

        // Moving the moles randomly 50 times to make sure they never
        // get moved out of the grid
        for( var x = 0; x < 50; x++ ){

            // Move the moles
            board.moveAllMolesRandomly();

            // Loop each mole to make sure it's within bounds
            for( var y in board.moles ){
                var thisMole = board.moles[y];
                expect(thisMole.x).toBeLessThan(2);
                expect(thisMole.y).toBeLessThan(2);
            }

        }

        done();
    });

    it("...should clear moles", function(done){
        var board = new Board(2, 2, 3);

        // Assert the moles aren't null
        for( var x in board.moles ){
            var thisMole = board.moles[x];
            expect(thisMole.x).not.toBe(null);
            expect(thisMole.y).not.toBe(null);
        }

        // Clear all the moles
        board.clearMoles();

        // Assert the moles aren't null
        for( var x in board.moles ){
            var thisMole = board.moles[x];
            expect(thisMole.x).toBe(null);
            expect(thisMole.y).toBe(null);
        }

        done();
    });

    it("...should move moles to specific locations", function(done){
        var board = new Board(5, 5, 1);
        var theMole = board.moles[0];

        board.moveMoleToLocation(theMole, 0, 0);
        expect(theMole.x).toEqual(0);
        expect(theMole.y).toEqual(0);

        done();
    });

    it("...shouldn't allow moving a mole outside of the grid", function(done){
        var board = new Board(5, 5, 1);
        var theMole = board.moles[0];

        expect(function(){
            board.moveMoleToLocation(theMole, 6, 6);
        }).toThrow();

        done();
    });

    it("...should detect moles at a location", function(done){
        var board = new Board(2, 2, 1);

        // Setting the mole location
        board.moveMoleToLocation(board.moles[0], 0, 0)

        expect(board.moleAtLocation(0, 0)).not.toBe(null);
        expect(board.moleAtLocation(1, 0)).toBe(null);

        done();
    });

});
