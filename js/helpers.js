(function(window) {
  const checkForWinningRow = ({ board, currentPlayer }) => {
    for (let i = 0; i < board.length; i++) {
      let xCount = (oCount = 0);

      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === '') {
          break;
        } else if (board[i][j] === 'X') {
          xCount++;
        } else if (board[i][j] === 'O') {
          oCount++;
        }
      }

      if (xCount === 3 || oCount === 3) {
        return true;
      }
    }
  };

  const checkForWinningColumn = ({ board, currentPlayer }) => {
    let rowCount = (xCount = oCount = 0);

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        let current = board[j][i];

        if (current !== '') {
          if (current === 'X') {
            xCount++;
          } else if (current === 'O') {
            oCount++;
          }
        }

        if (xCount === 3 || oCount === 3) {
          return true;
        }
      }

      xCount = oCount = 0;
    }
  };

  const checkForWinningMajor = ({ board, currentPlayer }) => {
    let xCount = (oCount = colCount = 0);

    for (let i = 0; i < board.length; i++) {
      const current = board[i][colCount++] || '';

      if (current !== '') {
        if (current === 'X') {
          xCount++;
        } else if (current === 'O') {
          oCount++;
        }
      }
    }

    if (xCount === 3 || oCount === 3) {
      return true;
    }
  };

  const checkForWinningMinor = ({ board, currentPlayer }) => {
    let xCount = (oCount = 0);
    let colCount = board.length - 1;

    for (let i = 0; i < board.length; i++) {
      const current = board[i][colCount--] || '';

      if (current !== '') {
        if (current === 'X') {
          xCount++;
        } else if (current === 'O') {
          oCount++;
        }
      }
    }

    if (xCount === 3 || oCount === 3) {
      return true;
    }
  };

  const weHaveAwinner = model =>
    checkForWinningRow(model) ||
    checkForWinningColumn(model) ||
    checkForWinningMajor(model) ||
    checkForWinningMinor(model) ||
    false;

  window.helpers = {
    weHaveAwinner,
  };
})(window);
