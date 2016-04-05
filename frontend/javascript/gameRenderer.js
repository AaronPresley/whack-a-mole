$ = require('jquery');

var GameRenderer = function(theGame, gameContainer){
    this.boardContainer = $(gameContainer);
    this.startGameBtn = $('a.start-game');

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
    console.log("User Score: " + score)
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
        // self.setCellHasMole($(this), !$(this).hasClass('has-mole'));
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
