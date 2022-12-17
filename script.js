var board,
    game = new Chess();

/*The "AI" part starts here */

// returns move object when isTopLayer set to true

var minimax = function( depth, game, alpha, beta, maxPlayer, isTopLayer ) {
    if(!isTopLayer)
    {
        positionCount++;
    }
    
    if ( depth == 0 ) return evaluateBoard(game.board());

    var bestMove;
    var max = -Infinity;
    var min = Infinity;
    var moves = game.ugly_moves();

    for (var m = 0; m < moves.length; m++) {
        var bestMoveScore = 0;

        game.ugly_move(moves[m]);

        // if(game.in_check() && !maxPlayer)
        // {
        //     checks++;
        // }

        if(game.game_over())
        {
            if(game.in_checkmate())
            {
                game.undo();

                //console.log(maxPlayer + " checkmate detected");
                //checkmates++;

                if(isTopLayer)
                {
                    return moves[m];
                }

                if(maxPlayer)
                {
                    return Infinity;
                }
                else
                {
                    return -Infinity;
                }
            }
            else
            {
                game.undo();
            }
        }
        else
        {
            bestMoveScore += minimax( depth - 1, game, alpha, beta, !maxPlayer, false );
            game.undo();
        }

        //console.log(maxPlayer + " score: " + bestMoveScore);

        if(maxPlayer)
        {
            if( isTopLayer && bestMoveScore >= max )
            {
                max = bestMoveScore;
                bestMove = moves[m];
            }

            if( bestMoveScore > max )
            {
                max = bestMoveScore;
            }  
            
            if( !isTopLayer && bestMoveScore > alpha )
            {
                alpha = bestMoveScore;
            }
        }
        else
        {
            if( isTopLayer && bestMoveScore <= min )
            {
                min = bestMoveScore;
                bestMove = moves[m];
            }

            if( bestMoveScore < min )
            {
                min = bestMoveScore;
            }

            if( !isTopLayer && bestMoveScore < beta )
            {
                beta = bestMoveScore;
            }
        }
        
        if( beta <= alpha )
        {
            return bestMoveScore;
        }
    }

    if(isTopLayer)
    {
        //console.log("Checkmates detected: " + checkmates);
        //console.log("Black Checks detected: " + checks);
        //console.log("White Checks detected: " + checks);
        return bestMove;
    }

    if(maxPlayer)
    {
        return max;
    }
    else
    {
        return min;
    }
}

var evaluateBoard = function (board) {
    var totalScore = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalScore = totalScore + getPieceValue(board[i][j], i, j);
        }
    }

    return totalScore;
}

var newPhase = null
var getPhase = function (board) {
    var totalPhase = 636.0;
    var phase = totalPhase
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var piece = board[i][j];
            if(piece == null)
            {
                phase -= 0;
            }
            else if(piece.type == 'p')
            {
                phase -= 10;
            }
            else if(piece.type == 'n')
            {
                phase -= 30;
            }
            else if(piece.type == 'b')
            {
                phase -= 30;
            }
            else if(piece.type == 'r')
            {
                phase -= 50;
            }
            else if(piece.type == 'q')
            {
                phase -= 90;
            }
        }
    }

    phase /= totalPhase;
    for(var i = 0; i < 6; i++)
    {
        for (var y = 0; y < 8; y++)
        {
            for (var x = 0; x < 8; x++)
            {
                whiteTables[i][y][x] = (startWhiteTables[i][y][x] * (totalPhase - phase) + endWhiteTables[i][y][x] * phase)/totalPhase
                blackTables[i][y][x] = (startBlackTables[i][y][x] * (totalPhase - phase) + endBlackTables[i][y][x] * phase)/totalPhase
            }
        }
    }
    
}

var getPieceValue = function (piece, x, y ) {

    if(piece == null)
    {
        return 0;
    }

    var multi;
    var isWhite;

    var value;

    // to mult by -1 or not, w or b

    if(piece.color == 'w')
    {
        multi = 1;
        isWhite = true;
    }
    else
    {
        multi = -1;
        isWhite = false;
    }

    // p=pawn, n=knight, b=bishop, r=rook, q=queen, k=king

    if(piece.type == 'p')
    {
        value = 10 + ( isWhite ? whiteTables[0][y][x] :blackTables[0][y][x] );
    }
    else if(piece.type == 'n')
    {
        value = 30 + ( isWhite ? whiteTables[1][y][x] :blackTables[1][y][x] );
    }
    else if(piece.type == 'b')
    {
        value = 30 + ( isWhite ? whiteTables[2][y][x] :blackTables[2][y][x] )
    }
    else if(piece.type == 'r')
    {
        value = 50 + ( isWhite ? whiteTables[3][y][x] :blackTables[3][y][x] )
    }
    else if(piece.type == 'q')
    {
        value = 90 + ( isWhite ? whiteTables[4][y][x] :blackTables[4][y][x] )
    }
    else if(piece.type == 'k')
    {
        value = ( isWhite ? whiteTables[5][y][x] :blackTables[5][y][x] )
    }

    return value * multi;

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
        gameOverMessage();
    }
};

var gameOverMessage = function()
{
    var string = 'Game over:'
    if(game.half_moves >= 100)
    {
        string += ' Over 100 turns have passed';
    }
    if(game.in_checkmate())
    {
        string += ' Checkmate';
    }
    if(game.in_stalemate())
    {
        string += ' Stalemate';
    }
    if(game.in_draw())
    {
        string += ' Draw';
    }
    if(game.insufficient_material())
    {
        string += ' Insufficient material';
    }
    if(game.in_threefold_repetition())
    {
        string += ' Threefold repetition';
    }

    alert(string);
}

var positionCount;
//var checkmates;
//var checks;
var getBestMove = function (game) {
    if (game.game_over()) {
        gameOverMessage();
    }

    positionCount = 0;
    //checkmates = 0;
    //checks = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());

    var d = new Date().getTime();
    var bestMove = minimax(depth, game, -Infinity, Infinity, false, true );
    var d2 = new Date().getTime();
    var moveTime = (d2 - d);
    var positionsPerS = ( positionCount * 1000 / moveTime);

    if(bestMove.captured)
    {
        getPhase(game.board());
    }

    $('#position-count').text(positionCount);
    $('#time').text(moveTime/1000 + 's');
    $('#positions-per-s').text(positionsPerS);
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