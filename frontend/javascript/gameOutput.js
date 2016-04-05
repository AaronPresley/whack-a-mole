$ = require('jquery');

var GameOutput = function(gameContainer){
    this.boardContainer = $(gameContainer);
    this.displayBoard();
    this.initListeners();
};

GameOutput.prototype.displayBoard = function(){
    var boardHtml = this.generateBoardHtml(8, 8);
    this.boardContainer.html(boardHtml);
};

GameOutput.prototype.generateBoardHtml = function(xLen, yLen){
    var boardHtml = '<div class="board">';

    for( var y = 0; y < yLen; y++ ){
        var classString = '';
        if( y == 0 )
            classString = 'first';
        else if( y == yLen-1)
            classString = 'last';

        boardHtml += this.generateRowHtml(y, xLen, classString);
    }

    boardHtml += '</div>';
    return boardHtml;
};

GameOutput.prototype.generateRowHtml = function(rowNum, totalCells, classString){
    classString = classString == undefined ? '' : classString;

    var rowOutput = '<div class="board-row ' + classString + '">';
    rowOutput += this.generateCellHtml(rowNum, totalCells);
    rowOutput += '</div>';
    return rowOutput;
};

GameOutput.prototype.generateCellHtml = function(rowNum, totalCells) {
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

GameOutput.prototype.setCellHasMole = function(theCell, hasMole) {
    if( hasMole )
        theCell.addClass('has-mole');
    else
        theCell.removeClass('has-mole');
};

GameOutput.prototype.initListeners = function(){
    var self = this;

    this.boardContainer.find('.board-cell').click(function(e){
        self.setCellHasMole($(this), !$(this).hasClass('has-mole'));
    });
};

module.exports = GameOutput;
