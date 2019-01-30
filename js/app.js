(function({ helpers }) {
  var model = {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    XO: 0,
  };

  var controller = {
    checkBox: function(row, col) {
      const cell = model.board[row][col];
      if (+!!cell) {
        return;
      }

      model.board[row][col] = model.XO ? 1 : 2;
      console.log(JSON.stringify(model));
    },
    toggleXO: function() {
      model.XO = +!model.XO;
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
              this.textContent = +!model.XO ? 'X' : 'O';
              controller.toggleXO();
            }

            controller.checkBox(rowNumber, colNumber);
            helpers.checkForWinningRow(model.board);
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
