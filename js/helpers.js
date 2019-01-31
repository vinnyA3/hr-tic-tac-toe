(function(window) {
  const checkForWinningRow = (board, currentPlayer) => {
    let xCount = 0;
    let oCount = 0;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === 'X') {
          console.log(xCount);
          xCount++;
        } else if (board[i][j] === 'O') {
          oCount++;
        }
      }
    }

    console.log('x count: ', xCount);
    console.log('o count: ', oCount);

    if (xCount === 3 || oCount === 3) {
      console.log('row');
      alert(`currentPlayer: ${currentPlayer ? 'X' : 'O'} wins!!`);
      return;
    }
  };

  const checkForWinningMajor = (board, currentPlayer) => {
    let xCount = 0;
    let oCount = 0;

    for (let i = 0; i < board.length - 1; i++) {
      const current = board[i + 1][i + 1] || '';

      if (current !== '') {
        if (current === 'X') {
          xCount++;
        } else if (current === 'Y') {
          oCount++;
        }
      }
    }

    if (xCount === 3 || oCount === 3) {
      console.log('major');
      alert(`currentPlayer: ${currentPlayer ? 'X' : 'O'} wins!!`);
      return;
    }
  };

  const checkForWinningMinor = (board, currentPlayer) => {
    let xCount = 0;
    let oCount = 0;

    for (let i = board.length - 1; i >= 0; i--) {
      const current = board[i][i - 1] || '';

      if (current !== '') {
        if (current === 'X') {
          xCount++;
        } else if (current === 'Y') {
          oCount++;
        }
      }
    }

    if (xCount === 3 || oCount === 3) {
      console.log('minor');
      alert(`currentPlayer: ${currentPlayer} wins!!`);
      return;
    }
  };

  const checkForWinner = ({ board, currentPlayer }) => {
    checkForWinningRow(board, currentPlayer);
    checkForWinningMajor(board, currentPlayer);
    checkForWinningMinor(board, currentPlayer);
  };

  window.helpers = {
    checkForWinner,
  };
})(window);
