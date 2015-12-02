window.HockeyBingo = window.HockeyBingo || {}


var sizeBoard = HockeyBingo.sizeBoard = function(){
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
};

var syncSquares = HockeyBingo.syncSquares = function(gameState){
  var squares = $(".cell").not(".free");

  gameState.contents.forEach(function(el, idx){
    $(squares[idx]).html(el);
  });
  gameState.marked.forEach(function(el){
    $(squares[el]).addClass("marked");
  });

  squares.hover(
    function(){$(this).addClass("hovered");},
    function(){$(this).removeClass("hovered");}
  );

  squares.click(
    function(){toggleMark(this, squares, gameState);}
  );
};

var checkBingo = HockeyBingo.checkBingo = function(squares){
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
};

var endGame = HockeyBingo.endGame = function(){
  $(".win-modal").css("visibility", "visible");
};

var closeModal = HockeyBingo.closeModal = function(){
  $(".win-modal").css("visibility", "hidden");
};

var play = HockeyBingo.play = function(){
  sizeBoard();
  $(window).resize(sizeBoard);
  $(".win-x").click(closeModal);

  syncGameState(function(gameState){
    syncSquares(gameState);
    setGameState(gameState);
  });
};

var toggleMark = HockeyBingo.toggleMark = function(square, squares, gameState){
  if(!$(square).hasClass("marked")){
    $(square).addClass("marked");
    gameState.marked.push(squares.index(square))
    checkBingo(squares);
  }else{
    $(square).removeClass("marked");
    $(square).removeClass("hovered");
    gameState.marked.splice(gameState.marked.indexOf(squares.index(square)), 1);
  }
  setGameState(gameState);
};

var randInt = HockeyBingo.randInt = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min
};

var isExpired = HockeyBingo.isExpired = function(gameState){
  return Date.now() - gameState.timestamp > 43200000
  // Keep this line in for testing:
  // return Date.now() - gameState.timestamp > 432
};

var richDShuffle = HockeyBingo.richDShuffle = function(arr){
  for(i = 0; i <= arr.length - 2; i++){
    var j = randInt(i, arr.length)

    var dummy = arr[i]
    arr[i] = arr[j]
    arr[j] = dummy
  }

  return arr
};

var syncGameState = HockeyBingo.syncGameState = function(callback){
  try{
    gameState = getGameState();
    if(!isExpired(gameState)){
      callback(gameState);
    }else{
      resetGameState(callback);
    }
  }catch(e){
    resetGameState(callback);
  }
};

var resetGameState = HockeyBingo.resetGameState = function(callback){
  $.getJSON("squares2015-16.json").done(function(json){
    debugger
    gameState = {contents: richDShuffle(json).slice(0, 24),
                        marked: [],
                        timestamp: Date.now()};
    callback(gameState);
  });
};

var getGameState = HockeyBingo.getGameState = function(){
  return JSON.parse(localStorage.gameState);
};

var setGameState = HockeyBingo.setGameState = function(gameState){
  gameState.timestamp = Date.now();
  localStorage.gameState = JSON.stringify(gameState);
};

var bingoSets = HockeyBingo.bingoSets = function(){
  return [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13],
    [14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23],
    [0, 5, 10, 14, 19],
    [1, 6, 11, 15, 20],
    [2, 7, 16, 21],
    [3, 8, 12, 17, 22],
    [4, 9, 13, 18, 23],
    [0, 6, 17, 23],
    [4, 8, 15, 19]
  ]
};
