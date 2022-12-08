var board,
    game = new Chess();

/*The "AI" part starts here */

// returns move object, uses mini and maxi
var minimax = function(depth, game, maxPlayer) {

    var bestMove;
    var moves = game.ugly_moves()
    console.log("Depth " + depth);
    if(maxPlayer)
    {
        if ( depth == 0 ) return evaluateBoard(game.board());
        var max = -Infinity;
        for (var m = 0; m < moves.length; m++) {
            console.log("Max Move " + moves[m].piece);
            game.ugly_move(moves[m]);
            var score = mini( depth - 1, game );
            console.log("Max Max Score " + score);
            game.undo();
            if( score >= max )
            {
                max = score;
                bestMove = moves[m];
                console.log("Max Move set");
            }
        }
    }
    else
    {
        if ( depth == 0 ) return evaluateBoard(game.board());
        var min = Infinity;
        for (var m = 0; m < moves.length; m++) {
            console.log("Move " + moves[m].piece);
            game.ugly_move(moves[m]);
            var score = maxi( depth - 1, game );
            console.log("Mini Score " + score);
            game.undo();
            if( score <= min )
            {
                min = score;
                bestMove = moves[m];
                console.log("Mini Move set");
            }
        }
    }

    return bestMove;
}

var maxi = function( depth, game ) {
    console.log("Depth " + depth);
    if ( depth == 0 ) return evaluateBoard(game.board());
    var max = -Infinity;
    var moves = game.moves()
    for (var m = 0; m < moves.length; m++) {
        console.log("Max Move " + moves[m].piece);
        game.ugly_move(moves[m]);
        var score = mini( depth - 1, game );
        console.log("Max Score " + score);
        game.undo();
        if( score > max )
            max = score;
    }
    return max;
}

var mini = function ( depth, game ) {
    console.log("Depth " + depth);
    if ( depth == 0 ) return evaluateBoard(game.board());
    var min = Infinity;
    var moves = game.moves()
    for (var m = 0; m < moves.length; m++) {
        console.log("Mini Move " + moves[m].piece);
        game.ugly_move(moves[m]);
        var score = maxi( depth - 1, game );
        console.log("Mini Score " + score);
        game.undo();
        if( score < min )
            min = score;
    }
    return min;
}

var evaluateBoard = function (board) {
    var totalScore = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalScore = totalScore + getPieceValue(board[i][j]);
            console.log(board[i][j] + " " + getPieceValue(board[i][j]));
        }
    }

    return totalScore;
}

var getPieceValue = function (piece) {

    if(piece == null)
    {
        return 0;
    }

    var multi;

    if(piece.color == 'w')
    {
        multi = 1;
    }
    else
    {
        multi = -1;
    }

    if(piece.type == 'p')
    {
        return 1 * multi;
    }
    else if(piece.type == 'n')
    {
        return 3 * multi;
    }
    else if(piece.type == 'b')
    {
        return 3 * multi;
    }
    else if(piece.type == 'r')
    {
        return 5 * multi;
    }
    else if(piece.type == 'q')
    {
        return 9 * multi;
    }
    else if(piece.type == 'k')
    {
        return 500 * multi;
    }
}

/* board visualization and games state handling */

var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
};

var positionCount;
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }

    var depth = 1;

    var bestMove = minimax(depth, game, false); /* this is up to our AI! */
    
    return bestMove;
};

var renderMoveHistory = function (moves) {
    var historyElement = $('#move-history').empty();    
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + ( moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);

};

var onDrop = function (source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    renderMoveHistory(game.history());
    window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);