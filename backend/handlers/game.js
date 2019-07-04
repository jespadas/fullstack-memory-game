'use strict';
var dataProvider = require('../data/game.js');
/**
 * Operations on /game
 */
module.exports = {
    /**
     * summary: Retrieves the current state of the memory game board.
     * parameters: (none)
     * produces: application/json, text/json
     * responses: 200, 400
     */
    get: function game_get(req, res, next) {
        var status;
        var message;
        
        // If there's a game in progress, retrieve its current state
        if (global.board){
            status = 200;
            var provider = dataProvider['get']['200'];
            var board = provider(req, res, function (err, data) {
                if (err) {
                    next(err);
                    return;
                }
            });
            res.json(board);
        }
        else { // No game in progress: set bad request error
            status = 400;
            message = "Please start a new game (POST '/new?size={# of matches}')."
        }
        res.status(status).send(message);
    }
};