$ = require('jquery');

var GameRenderer = function(theGame, gameContainer){
    this.boardContainer = $(gameContainer);
    this.startGameBtn = $('a.start-game');
    this.userScoreOutput = $('.user-score');
    this.userScoreOutput.html(0);

    this.game = theGame;

    this.game.onMolesMoved = function(moles){
        this.setMoles(moles);
    }.bind(this);

    this.game.onUserScoreChanged = function(score){
        this.updateUserScore(score);
    }.bind(this);

    this.__displayBoard();
    this.__initListeners();
};

GameRenderer.prototype.setCellHasMole = function(theCell, hasMole) {
    if( hasMole )
        theCell.addClass('has-mole');
    else
        theCell.removeClass('has-mole');
};

GameRenderer.prototype.updateUserScore = function(score){
    this.userScoreOutput.html(score);
};

GameRenderer.prototype.setMoles = function(moles){

    // Removing all current moles
    this.boardContainer.find('.board-cell.has-mole').removeClass('has-mole');

    for( var x = 0; x < moles.length; x++ ){
        var thisMole = moles[x];
        var thisCell = this.cellAtLocation(thisMole.x, thisMole.y);
        thisCell.addClass('has-mole');
    }
};

GameRenderer.prototype.__displayBoard = function(){
    var xLen = this.game.board.gridX;
    var yLen = this.game.board.gridY;
    var boardHtml = this.__generateBoardHtml(xLen, yLen);
    this.boardContainer.html(boardHtml);
};

GameRenderer.prototype.__generateBoardHtml = function(xLen, yLen){
    var boardHtml = '<div class="board">';

    for( var y = 0; y < yLen; y++ ){
        var classString = '';
        if( y == 0 )
            classString = 'first';
        else if( y == yLen-1)
            classString = 'last';

        boardHtml += this.__generateRowHtml(y, xLen, classString);
    }

    boardHtml += '</div>';
    return boardHtml;
};

GameRenderer.prototype.__generateRowHtml = function(rowNum, totalCells, classString){
    classString = classString == undefined ? '' : classString;

    var rowOutput = '<div class="board-row ' + classString + '">';
    rowOutput += this.__generateCellHtml(rowNum, totalCells);
    rowOutput += '</div>';
    return rowOutput;
};

GameRenderer.prototype.__generateCellHtml = function(rowNum, totalCells) {
    var cellHtml = "";
    for( var x = 0; x < totalCells; x++ ){
        var thisCellClassString = '';

        if( x == 0 )
            thisCellClassString += 'first ';

        if( x == totalCells-1 )
            thisCellClassString += 'last ';

        cellHtml += '<div class="board-cell '+ thisCellClassString +'" data-x-pos="' + x + '" data-y-pos="' + rowNum + '" ></div>';
    }
    return cellHtml;
};

GameRenderer.prototype.cellAtLocation = function(x, y){
    return this.boardContainer.find('.board-cell[data-x-pos="'+x+'"][data-y-pos="'+y+'"]');
};

GameRenderer.prototype.__initListeners = function(){
    var self = this;

    this.boardContainer.find('.board-cell').click(function(e){
        // Don't let the user's clicks do anything if the game is
        // currently paused or stopped
        if( !self.game.gameInProgress )
            return false;

        // The coords for the cell that was clicked
        var thisX = $(this).data('xPos');
        var thisY = $(this).data('yPos');

        self.game.locationChosen(thisX, thisY, function(mole){
            self.game.pause();
            self.game.increaseUserScore();
            $(this).removeClass('has-mole').addClass('mole-hit');
            setTimeout(function(){
                $(this).removeClass('mole-hit');
                self.game.start();

            }.bind(this), 1000);
        }.bind(this), function(){
            console.log('BOO!');
        }.bind(this));
    });

    this.startGameBtn.click(function(e){
        e.preventDefault();
        if( !self.game.gameInProgress ) {
            $(this).html('Stop Game');
            self.game.start();
        } else {
            $(this).html('Start Game');
            self.game.stop();
        }
    });
};

module.exports = GameRenderer;
