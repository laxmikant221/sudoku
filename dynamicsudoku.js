var input = [];
var sol = [], status = 0, index;
var sudoku = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
start();
function start(){ 
  generatesudoku();
  $("#check").click(function(){
    input.length = 0;
    index = 0;
    checksudoku();
  });
  $("#Submit").click(function(){
    status = 1;
    checksudoku();
  });
  
}
function checksudoku(){
  $("table tr").each(function() {
    var inputData = $(this).find('td').not('.vshow');
    if (inputData.length > 0) {
      inputData.each(function() { 
        var val = Number($(this).find('input').val());
        input.push(val);
        if(input[index] != sol[index]){
          $(this).css("color","#cc0000");
        }
        else{
          $(this).css({"color": "green", "background-color": "#e6ffee"});
        }
        index += 1;
      }); 
    }
  });
  if(status == 1){
    status = 0;
     compare(input, sol);
  }
  else{
    input.length = 0;
    idex = 0;
  }
}

function compare(input, sol){
  var flag = true;
  var i;
  for(i=0;i<sol.length;i++)
  {
    if(input[i] == sol[i]){
      flag = true;
      console.log("if");
    }
    else{
      flag = false;
    }
  }
  console.log(flag);
  if(flag == true){
    input.length = 0;
    idex = 0;
    status = 0;
    $("#press").click();
    $("#wmessage").text("Congratulations!!! You Won");
    $("#lmessage").text("");
    
  }
  else{
    input.length = 0;
    index = 0;
    status = 0;
    console.log(input);
    $("#press").click();
    $("#lmessage").text("You lost!!! Better Luck Next-Time");
    $("#wmessage").text("");
  }
}
function generatesudoku(){
  solve(sudoku);
  function returnRow(cell) {
  return Math.floor(cell / 9);
}

function returnCol(cell) {
  return cell % 9;
}

function returnBlock(cell) {
  return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}

function isPossibleRow(number,row,sudoku) {
  for (var i=0; i<=8; i++) {
    if (sudoku[row*9+i] == number) {
      return false;
    }
  }
  return true;
}

function isPossibleCol(number,col,sudoku) {
  for (var i=0; i<=8; i++) {
    if (sudoku[col+9*i] == number) {
      return false;
    }
  }
  return true;
}

function isPossibleBlock(number,block,sudoku) {
  for (var i=0; i<=8; i++) {
    if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
      return false;
    }
  }
  return true;
}

function isPossibleNumber(cell,number,sudoku) {
  var row = returnRow(cell);
  var col = returnCol(cell);
  var block = returnBlock(cell);
  return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku) && isPossibleBlock(number,block,sudoku);
}

function isCorrectRow(row,sudoku) {
  var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
  var rowTemp= new Array();
  for (var i=0; i<=8; i++) {
    rowTemp[i] = sudoku[row*9+i];
  }
  rowTemp.sort();
  return rowTemp.join() == rightSequence.join();
}

function isCorrectCol(col,sudoku) {
  var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
  var colTemp= new Array();
  for (var i=0; i<=8; i++) {
    colTemp[i] = sudoku[col+i*9];
  }
  colTemp.sort();
  return colTemp.join() == rightSequence.join();
}

function isCorrectBlock(block,sudoku) {
  var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
  var blockTemp= new Array();
  for (var i=0; i<=8; i++) {
    blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
  }
  blockTemp.sort();
  return blockTemp.join() == rightSequence.join();
}

function isSolvedSudoku(sudoku) {
  for (var i=0; i<=8; i++) {
    if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
      return false;
    }
  }
  return true;
}

function determinePossibleValues(cell,sudoku) {
  var possible = new Array();
  for (var i=1; i<=9; i++) {
    if (isPossibleNumber(cell,i,sudoku)) {
      possible.unshift(i);
    }
  }
  return possible;
}

function determineRandomPossibleValue(possible,cell) {
  var randomPicked = Math.floor(Math.random() * possible[cell].length);
  return possible[cell][randomPicked];
}

function scanSudokuForUnique(sudoku) {
  var possible = new Array();
  for (var i=0; i<=80; i++) {
    if (sudoku[i] == 0) {
      possible[i] = new Array();
      possible[i] = determinePossibleValues(i,sudoku);
      if (possible[i].length==0) {
        return false;
      }
    }
  }
  return possible;

}

function removeAttempt(attemptArray,number) {
  var newArray = new Array();
  for (var i=0; i<attemptArray.length; i++) {
    if (attemptArray[i] != number) {
      newArray.unshift(attemptArray[i]);
    }
  }
  return newArray;
}

function nextRandom(possible) {
  var max = 9;
  var minChoices = 0;
  for (var i=0; i<=80; i++) {
    if (possible[i]!=undefined) {
      if ((possible[i].length<=max) && (possible[i].length>0)) {
        max = possible[i].length;
        minChoices = i;
      }
    }
  }
  return minChoices;
}

function solve(sudoku) {
  var saved = new Array();
  var savedSudoku = new Array();
  var i=0;
  var nextMove;
  var whatToTry;
  var attempt;
  while (!isSolvedSudoku(sudoku)) {
    i++;
    nextMove = scanSudokuForUnique(sudoku);
    if (nextMove == false) {
      nextMove = saved.pop();
      sudoku = savedSudoku.pop();
    }
    whatToTry = nextRandom(nextMove);
    attempt = determineRandomPossibleValue(nextMove,whatToTry);
    if (nextMove[whatToTry].length>1) {
      nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);
      saved.push(nextMove.slice());
      savedSudoku.push(sudoku.slice());
    }
    sudoku[whatToTry] = attempt;
  }console.log(sudoku);
  showSudoku(sudoku,i);

}
function showSudoku(sudoku,i){
  var x = sudoku.length;
  var y = 0;
  $("table td").each(function(){
    if(y < x){
    if (!$(this).hasClass('vshow')) {
      sol.push(sudoku[y]);
      $(this).append('<input type="text" maxlength="1" />');
    }
    else{
      $(this).text(sudoku[y]);
    }
  }
    y++;

  })
  console.log(sol);
}

}
