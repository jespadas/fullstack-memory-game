'use strict';
var Mockgen = require('./mockgen.js');
var card1 = null;
/**
 * Operations on /guess
 */
module.exports = {
    /**
     * summary: Reveals the specified card and checks for match to the previous.
     * description: Each guess consists of 2 specified cards.
     * parameters: card
     * produces: application/json, text/json
     * responses: 200
     * operationId: game_guess
     */
    put: {
        200: function (req, res, callback) {
             // Obtain the card values
             var response = {};
             var card = req.query.card;

             response.id = card;
             response.value = global.board[card].value;

             // If 1st card has been specified, check if this 2nd card matches
             if (card1 !== null){
                if (global.board[card1].value === global.board[card].value){
                    global.board[card1].cleared =
                    global.board[card].cleared = "true";
                }
                card1 = null;
             } else { // This is the 1st card of the guess
                 card1 = card;
             }

             return Array(response);
        }
    }
};