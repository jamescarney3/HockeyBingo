var sizeBoard = function(){
  var w = $(window).width();
  var width = (w <= 700 ? w : 700);

  $(".board").css({
    "width" : width,
    "height" : width
  });

  $(".row").css({
    "width" : width,
    "height" : width / 5.0
  });

  $(".cell").css({
    "width" : (width / 5.0) - 18,
    "height" : (width / 5.0) - 18,
    "padding" : "5px"
  });

}

var syncSquares = function(squares){

  $.getJSON("squares2015-16.json").done(function(json){
    var contents = richDShuffle(json)

    squares.each(function(idx){
      if(idx != 12){
        $(squares[idx]).html(contents.pop());
      };
    });
  });
}

var checkBingo = function(squares){
  var bSets = bingoSets();
  var bingo = false;

  for(i = 0; i < bSets.length; i++){
    var checkSet = bSets[i]

    for(j = 0; j < checkSet.length; j++){
      var sqIdx = checkSet[j]
      bingo = true

      if(!$(squares[sqIdx]).hasClass("marked")){
        bingo = false
        break
      };
    };

    if(bingo){
      break
    };
  };

  if(bingo){
    endGame();
  };

}

var endGame = function(){
  $(".win-modal").css("visibility", "visible");
}

var closeModal = function(){
  $(".win-modal").css("visibility", "hidden");
}

var hockeyBingo = function(){
  var squares = $(".cell");

  sizeBoard();
  syncSquares(squares);

  $(window).resize(sizeBoard);

  squares.not(".free").hover(
    function(){
      $(this).addClass("hovered");
    },
    function(){
      $(this).removeClass("hovered");
    }
  )

  squares.not(".free").click(
    function(){
      if($(this).hasClass("marked")){
        $(this).removeClass("marked");
        $(this).removeClass("hovered");
      }else{
        $(this).addClass("marked");
        checkBingo(squares);
      }
    }
  );

  $(".win-x").click(closeModal);
}

var randInt = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min
}

var richDShuffle = function(arr){
  for(i = 0; i <= arr.length - 2; i++){
    var j = randInt(i, arr.length)

    var dummy = arr[i]
    arr[i] = arr[j]
    arr[j] = dummy
  }

  return arr
}

var bingoSets = function(){
  return [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 18, 24],
    [4, 8, 16, 20]
  ]
}
