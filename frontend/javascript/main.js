$ = require('jquery');

var GameOutput = function(gameContainer){
    this.boardContainer = $(gameContainer);
    this.displayBoard();
    this.initListeners();
};

GameOutput.prototype.displayBoard = function(){
    var boardHtml = this.generateBoardHtml(5, 5);
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

GameOutput.prototype.initListeners = function(){
    this.boardContainer.find('.board-cell').click(function(e){
        console.log( $(this).data('xPos') );
        console.log( $(this).data('yPos') );
    });
};

new GameOutput('#gameContainer');
