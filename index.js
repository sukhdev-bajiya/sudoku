let otp = document.querySelector(".digit-group");
for (let pin of otp.children) {
  pin.onkeyup = function (e) {
    if (e.key >= 1 && e.key <= 9) {
      if (pin.nextElementSibling) {
        pin.nextElementSibling.focus();
      }
    } else if (
      e.key == "Backspace" ||
      e.key == "Tab" ||
      e.key == "Delete" ||
      e.key == "ArrowLeft" ||
      e.key == "ArrowUp" ||
      e.key == "ArrowRight" ||
      e.key == "ArrowDown"
    ) {
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

let sudokuMatrix = new Array(9);
for (let i = 0; i < 9; i++) {
  sudokuMatrix[i] = new Array(9);
}
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    sudokuMatrix[i][j] = 0;
  }
}
function startSudokuFun() {
  document.getElementById("solveSudoku").setAttribute("disabled", true);
  document.getElementById("resetSudoku").setAttribute("disabled", true);
  document.getElementById("randomSudoku").setAttribute("disabled", true);
  document.getElementById("startSudoku").setAttribute("disabled", true);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      sudokuMatrix[i][j] =
        document.getElementById(`digit-${i * 9 + j + 1}`).value || 0;
    }
  }
  if (solveFunStart()) {
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
    alert("Please enter a valid Sudoku");
    document.getElementById(
      "startSudokuDiv"
    ).innerHTML = `<button id="restartSudoku" class="sudokuBtn" onclick="restartSudokuFun()">Restart Sudoku</button>`;
  }
}

function solveFunStart() {
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
    if (safe(p, q, i)) {
      sudokuMatrix[p][q] = i;
      if (solveFunStart()) {
        return true;
      } else {
        sudokuMatrix[p][q] = 0;
      }
    }
  }
  return false;
}

function safe(p, q, i) {
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
  for (let j = 0; j < 30; j++) {
    let p = Math.floor(Math.random() * 8);
    let q = Math.floor(Math.random() * 8);
    let i = Math.floor(Math.random() * 9 + 1);
    if (safe(p, q, i)) {
      document.getElementById(`digit-${p * 9 + q + 1}`).value = i;
      sudokuMatrix[p][q] = i;
    }
  }
}
