var sol = [1,3,7,9,4,5,
  4,2,3,6,1,
  9,6,7,1,5,3,2,8,
  2,4,6,1,8,9,
  9,1,5,8,3,2,7,
  4,5,7,9,2,6,
  8,3,6,9,4,1,5,7,
  2,1,5,7,4,
  7,4,5,1,8,2];
var index = 0;
var input = [];
var status = 0;

function getvalue(){ 
  $('table td').click(function(){
    $('table td').each(function(){
      if (!$(this).hasClass('vshow')) {
        var extract = Number($(this).attr('data-value'));
        if (extract == 0 || isNaN(extract)) {
          extract = '';
        }
        $(this).append('<input type="text" maxlength="1" data-value="' + extract + '"/>'); 
      }
    });
    $('table td').off('click');                        
  })
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
    $("#press").click();
    $("#wmessage").text("Congratulations!!! You Won");
    status = 0;
    alert("you win");
  }
  else{
    input.length = 0;
    index = 0;
    status = 0;
    console.log(input);
    $("#press").click();
    $("#lmessage").text("You lost!!! Better Luck Next-Time");
    // alert("you loose");
  }
}

function start(){ 
  $('table td').each(function(){
    if (!$(this).hasClass('vshow')) {
      $(this).append('<input type="text" maxlength="1" />');
      $(this).css("color", "blue");
    }
  })
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
start();

