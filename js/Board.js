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