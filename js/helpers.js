(function(window) {
  const checkForWinningRow = board => {
    for (let i = 0; i < board.length; ++i) {
      if (board[i].every(colVal => colVal === 1)) {
        console.log(`winner @ row: ${i}`);
        return;
      }
    }
  };

  window.helpers = {
    checkForWinningRow,
  };
})(window);
