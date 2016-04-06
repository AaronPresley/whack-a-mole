$ = require('jquery');

/**
 *	This class handles all of the game's output and management on the page.
 *  NOTE: Yes, I am writing HTML within my JS. This might be dumb, but I
 *      it's way simpler than adding another library. This class could
 *      easily use React or Mustache or a similar library. I just went
 *      with simple
 *	@param {Game} theGame - The game instance we're wanting to output
 *	@param {obj} gameContainer - The JS object of the element our game will be in
 */
var GameRenderer = function(theGame, gameContainer){
    // Finding a few of our elements on the page
    this.boardContainer = $(gameContainer);
    this.startGameBtn = $('a.start-game');
    this.userScoreOutput = $('.user-score');

    // Our game instance
    this.game = theGame;

    // Declaring what should happen when a mole gets moved
    this.game.onMolesMoved = function(moles){
        this.setMoles(moles);
    }.bind(this);

    // Declaring what to do on a user score change
    this.game.onUserScoreChanged = function(score){
        this.updateUserScore(score);
    }.bind(this);

    // Outputting our initial score
    this.updateUserScore(this.game.userScore);

    // Generating the HTML on the page
    this.__displayBoard();

    // Start listening to clicks and events
    this.__initListeners();
};

/**
 *	Returns the jquery cell object at the given coodinates
 *	@param {int} x - The column of the desired cell
 *	@param {int} y - The row of the desired cell
 *  @returns {object|null}
 */
GameRenderer.prototype.cellAtLocation = function(x, y){
    // Finding the cell
    var theCell = this.boardContainer.find('.board-cell[data-x-pos="'+x+'"][data-y-pos="'+y+'"]');

    // Only return the object if it was found
    if( theCell.length )
        return theCell

    // Return nothing if it wasn't found
    return null;
};

/**
 *	Updates a cellto either have or hide a mole
 *	@param {type} param - DESC
 */
GameRenderer.prototype.setCellHasMole = function(cell, hasMole){
    if( hasMole )
        cell.addClass('has-mole');
    else
        cell.removeClass('has-mole');
};

/**
 *	Updates the frontend with the passed score
 *	@param {int} score - The score to show on the frontent
 */
GameRenderer.prototype.updateUserScore = function(score){
    this.userScoreOutput.html(score);
};

/**
 *	Accepts a list of moles and updates the page HTML to match
 *  their coodinates
 *	@param {Array} moles - The list of moles you want to show on the board
 */
GameRenderer.prototype.setMoles = function(moles){
    // Removing all current moles
    this.boardContainer.find('.board-cell.has-mole').removeClass('has-mole');

    // Looping through each mole
    for( var x = 0; x < moles.length; x++ ){
        var thisMole = moles[x];

        // Get the cell at this spot
        var thisCell = this.cellAtLocation(thisMole.x, thisMole.y);

        // Tell the HTML to indiciate this cell has a mole
        this.setCellHasMole(thisCell, true);
    }
};

/**
 *	Generates all of the board's HTML and outputs it on the page
 */
GameRenderer.prototype.__displayBoard = function(){
    // Get the desired board size
    var xLen = this.game.board.gridX;
    var yLen = this.game.board.gridY;

    // Generate the HTML
    var boardHtml = this.__generateBoardHtml(xLen, yLen);

    // Outputting it on the page
    this.boardContainer.html(boardHtml);
};

/**
 *	Generates the HTML for the board and board container
 *	@param {int} xLen - The columns of the board
 *	@param {int} yLen - The rows of the board
 *  @returns {string}
 */
GameRenderer.prototype.__generateBoardHtml = function(xLen, yLen){
    var boardHtml = '<div class="board">';

    // Looping through each row
    for( var y = 0; y < yLen; y++ ){
        // Empty var to hold any speciall classes
        var classString = '';

        // Is this the first row?
        if( y == 0 )
            classString = 'first';

        // Is this the last row?
        else if( y == yLen-1)
            classString = 'last';

        // Generate this row's HTML and append it to the board HTML
        boardHtml += this.__generateRowHtml(y, xLen, classString);
    }

    boardHtml += '</div>';

    // Returning the HTML
    return boardHtml;
};

/**
 *	Generates a single row's HTML with the given cells
 *	@param {int} rowNum - Which number of row this is so it can be output in a data attribute
 *	@param {int} totalCells - How many cells should be in this row
 *	@param {string} classString - Any additional classes that should be given to this row
 *  @returns {string}
 */
GameRenderer.prototype.__generateRowHtml = function(rowNum, totalCells, classString){
    // If no class string was passed, we just want it to be empty
    classString = classString == undefined ? '' : classString;

    var rowOutput = '<div class="board-row ' + classString + '">';

    // Generate all of the cells for this row and append to string bar
    rowOutput += this.__generateCellHtml(rowNum, totalCells);

    rowOutput += '</div>';
    return rowOutput;
};

/**
 *	Generates the HTML for x many cells
 *	@param {int} rowNum - The row number this cell is being added to
 */
GameRenderer.prototype.__generateCellHtml = function(rowNum, totalCells) {
    var cellHtml = "";

    // Looping to create as many cells as we were told
    for( var x = 0; x < totalCells; x++ ){
        // An empty var to hold any special classes
        var thisCellClassString = '';

        // Is this the first cell?
        if( x == 0 )
            thisCellClassString += 'first ';

        // Is this the last cell?
        else if( x == totalCells - 1 )
            thisCellClassString += 'last ';

        // Generate the HTML and append to overall HTML var
        cellHtml += '<div class="board-cell '+ thisCellClassString +'" data-x-pos="' + x + '" data-y-pos="' + rowNum + '" ></div>';
    }

    // Return the goods
    return cellHtml;
};

// Initializes all the events and clicks the user could make
GameRenderer.prototype.__initListeners = function(){
    // Doing this because I'll need access to $(this) within
    // some of the event methods
    var self = this;

    // Gets fired every time a user clicks on a single cell
    this.boardContainer.find('.board-cell').click(function(e){

        // Don't let the user's clicks do anything if the game is
        // currently paused or stopped
        if( !self.game.gameInProgress )
            return false;

        // The coords for the cell that was clicked
        var thisX = $(this).data('xPos');
        var thisY = $(this).data('yPos');

        // Tell our game object we've chosen a spot
        self.game.locationChosen(thisX, thisY, function(mole){
            // Pause our game so the user has enough time to see they
            // hite a mole
            self.game.pause();

            // Reward the user for their hard work
            self.game.increaseUserScore();

            // Add a class to the cell so our "hit" animation gets shown
            $(this).removeClass('has-mole').addClass('mole-hit');

            // Pause the game for 1 second then start again (so the user can
            // see they hit a mole)
            setTimeout(function(){
                $(this).removeClass('mole-hit');
                self.game.start();
            }.bind(this), 1000);

        }.bind(this), function(){
            // We're not currently punishing the user for clicking
            // an empty cell, but we could do that here if we wanted
            console.log('BOO!');
        }.bind(this));
    });

    // Gets fired when tue user clicks the Start Game button
    this.startGameBtn.click(function(e){
        e.preventDefault();

        // We don't have a game in progress so get one started
        if( !self.game.gameInProgress ) {
            self.game.start();

            // Update the text accordingly
            $(this).html('Stop Game');

        // We have a game going, so stop it
        } else {
            self.game.stop();

            // Updating the text accordingly
            $(this).html('Start Game');
        }
    });
};

module.exports = GameRenderer;
