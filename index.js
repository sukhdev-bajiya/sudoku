let otp = document.querySelector(".digit-group");
for (let pin of otp.children) {
  pin.onkeyup = function (e) {
    if (e.key >= 1 && e.key <= 9) {
      if (pin.nextElementSibling) {
        pin.nextElementSibling.focus();
      }
    } else {
      alert("Please Enter A Number");
    }
  };
}

function solveSudokuFun() {
  document.getElementById("solveSudoku").setAttribute("disabled", true);
  document.getElementById("randomSudoku").setAttribute("disabled", true);
  document.getElementById("resetSudoku").removeAttribute("disabled");
  let inputBoxs = document.querySelectorAll("input");
  for (let i = 0; i < inputBoxs.length; i++) {
    inputBoxs[i].setAttribute("disabled", true);
  }
  document.getElementById("startSudokuDiv").style.display = "block";
}
function resetSudokuFun() {
  document.getElementById("solveSudoku").removeAttribute("disabled");
  document.getElementById("randomSudoku").removeAttribute("disabled");
  document.getElementById("resetSudoku").setAttribute("disabled", true);
  let inputBoxs = document.querySelectorAll("input");
  for (let i = 0; i < inputBoxs.length; i++) {
    inputBoxs[i].disabled = false;
  }
  document.getElementById("startSudokuDiv").style.display = "none";
}

function startSudokuFun() {
  document.getElementById("solveSudoku").setAttribute("disabled", true);
  document.getElementById("resetSudoku").setAttribute("disabled", true);
  document.getElementById("randomSudoku").setAttribute("disabled", true);
  document.getElementById("startSudoku").setAttribute("disabled", true);

  let sudokuMatrix = new Array(9);
  for (let i = 0; i < 9; i++) {
    sudokuMatrix[i] = new Array(9);
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      sudokuMatrix[i][j] =
        document.getElementById(`digit-${i * 9 + j + 1}`).value || 0;
    }
  }
  if (solveFunStart(sudokuMatrix)) {
    let i = 0,
      j = 0;
    const sudokuOutput = setInterval(() => {
      if (i % 2 == 0) {
        document.getElementById(`digit-${i * 9 + j + 1}`).value =
          sudokuMatrix[i][j];
        j++;
        if (j == 9) {
          i++;
          j = 8;
        }
      } else {
        document.getElementById(`digit-${i * 9 + j + 1}`).value =
          sudokuMatrix[i][j];
        j--;
        if (j == -1) {
          i++;
          j = 0;
        }
      }
      if (i == 9) {
        document.getElementById(
          "startSudokuDiv"
        ).innerHTML = `<button id="restartSudoku" class="sudokuBtn" onclick="restartSudokuFun()">Restart Sudoku</button>`;
        clearInterval(sudokuOutput);
      }
    }, 100);
  } else {
    alert(-1);
    document.getElementById(
      "startSudokuDiv"
    ).innerHTML = `<button id="restartSudoku" class="sudokuBtn" onclick="restartSudokuFun()">Restart Sudoku</button>`;
  }
}

function solveFunStart(sudokuMatrix) {
  let p = -1,
    q = -1,
    empty = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudokuMatrix[i][j] == 0) {
        p = i;
        q = j;
        empty = 1;
        break;
      }
    }
    if (empty == 1) break;
  }
  if (empty == 0) return true;
  for (let i = 1; i <= 9; i++) {
    if (safe(sudokuMatrix, p, q, i)) {
      sudokuMatrix[p][q] = i;
      if (solveFunStart(sudokuMatrix)) {
        return true;
      } else {
        sudokuMatrix[p][q] = 0;
      }
    }
  }
  return false;
}

function safe(sudokuMatrix, p, q, i) {
  for (let j = 0; j < 9; j++) {
    if (sudokuMatrix[p][j] == i) return false;
  }
  for (let j = 0; j < 9; j++) {
    if (sudokuMatrix[j][q] == i) return false;
  }
  let rowstart = p - (p % 3),
    colstart = q - (q % 3);
  for (let j = rowstart; j < rowstart + 3; j++) {
    for (let k = colstart; k < colstart + 3; k++) {
      if (sudokuMatrix[j][k] == i) return false;
    }
  }
  return true;
}

function restartSudokuFun() {
  document.getElementById("solveSudoku").removeAttribute("disabled");
  document.getElementById("randomSudoku").removeAttribute("disabled");
  document.getElementById("resetSudoku").removeAttribute("disabled");
  let inputBoxs = document.querySelectorAll("input");
  for (let j = 0; j <= 80; j++) {
    document.getElementById(`digit-${j + 1}`).value = "";
    inputBoxs[j].removeAttribute("disabled");
  }
  document.getElementById(
    "startSudokuDiv"
  ).innerHTML = `<button id="startSudoku" class="sudokuBtn" onclick="startSudokuFun()">Start Sudoku</button>`;
  document.getElementById("startSudokuDiv").style.display = "none";
}

function randomSudokuFun() {
  let inputBoxs = document.querySelectorAll("input");
  for (let i = 0; i < inputBoxs.length; i++) {
    inputBoxs[i].setAttribute("disabled", true);
  }
  document.getElementById(`digit-1`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-13`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-25`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-29`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-41`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-53`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-57`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-69`).value = Math.floor(Math.random() * 9 + 1);
  document.getElementById(`digit-81`).value = Math.floor(Math.random() * 9 + 1);
}
