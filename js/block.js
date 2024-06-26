(function(){

	Tetris.Block = function(opt) {
		this.color = opt.color;
    this.state = 0;
    this.counter = 0;
    this.explodeAnimation = false;
    this.shadow = opt.shadow || false;
    this.SuperOrientation =  opt.SuperOrientation || false;
	};

	Tetris.Block.prototype.draw = function(x, y, ctx) {
		var px = x * Tetris.TILESIZE;
		var py = y * Tetris.TILESIZE;
    this.updateState();
    if (!this.shadow){
		  this.getSprite().draw(ctx, px, py);
    } else {
      this.getSprite().drawTransparent(ctx, px, py);
    }
	};

  Tetris.Block.prototype.updateState = function(){
      if ( this.counter > 0) { this.counter--; }
      else { this.explodeAnimation = false; }
      
      this.state = Math.floor(this.counter/(Tetris.FLASH_DURATION/4));
      
      if (this.explodeAnimation) {
          this.state = Math.abs(this.state - 3);
      }
  };

	Tetris.Block.prototype.getSprite = function(){
    	switch(this.color) {
        case 0:
          return Tetris.bgBlock;
        case 1:
        	return Tetris.LBlocks[this.state];
        case 2:
        	return Tetris.JBlocks[this.state];
        case 3:
        	return Tetris.LineBlocks[this.state];
        case 4:
        	return Tetris.SBlocks[this.state];
        case 5:
        	return Tetris.ZBlocks[this.state];
        case 6:
        	return Tetris.SquareBlocks[this.state];
        case 7:
        	return Tetris.TBlocks[this.state];
        case 8:
          return Tetris.SuperBlocks[this.state];
        case 9:
          return Tetris.borderBlock;
        default:
          return Tetris.bgBlock;
    	}
	};

})();