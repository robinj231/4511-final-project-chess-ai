var board,
    game = new Chess();

/*The "AI" part starts here */

// returns move object when isTopLayer set to true

var minimax = function( depth, game, alpha, beta, maxPlayer, isTopLayer ) {
    if(!isTopLayer)
    {
        positionCount++;
    }
    
    if (depth < 0) return null;

    if ( depth == 0 ) return evaluateBoard(game.board());

    var bestMove;
    var max = -Infinity;
    var min = Infinity;
    var moves = game.ugly_moves();

    for (var m = 0; m < moves.length; m++) {
        var bestMoveScore = 0;

        
        game.ugly_move(moves[m]);

        if(game.game_over())
        {
            if(game.in_checkmate())
            {
                game.undo();

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
                // keep best score at 0 in this case
            }
        }
        else
        {
            bestMoveScore += minimax( depth - 1, game, alpha, beta, !maxPlayer, false );
            game.undo();
        }

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

var setPhase = function (board) {
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

    setPhase(game.board());

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

var makeBestMove = function (isWhite) {
    var bestMove = getBestMove(game, isWhite);
    game.ugly_move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        gameOverMessage();
    }

    if(parseInt($('#white-ai').find(':selected').text()) != 1)
    {
        window.setTimeout(makeBestMove, 250, !isWhite);
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
var getBestMove = function (game, isWhite) {
    if (game.game_over()) {
        gameOverMessage();
    }

    positionCount = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());
    var aiType;

    if(isWhite)
    {
        aiType = parseInt($('#white-ai').find(':selected').text());
    }
    else
    {
        aiType = parseInt($('#black-ai').find(':selected').text());
    }

    var d = new Date().getTime();

    var bestMove;
    if(aiType == 2)
    {
        bestMove = minimax(depth, game, -Infinity, Infinity, isWhite, true );
    }
    else if(aiType == 3)
    {
        bestMove = originalMinimaxRoot(depth, game, isWhite);
    }
    else // Random Move
    {
        bestMove = randomMove()
    }

    //var bestMove = minimax(depth, game, -Infinity, Infinity, false, true );
    var d2 = new Date().getTime();
    var moveTime = (d2 - d);
    var positionsPerS = ( positionCount * 1000 / moveTime);

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

if(parseInt($('#white-ai').find(':selected').text()) != 1)
{
    cfg = {
        draggable: false,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd
    };

}
board = ChessBoard('board', cfg);

if(parseInt($('#white-ai').find(':selected').text()) != 1)
{
    window.setTimeout(makeBestMove, 250, true);
}

// Random choice AI

var randomMove = function()
{
    var moves = game.ugly_moves();
    var randomIndex = Math.floor(Math.random() * moves.length);

    return moves[randomIndex];
}























// ORIGINAL CREATOR'S AI

var originalMinimaxRoot = function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.ugly_moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.ugly_move(newGameMove);
        var value = originalMinimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

var originalMinimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
        return -originalEvaluateBoard(game.board());
    }

    var newGameMoves = game.ugly_moves();

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.max(bestMove, originalMinimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.min(bestMove, originalMinimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

var originalEvaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + originalGetPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);




var originalGetPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};