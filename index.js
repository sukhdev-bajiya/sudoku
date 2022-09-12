$(".digit-group")
  .find("input")
  .each(function () {
    $(this).attr("maxlength", 1);
    $(this).on("keyup", function (e) {
      var parent = $($(this).parent());
      if (e.keyCode === 8 || e.keyCode === 37) {
        var prev = parent.find("input#" + $(this).data("previous"));

        if (prev.length) {
          $(prev).select();
        }
      } else if (
        (e.keyCode > 48 && e.keyCode <= 57) ||
        (e.keyCode > 96 && e.keyCode <= 105)
      ) {
        var next = parent.find("input#" + $(this).data("next"));

        if (next.length) {
          $(next).select();
        } else {
          if (parent.data("autosubmit")) {
            parent.submit();
          }
        }
      }
    });
  });

function solveSudokuFun() {
  let inputBoxs = document.querySelectorAll("input");
  for (let i = 0; i < inputBoxs.length; i++) {
    inputBoxs[i].setAttribute("disabled", true);
  }
  document.getElementById("startSudokuDiv").style.display = "block";
}
function resetSudokuFun() {
  let inputBoxs = document.querySelectorAll("input");
  for (let i = 0; i < inputBoxs.length; i++) {
    inputBoxs[i].disabled = false;
  }
  document.getElementById("startSudokuDiv").style.display = "none";
}

function startSudokuFun() {
  document.getElementById("solveSudoku").setAttribute("disabled", true);
  document.getElementById("resetSudoku").setAttribute("disabled", true);
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
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        document.getElementById(`digit-${i * 9 + j + 1}`).value =
          sudokuMatrix[i][j];
      }
    }
  } else {
    alert(-1);
  }
  document.getElementById(
    "startSudokuDiv"
  ).innerHTML = `<button id="restartSudoku" class="sudokuBtn" onclick="restartSudokuFun()">Restart Sudoku</button>`;
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
      document.getElementById(`digit-${p * 9 + q + 1}`).value = i;

      if (solveFunStart(sudokuMatrix)) {
        return true;
      } else {
        sudokuMatrix[p][q] = 0;
        document.getElementById(`digit-${p * 9 + q + 1}`).value = 0;
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
  let inputBoxs = document.querySelectorAll("input");
  for (let j = 0; j <= 80; j++) {
    document.getElementById(`digit-${j + 1}`).value = "";
    inputBoxs[j].disabled = false;
  }
  document.getElementById("solveSudoku").disabled = false;
  document.getElementById("resetSudoku").disabled = false;
  document.getElementById(
    "startSudokuDiv"
  ).innerHTML = `<button id="startSudoku" class="sudokuBtn" onclick="startSudokuFun()">Start Sudoku</button>`;
  document.getElementById("startSudokuDiv").style.display = "none";
}
