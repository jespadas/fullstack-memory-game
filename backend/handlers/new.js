'use strict';
var dataProvider = require('../data/new.js');
var MAX_MATCHES = 20;
/**
 * Operations on /new
 */
module.exports = {
    /**
     * summary: Initializes a new game board of the specified size (# of matches)
     * parameters: size
     * produces: application/json, text/json
     * responses: 200, 400
     */
    post: function game_new(req, res, next) {
        var status;
        var message;
        global.board = null;  // Null out the current game

        // This is a valid game size: initialize new game board
        if ((req.query.size > 0)&&(req.query.size <= MAX_MATCHES)){
            status = 200;
            var provider = dataProvider['post']['200'];

            // Call the data layer to shuffle up a new game
            var board = provider(req, res, function (err, data) {
                if (err) {
                    next(err);
                    return;
                }
            });
            message = "Ready to play! Matches to find = " +
                     req.query.size; 
        } else {  // Invalid # of matches specified: set bad request error
            status = 400;
            message = "Size of game (# of matches) must be between 1 and " +
                      MAX_MATCHES + ". Specified size = " + req.query.size; 
        }
        res.status(status).send(message);
    }
};