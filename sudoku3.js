var input = [];//to store user input values
var solution = []; // to store the solution or correct sudoku
var index, status = 0;
start();
// function start is the entry point
function start(){
	solution.length = 0;
	generateSudoku();

	$("#New").click(function(){
		location.href = "sudoku3.html"
	});

  $("#check").click(function(){
    input.length = 0;
    index = 0;
    checkSudoku();
  });

  $("#Submit").click(function(){
    status = 1;
    checkSudoku();
  });
  
}
// function generateSudoku to generate a random sudoku
function generateSudoku() {
	var grid = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9], 
		[4, 5, 6, 7, 8, 9, 1, 2, 3], 
		[7, 8, 9, 1, 2, 3, 4, 5, 6], 
		[2, 3, 4, 5, 6, 7, 8, 9, 1], 
		[5, 6, 7, 8, 9, 1, 2, 3, 4], 
		[8, 9, 1, 2, 3, 4, 5, 6, 7], 
		[3, 4, 5, 6, 7, 8, 9, 1, 2], 
		[6, 7, 8, 9, 1, 2, 3, 4, 5], 
		[9, 1, 2, 3, 4, 5, 6, 7, 8]
		];
	shuffle(grid);
	//swap one number with another
	function shuffle(grid) {
		var i, j, k, num1, num2;
		for(i = 0; i < 9; i++) {
			num1 = Math.floor(Math.random()*9 + 1);
			num2 = Math.floor(Math.random()*9 + 1);
			while(num1 == num2) num2 = Math.floor(Math.random()*9 + 1);
			for(j = 0; j < grid.length; j++) {
				for(k = 0; k < grid[j].length; k++) {
					if(grid[j][k] == num1)
						grid[j][k] = num2;
					else if(grid[j][k] == num2)
						grid[j][k] = num1;
				}
			}
		}
	 console.log(grid);
	}

	var newArr = [];
	// converting 2D array into 1D array
	for(var i = 0; i < grid.length; i++){
	  newArr = newArr.concat(grid[i]);
	}
	showSudoku(newArr);
}
// function showSudoku to display the numbers on sudoku board
function showSudoku(newArr){
  var x = newArr.length;
  var y = 0;
  $("table td").each(function(){
    if(y < x){
    if (!$(this).hasClass('vshow')) {
      solution.push(newArr[y]);
      $(this).append('<input type="text" maxlength="1" />');
    }
    else{
      $(this).text(newArr[y]);
    }
  }
    y++;

  })
   console.log(solution);
}
// function checkSudoku to match user input with actual solution
function checkSudoku(){
  $("table tr").each(function() {
    var inputData = $(this).find('td').not('.vshow');
    if (inputData.length > 0) {
      inputData.each(function() { 
        var val = Number($(this).find('input').val());
        input.push(val);
        if(input[index] != solution[index]){
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
     compare(input, solution);
  }
  else{
    input.length = 0;
    idex = 0;
  }
}
// function compare to check the validity of user input and print the result
function compare(input, solution){
  var flag = true;
  var i;
  for(i=0;i<solution.length;i++)
  {
    if(input[i] == solution[i]){
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
    $("#winmsg").text("Congratulations!!! You Won");
    $("#lostmsg").text("");
    
  }
  else{
    input.length = 0;
    index = 0;
    status = 0;
    console.log(input);
    $("#press").click();
    $("#lostmsg").text("You lost!!! Better Luck Next-Time");
    $("#winmsg").text("");
  }
}

