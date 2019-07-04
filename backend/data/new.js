'use strict';
var Mockgen = require('./mockgen.js');

// Knuth shuffle courtesy of https://www.kirupa.com/html5/shuffling_array_js.htm
Array.prototype.shuffle = function() {
  var input = this;
  for (var i=input.length-1; i >=0; i--){
    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};
/**
 * Operations on /new
 */
module.exports = {
    /**
     * summary: Sets up a new game board with specified # of matches
     * description: The game board is a global array of "card" objects, where
     *  their position in the array indicates their ID, and their "value" and
     *  "cleared" properties represent their value and game status. For example,
     * a new board of size=1 (1 matches) would be generated as:
     *  [ 
     *      { "cleared":"false", 
     *        "value":"0", 
     *      }, 
     *      { "cleared":"false", 
     *        "value":"0", 
     *      }
     *  ]
     * parameters: size
     * produces: application/json, text/json
     * responses: 200
     * operationId: game_new
     */
    post: {
        200: function (req, res, callback) {
             // Generate random [0...size] value pairs and shuffle them
             var values = Array.from(Array(req.query.size).keys());
             var deck = values.concat(values.slice());
             deck.shuffle();

             // Create corresponding card objects
             var board = []; 
             for (var i=0; i<deck.length; i++){
                 var card = {};
                 card.cleared = "false";
                 card.value =  deck[i];
                 board.push(card);
             }

             // For sample purposes only; use cloud storage
             global.board = board;
        }
    }
};