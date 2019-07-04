'use strict';
var dataProvider = require('../data/guess.js');
/**
 * Operations on /guess
 */
module.exports = {
    /**
     * summary: Specifies a card (ID) to reveal
     * parameters: card
     * produces: application/json, text/json
     * responses: 200, 400
     */
    put: function game_guess(req, res, next) {
        var status, message;
        var validGuess = true;
        var board = global.board;
        var guess = req.query.card;

        // Ensure there's a game running
        if (!board){
            validGuess = false;
            message = "Please start a new game (POST '/new?size={# of matches}')."
        } 
        // Ensure card isn't out of range
        else if ((guess < 0)||(guess > board.length)){
            validGuess = false;
            message = "Please specify card ids within the range of 0 to " +
                String(board.length-1) + ".";
        }
        // Check that card hasn't been cleared
        else if ("true" == board[guess].cleared) {
            validGuess = false;
            message = "Please specify a card which hasn't been cleared."
        }
        
        // This is a valid guess: reveal the card
        if (validGuess){
            status = 200;
            var provider = dataProvider['put']['200'];
            var card = provider(req, res, function (err, data) {
                if (err) {
                    next(err);
                    return;
                }
            });
            res.json(card);
        } else {    // This is not a valid guess: set bad request error
            status = 400;
        }

        res.status(status).send(message);
    }
};