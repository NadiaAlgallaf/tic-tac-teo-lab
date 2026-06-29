/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie

/*-------------------------------- Functions --------------------------------*/

// Start / reset game
function init() {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false

  render()
}

// Render everything
function render() {
  updateBoard()
  updateMessage()
}

// Show board on screen
function updateBoard() {
  board.forEach((cell, index) => {
    squareEls[index].textContent = cell
  })
}

// Show message
function updateMessage() {
  if (winner) {
    messageEl.textContent = winner + ' wins!'
  } else if (tie) {
    messageEl.textContent = 'Tie game!'
  } else {
    messageEl.textContent = 'Turn: ' + turn
  }
}

// Handle click
function handleClick(index) {
  if (board[index] !== '' || winner) return

  board[index] = turn

  checkForWinner()
  checkForTie()

  if (!winner && !tie) {
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }

  render()
}

// Check winner
function checkForWinner() {
  for (let combo of winningCombos) {
    let a = combo[0]
    let b = combo[1]
    let c = combo[2]

    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a]
    }
  }
}

// Check tie
function checkForTie() {
  if (!board.includes('') && !winner) {
    tie = true
  }
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square, index) => {
  square.addEventListener('click', function () {
    handleClick(index)
  })
})

// Reset button
resetBtnEl.addEventListener('click', init)

// Start game
init()
