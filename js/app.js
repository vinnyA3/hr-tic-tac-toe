(({ weHaveAwinner }) => {
  var model = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    currentPlayer: 0,
    totalPlays: 0,
  };

  var controller = {
    checkBox: (row, col) => {
      let cell = model.board[row][col];

      if (cell !== '') {
        return void 0;
      }

      model.board[row][col] = model.currentPlayer ? 'X' : 'O';
      controller.updateTotalPlays();
    },
    toggleCurrentPlayer: () => (model.currentPlayer = +!model.currentPlayer),
    updateTotalPlays: () => model.totalPlays++,
    resetGame: () => {
      model.currentPlayer = 0;
      model.totalPlays = 0;
      model.board = [['', '', ''], ['', '', ''], ['', '', '']];
      view.resetView();
    },
    initialize: () => {
      resetButtonView.init();
      view.init();
    },
  };

  var view = (() => {
    const board = document.getElementById('board');

    const init = () => {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.dataset.row = i;

        for (let j = 0; j < 3; j++) {
          const col = document.createElement('div');
          col.classList.add('col');
          col.dataset.col = j;

          col.addEventListener('click', function({ target }) {
            const rowNumber = parseInt(target.parentNode.dataset.row);
            const colNumber = parseInt(target.dataset.col);

            if (this.childElementCount === 0) {
              const cellValue = document.createElement('span');
              cellValue.textContent = +!model.currentPlayer ? 'X' : 'O';
              this.appendChild(cellValue);
              controller.toggleCurrentPlayer();
            }

            controller.checkBox(rowNumber, colNumber);

            if (model.totalPlays > 4) {
              if (weHaveAwinner(model)) {
                alert(`Winner: ${model.currentPlayer ? 'X' : 'O'}`);
                controller.resetGame();
              }
            }

            if (model.totalPlays === 9) {
              alert('It is a tie!');
              controller.resetGame();
            }
          });

          row.appendChild(col);
        }
        fragment.appendChild(row);
      }
      board.appendChild(fragment);
    };

    const resetView = () => {
      while (board.firstChild) board.removeChild(board.firstChild);
      view.init();
    };

    return {
      init,
      resetView,
    };
  })();

  var resetButtonView = (() => {
    const button = document.getElementById('resetButton');
    const init = () => {
      button.addEventListener('click', e => {
        if (model.totalPlays > 0) {
          controller.resetGame();
        }
      });
    };

    return {
      init,
    };
  })();

  // initialize / seed the view
  controller.initialize();
})(window.helpers);
