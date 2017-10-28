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