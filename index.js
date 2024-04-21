// fastest win is 5 moves
// slowest win is 9 moves
// X leads.
// Since the game is symmetrical, you can mirror all X wins & draws to get the Y-lead results.

// win helpers

function isInLine(val1, val2, val3) {
  return val1 === "X" && val2 === "X" && val3 === "X";
}

function isHorizontalWin(array) {
  for (let i = 0; i <= 6; i += 3) {
    if (isInLine(...array.slice(i, i + 3))) return true;
  }
  return false;
}

function isVerticalWin(array) {
  for (let i = 0; i <= 3; i++) {
    if (isInLine(array[i], array[i + 3], array[i + 6])) return true;
  }
  return false;
}

function isDiagonalWin(array) {
  const centerSquareVal = array[4];
  if (array[4] !== "X") return false;
  return (
    isInLine(array[0], centerSquareVal, array[8]) ||
    isInLine(array[2], centerSquareVal, array[6])
  );
}

function isWin(board) {
  return isDiagonalWin(board) || isHorizontalWin(board) || isVerticalWin(board);
}

// win helpers above

const getMirroredBoardAsString = (board) => {
  const mirror = { X: "O", O: "X", E: "E" };
  let result = "";
  for (square of board) {
    result += mirror[square];
  }
  return result;
};

const getPlayerSymbol = (turn) => ["X", "Y"][turn % 2];

function makeMove(board, endGames, wins, draws, turn = 0) {
  if (turn >= 5) {
    // fastest win is at turn 5
    const boardAsString = board.join("");
    if (!endGames[boardAsString] && isWin(board)) {
      endGames[boardAsString] = turn;
      endGames[getMirroredBoardAsString(board)] = turn;
      wins += 1;
      return;
    }
    if (turn === 9 && !endGames[boardAsString]) {
      // these are draws
      endGames[boardAsString] = turn;
      endGames[getMirroredBoardAsString(board)] = turn;
      draws += 1;
      return;
    }
  }
  if (turn <= 9) {
    const mySymbol = getPlayerSymbol(turn);
    for (let i = 0; i < 9; i++) {
      if (board[i] === "E") {
        const nextBoard = [...board];
        nextBoard[i] = mySymbol;
        makeMove(nextBoard, turn + 1);
      }
    }
  }
  return;
}

const getAllEndGames = () => {
  const endGames = {};
  let wins = 0;
  let draws = 0;

  makeMove(new Array(9).fill("E"), endGames, wins, draws);
  return { wins, draws, endGames };
};

const allPossibleStates = getAllEndGames();

console.log("possible draws:", allPossibleStates.draws);
console.log("possible wins:", allPossibleStates.wins);
