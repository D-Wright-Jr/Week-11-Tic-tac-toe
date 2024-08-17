$(function () {
  const boardSize = 3;
  let currentPlayer = "X";
  let moves = 0;
  let gameActive = true;
  const board = $("#board");

  // Initialize the board
  function createBoard() {
    board.empty();
    for (let i = 0; i < boardSize * boardSize; i++) {
      board.append('<div class="cell"></div>');
    }
    $(".cell").click(cellClicked);
    updateStatus();
  }

  // Handle cell click
  function cellClicked() {
    if (!gameActive || $(this).text() !== "") return;

    $(this).text(currentPlayer);
    moves++;

    if (checkWin()) {
      $("#status").text(`Player ${currentPlayer} wins!`);
      gameActive = false;
      showEndGameAlert(`Player ${currentPlayer} wins!`);
    } else if (moves === boardSize * boardSize) {
      $("#status").text("It's a draw!");
      showEndGameAlert("It's a draw!");
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus();
    }
  }

  // Check for a win or draw
  function checkWin() {
    const cells = $(".cell")
      .map(function () {
        return $(this).text();
      })
      .get();
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winningCombinations.some((combination) => {
      return combination.every((index) => cells[index] === currentPlayer);
    });
  }

  // Update the game status text
  function updateStatus() {
    $("#status").text(`Player ${currentPlayer}'s turn`);
  }

  // Show end game alert
  function showEndGameAlert(message) {
    $('<div class="alert alert-success mt-3" role="alert"></div>')
      .text(message)
      .appendTo("#board")
      .hide()
      .fadeIn(1000);
  }

  // Restart game
  $("#restart").click(function () {
    currentPlayer = "X";
    moves = 0;
    gameActive = true;
    createBoard();
  });

  // Start the game
  createBoard();
});
