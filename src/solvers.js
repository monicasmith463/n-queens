/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n:n});
  var array = board.rows();
  for (var col = 0; col < array.length; col++ ) {
    var subArr = [];
    for( var row = 0; row < array.length; row++ ) {
      board.togglePiece(row,col);
      if(board.hasAnyRooksConflicts()) {
        board.togglePiece(row,col);
        subArr.push(0);
      } else {
        subArr.push(1);
      }
    }
    solution.push(subArr);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var array = board.rows();
  // make recursive function
  var recursive = function (col) {
  //iterate over row at the col
    if(col === array.length) {
      solutionCount++;
    } else if (col < array.length) {
      for(var row=0; row<array.length; row++) {
        board.togglePiece(row,col)
        if(!board.hasAnyRooksConflicts()) {
          col += 1;
          recursive(col);
        } else {
          board.togglePiece(row,col)
        }
      }
    } 
  }
  recursive(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n:n});
  var array = board.rows();

  var findBestSolution = function(i) {
    var counter = 0
    for (var col = i; col < array.length; col++ ) {
      var subArr = [];
      for( var row = 0; row < array.length; row++ ) {
        board.togglePiece(row,col);
        if(board.hasAnyQueensConflicts()) {
          board.togglePiece(row,col);
          subArr.push(0);
        } else {
          counter += 1;
          subArr.push(1);
        }
      }
      solution.push(subArr);
    }
    if (i !== 0) {
      for (var col = 0; col < i; col++ ) {
        var subArr = [];
        for( var row = 0; row < array.length; row++) {
          board.togglePiece(row,col);
          if(board.hasAnyQueensConflicts()) {
            board.togglePiece(row,col);
            subArr.push(0);
          } else {
            counter += 1
            subArr.push(1);
          }
        }
        solution.push(subArr);
      }
    }
    if (counter === array.length) {
      return solution
    }
  }
  

  for(var k = 0; k < array.length; k++) {
    solution = findBestSolution(k);
    if (solution !== undefined) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    } 
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
