var Board = (function() {
  var ctx;
  var tileSize = 50;
  var tilePadding = 10;

  function Board() {
    var canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  Board.prototype.drawTile = function(tile) {
    var tileX = tile.x*(tileSize+tilePadding)+tilePadding;
    var tileY = tile.y*(tileSize+tilePadding)+tilePadding;

    if(!tile.isEmpty()) {
      ctx.fillStyle = "#b7945f";
      ctx.fillRect(tileX, tileY, tileSize, tileSize)

      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(tile.value, tileX+(tileSize/2)-6, tileY+(tileSize/2)+7.5);
    } else {
      ctx.fillStyle = "grey";
      ctx.fillRect(tileX, tileY, tileSize, tileSize)
    }
  }

  return Board;
})();
var Game = (function() {
  function Game() {
    this.board = new Board();
    this.tileArray = generateTileArray();
    this.gameOver = false;
  }

  function generateTileArray() {
    var array = [[], [], [], []];
    var tileCount = 2;

    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        var tile = new Tile(j, i);

        var rand = Math.floor(Math.random()*(100));

        if(rand > 50 && tileCount) {
          tile.setValue(2);
          tileCount--;
        }

        array[i].push(tile);
      }
    }

    return array
  }

  function moveEmptyTiles(dir, array, index) {
    var i = index || 0;
    var arr = array.slice(0, array.length);

    switch(dir) {
      case "left":
      if(i < arr.length) {
        if(arr[i].isEmpty()) {
          var emptyTile = arr.splice(i, 1)[0];

          arr.push(emptyTile);

          moveEmptyTiles(dir, arr, i+1);
        } else {
          moveEmptyTiles(dir, arr, i+1);
        }
      }
      return arr;
      case "right":
      if(i > -1) {
        if(array[i].isEmpty()) {
          var emptyTile = array.splice(i, 1)[0];

          array.unshift(emptyTile);

          moveEmptyTiles(dir, array, i-1);
        } else {
          moveEmptyTiles(dir, array, i-1);
        }
      }
      return array;
    }

  }

  Game.prototype.start = function() {
    this.drawGameBoard();
  };

  Game.prototype.drawGameBoard = function() {
    for(var i = 0; i < this.tileArray.length; i++) {
      for(var j = 0; j < this.tileArray[i].length; j++) {
        this.board.drawTile(this.tileArray[i][j]);
      }
    }
  };

  Game.prototype.doubleTiles = function(dir, array, index) {
    var i = index || 0;
    var arr = moveEmptyTiles(dir, array.slice(0, array.length), i);
    console.log("%o, %s", arr, i)
    switch(dir) {
      case "left":
      if(i < arr.length-1) {
        if(arr[i].isEqualTo(arr[i+1])) {
          console.log('doubling')
          arr[i].doubleValue();
          arr[i+1].setToZero();
          console.log(arr[i])
          this.doubleTiles(dir, arr, i+1);
        } else {
          this.doubleTiles(dir, arr, i+1);
        }

      }
      return arr;
      case "right":
      if(i > 1) {
        if(arr[i-1].isEqualTo(arr[i])) {
          arr[i].doubleValue();
          arr[i-1].setToZero();

          this.doubleTiles(dir, arr, i-1);
        } else {
          this.doubleTiles(dir, arr, i-1);
        }

      }
      return arr;
    }
  };

  Game.prototype.moveLeft = function () {
    console.log("left")

      // for(var i = 0; i < this.tileArray.length; i++) {
        // this.tileArray[i] = this.shiftTilesLeft(this.tileArray[i]);
      // }
      // this.shiftTilesLeft(this.tileArray[0])
      var tile1 = new Tile(0,2);
      var tile2 = new Tile(0,3);
      tile1.setValue(2);
      tile2.setValue(2);

      var testArr = [new Tile(0,0), new Tile(0,1), tile1, tile2];

      this.shiftTilesLeft(testArr)

    };

    Game.prototype.shiftTilesLeft = function(arr) {
      var array = arr.slice(0, arr.length)
      var doubledArr = this.doubleTiles("left", array)
      console.log('doubledArr')
      // console.log(doubledArr)

    }

    Game.prototype.shiftTilesRight = function(arr) {
      var doubledArr = this.doubleTiles("right", arr, arr.length-1)
      console.log('doubledArr')
      console.log(doubledArr)
    }


    Game.prototype.moveRight = function() {
      console.log("right")

      this.shiftTilesRight([new Tile(0,0), new Tile(0,1), new Tile(0,2), new Tile(0,3)])
    };

    Game.prototype.moveUp = function() {
      console.log("up")
    };

    Game.prototype.moveDown = function() {
      console.log("down")
    };

    return Game
  })();
var Tile = (function() {
  function Tile(x, y) {
    this.value = 0;
    this.x = x;
    this.y = y;
  }

  Tile.prototype.setToZero = function() {
    this.value = 0;
  };

  Tile.prototype.setValue = function(value) {
    this.value = value;
  }

  Tile.prototype.doubleValue = function() {
    this.value = this.value*2;
  };

  Tile.prototype.isEmpty = function() {
    if(this.value === 0) {
      return true;
    }

    return false;
  }

  Tile.prototype.isEqualTo = function(tile) {
    if(this.value === tile.value) {
      return true;
    }

    return false;
  }

  return Tile;
})();