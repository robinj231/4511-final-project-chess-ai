var reverseArray = function(array) {
    return array.slice().reverse();
};

var startPawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [9.8, 13.4,  6.1,  9.5,  6.8,  12.6, 3.4, -1.1],
        [-.6,   .7,  2.6,  3.1,  6.5,  5.6,  2.5, -2.0],
        [-1.4,  1.3,  .6,  2.1,  2.3,  1.2,  1.7, -2.3],
        [-2.7,  -.2, -.5,  1.2,  1.7,   .6,  1.0, -2.5],
        [-2.6,  -.4,  -.4, -1.0,   .3,  .3,  3.3, -1.2],
        [-3.5,  -.1, -2.0, -2.3, -1.5,  2.4, 3.8, -2.2],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var startPawnEvalBlack = reverseArray(startPawnEvalWhite);

var endPawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [17.8, 17.3, 15.8, 13.4, 14.7, 13.2, 16.5, 18.7],
        [9.4, 10.0,  8.5,  6.7,  5.6,  5.3,  8.2,  8.4],
        [3.2,  2.4,  1.3,   .5,  -.2,   .4,  1.7,  1.7],
        [1.3,   .9,  -.3,  -.7,  -.7,  -.8,   .3,  -.1],
        [ .4,   .7,  -.6,   .1,   .0,  -.5,  -.1,  -.8],
        [0.5,  1.0,  1.0, -2.0, -2.0,  1.0,  1.0,  0.5],
        [1.3,   .8,   .8,  1.0,  1.3,   .0,   .2,  -.7]
    ];

var endPawnEvalBlack = reverseArray(endPawnEvalWhite);




var startKnightEvalWhite =
    [
        [-16.7, -8.9, -3.4, -4.9,  6.1, -9.7, -1.5, -10.7],
        [-7.3, -4.1,  7.2,  3.6,  2.3,  6.2,   .7,  -1.7],
        [-4.7,  6.0,  3.7,  6.5,  8.4, 12.9,  7.3,   4.4],
        [.9,  1.7,  1.9,  5.3,  3.7,  6.9,  1.8,   2.2],
        [-1.3,   .4,  1.6,  1.3,  2.8,  1.9,  2.1,   -.8],
        [-2.3,  -.9,  1.2,  1.0,  1.9,  1.7,  2.5,  -1.6],
        [-2.9, -5.3, -1.2,  -.3,  -.1,  1.8, -1.4,  -1.9],
        [-10.5, -2.1, -5.8, -3.3, -1.7, -2.8, -1.9,  -2.3]
    ];

var startKnightEvalBlack = reverseArray(startKnightEvalWhite);

var endKnightEvalWhite =
    [
        [-5.8, -3.8, -1.3, -2.8, -3.1, -2.7, -6.3, -9.9],
        [-2.5,  -.8, -2.5,  -.2,  -.9, -2.5, -2.4, -5.2],
        [-2.4, -2.0,  1.0,   .9,  -.1,  -.9, -1.9, -4.1],
        [-1.7,   .3,  2.2,  2.2,  2.2,  1.1,   .8, -1.8],
        [-1.8,  -.6,  1.6,  2.5,  1.6,  1.7,   .4, -1.8],
        [-2.3,  -.3,  -.1,  1.5,  1.0,  -.3, -2.0, -2.2],
        [-4.2, -2.0, -1.0,  -.5,  -.2, -2.0, -2.3, -4.4],
        [-2.9, -5.1, -2.3, -1.5, -2.2, -1.8, -5.0, -6.4]
    ];

var endKnightEvalBlack = reverseArray(endKnightEvalWhite);




var startBishopEvalWhite = [
    [-2.9,   .4, -8.2, -3.7, -2.5, -4.2,   .7,  -.8],
    [-2.6,  1.6, -1.8, -1.3,  3.0,  5.9,  1.8, -4.7],
    [-1.6,  3.7,  4.3,  4.0,  3.5,  5.0,  3.7,  -.2],
    [-.4,   .5,  1.9,  5.0,  3.7,  3.7,   .7,  -.2],
    [-.6,  1.3,  1.3,  2.6,  3.4,  1.2,  1.0,   .4],
    [.0,  1.5,  1.5,  1.5,  1.4,  2.7,  1.8,  1.0],
    [.4,  1.5,  1.6,   .0,   .7,  2.1,  3.3,   .1],
    [-3.3,  -.3, -1.4, -2.1, -1.3, -1.2, -3.9, -2.1]
];

var startBishopEvalBlack = reverseArray(startBishopEvalWhite);

var endBishopEvalWhite = [
    [-1.4, -2.1, -1.1,  -.8, -.7,  -.9, -1.7, -2.4],
    [-.8,  -.4,   .7, -1.2, -.3, -1.3,  -.4, -1.4],
    [.2,  -.8,   .0,  -.1, -.2,   .6,   .0,   .4],
    [-.3,   .9,  1.2,   .9, 1.4,  1.0,   .3,   .2],
    [-.6,   .3,  1.3,  1.9,  .7,  1.0,  -.3,  -.9],
    [-1.2,  -.3,   .8,  1.0, 1.3,   .3,  -.7, -1.5],
    [-1.4, -1.8,  -.7,  -.1,  .4,  -.9, -1.5, -2.7],
    [-2.3,  -.9, -2.3,  -.5, -.9, -1.6,  -.5, -1.7]
];

var endBishopEvalBlack = reverseArray(endBishopEvalWhite);




var startRookEvalWhite = [
    [3.2,  4.2,  3.2,  5.1, 6.3,  .9,  3.1,  4.3],
    [2.7,  3.2,  5.8,  6.2, 8.0, 6.7,  2.6,  4.4],
    [-.5,  1.9,  2.6,  3.6, 1.7, 4.5,  6.1,  1.6],
    [-2.4, -1.1,   .7,  2.6, 2.4, 3.5,  -.8, -2.0],
    [-3.6, -2.6, -1.2,  -.1,  .9, -.7,   .6, -2.3],
    [-4.5, -2.5, -1.6, -1.7,  .3,  .0,  -.5, -3.3],
    [-4.4, -1.6, -2.0,  -.9, -.1, 1.1,  -.6, -7.1],
    [-1.9, -1.3,   .1,  1.7, 1.6,  .7, -3.7, -2.6]
];

var startRookEvalBlack = reverseArray(startRookEvalWhite);

var endRookEvalWhite = [
    [1.3, 1.0, 1.8, 1.5, 1.2,  1.2,   .8,   .5],
    [1.1, 1.3, 1.3, 1.1, -.3,   .3,   .8,   .3],
    [.7,  .7,  .7,  .5,  .4,  -.3,  -.5,  -.3],
    [.4,  .3, 1.3,  .1,  .2,   .1,  -.1,   .2],
    [.3,  .5,  .8,  .4, -.5,  -.6,  -.8, -1.1],
    [-.4,  .0, -.5, -.1, -.7, -1.2,  -.8, -1.6],
    [-.6, -.6,  .0,  .2, -.9,  -.9, -1.1,  -.3],
    [-.9,  .2,  .3, -.1, -.5, -1.3,   .4, -2.0]
];

var endRookEvalBlack = reverseArray(endRookEvalWhite);




var startQueenEvalWhite = [
    [-2.8,   .0,  2.9,  1.2,  5.9,  4.4,  4.3,  4.5],
    [-2.4, -3.9,  -.5,   .1, -1.6,  5.7,  2.8,  5.4],
    [-1.3, -1.7,   .7,   .8,  2.9,  5.6,  4.7,  5.7],
    [-2.7, -2.7, -1.6, -1.6,  -.1,  1.7,  -.2,   .1],
    [-.9, -2.6,  -.9, -1.0,  -.2,  -.4,   .3,  -.3],
    [-1.4,   .2, -1.1,  -.2,  -.5,   .2,  1.4,   .5],
    [-3.5,  -.8,  1.1,   .2,   .8,  1.5,  -.3,   .1],
    [-.1, -1.8,  -.9,  1.0, -1.5, -2.5, -3.1, -5.0]
];

var startQueenEvalBlack = reverseArray(startQueenEvalWhite);

var endQueenEvalWhite = [
    [-.9,  2.2,  2.2,  2.7,  2.7,  1.9,  1.0,  2.0],
    [-1.7,  2.0,  3.2,  4.1,  5.8,  2.5,  3.0,   .0],
    [-2.0,   .6,   .9,  4.9,  4.7,  3.5,  1.9,   .9],
    [.3,  2.2,  2.4,  4.5,  5.7,  4.0,  5.7,  3.6],
    [-1.8,  2.8,  1.9,  4.7,  3.1,  3.4,  3.9,  2.3],
    [-1.6, -2.7,  1.5,   .6,   .9,  1.7,  1.0,   .5],
    [-2.2, -2.3, -3.0, -1.6, -1.6, -2.3, -3.6, -3.2],
    [-3.3, -2.8, -2.2, -4.3,  -.5, -3.2, -2.0, -4.1]
];

var endQueenEvalBlack = reverseArray(endQueenEvalWhite);




var startKingEvalWhite = [

    [-6.5,  2.3,  1.6, -1.5, -5.6, -3.4,   .2,  1.3],
    [2.9,  -.1, -2.0,  -.7,  -.8,  -.4, -3.8, -2.9],
    [-.9,  2.4,   .2, -1.6, -2.0,   .6,  2.2, -2.2],
    [-1.7, -2.0, -1.2, -2.7, -3.0, -2.5, -1.4, -3.6],
    [-4.9,  -.1, -2.7, -3.9, -4.6, -4.4, -3.3, -5.1],
    [-1.4, -1.4, -2.2, -4.6, -4.4, -3.0, -1.5, -2.7],
    [ .1,   .7,  -.8, -6.4, -4.3, -1.6,   .9,   .8],
    [-1.5,  3.6,  1.2, -5.4,   .8, -2.8,  2.4,  1.4]
];

var startKingEvalBlack = reverseArray(startKingEvalWhite);

var endKingEvalWhite = [

    [-7.4, -3.5, -1.8, -1.8, -1.1,  1.5,   .4, -1.7],
    [-1.2,  1.7,  1.4,  1.7,  1.7,  3.8,  2.3,  1.1],
    [1.0,  1.7,  2.3,  1.5,  2.0,  4.5,  4.4,  1.3],
    [-.8,  2.2,  2.4,  2.7,  2.6,  3.3,  2.6,   .3],
    [-1.8,  -.4,  2.1,  2.4,  2.7,  2.3,   .9, -1.1],
    [-1.9,  -.3,  1.1,  2.1,  2.3,  1.6,   .7,  -.9],
    [-2.7, -1.1,   .4,  1.3,  1.4,   .4,  -.5, -1.7],
    [-5.3, -3.4, -2.1, -1.1, -2.8, -1.4, -2.4, -4.3]
];

var endKingEvalBlack = reverseArray(endKingEvalWhite);

var startWhiteTables = [startPawnEvalWhite, startKnightEvalWhite, startBishopEvalWhite, startRookEvalWhite, startQueenEvalWhite, startKingEvalWhite];
var startBlackTables = [startPawnEvalBlack, startKnightEvalBlack, startBishopEvalBlack, startRookEvalBlack, startQueenEvalBlack, startKingEvalBlack];

var whiteTables = new Array(6);
var blackTables = new Array(6);

for(var i = 0; i < 6; i++)
    {
        whiteTables[i] = new Array(8);
        blackTables[i] = new Array(8);

        for(var j = 0; j < 8; j++)
        {
            whiteTables[i][j] = new Array(8);
            blackTables[i][j] = new Array(8);
        }
    }

var endWhiteTables = [endPawnEvalWhite, endKnightEvalWhite, endBishopEvalWhite, endRookEvalWhite, endQueenEvalWhite, endKingEvalWhite];
var endBlackTables = [endPawnEvalBlack, endKnightEvalBlack, endBishopEvalBlack, endRookEvalBlack, endQueenEvalBlack, endKingEvalBlack];