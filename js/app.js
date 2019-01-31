(function({ helpers }) {
  var model = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    currentPlayer: 0,
  };

  var controller = {
    checkBox: function(row, col) {
      let cell = model.board[row][col];

      if (+!!cell) {
        return;
      }

      model.board[row][col] = model.currentPlayer ? 'X' : 'O';
      console.log(JSON.stringify(model));
    },
    toggleXO: function() {
      model.currentPlayer = +!model.currentPlayer;
    },
    init: () => {
      view.init();
    },
  };

  var view = (function() {
    const board = document.getElementById('board');
    const init = function() {
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

            if (this.textContent === '') {
              this.textContent = +!model.currentPlayer ? 'X' : 'O';
              controller.toggleXO();
            }

            controller.checkBox(rowNumber, colNumber);
            helpers.checkForWinner(model);
          });
          row.appendChild(col);
        }

        fragment.appendChild(row);
      }

      board.appendChild(fragment);
    };

    return {
      init,
    };
  })();

  controller.init();
})(window);
