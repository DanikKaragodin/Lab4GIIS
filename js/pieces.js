(function(){

	Tetris.LinePiece = function(ctx, board,isSuperPiece=false){
		this.type = "LinePiece";
		this.shapes = [
	    [[0,0,0,0],
	     [0,0,0,0],
	     [1,1,1,1]],
	    [[0,1,0],
	     [0,1,0],
	     [0,1,0],
	     [0,1,0]] 
		];

		this.offsetx = 13.5;
		this.offsety = 10.5;

		var opt = { 
			x: 4, 
			y: -2,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.LINE,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.SquarePiece = function(ctx, board,isSuperPiece=false){
		this.type = "SquarePiece";
		this.shapes = [
			[[1,1],
			 [1,1]]
		];

		this.offsetx = 14.5;
		this.offsety = 12;

		var opt = { 
			x: 5, 
			y: 0,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.SQUARE,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.ZPiece = function(ctx, board,isSuperPiece=false){
		this.type = "ZPiece";
		this.shapes = [
      [[1,1,0],
       [0,1,1]],
      [[0,1],
       [1,1],
       [1,0]]
		];

		this.offsetx = 14;
		this.offsety = 12;	

		var opt = { 
			x: 4, 
			y: 0,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.Z,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.SPiece = function(ctx, board,isSuperPiece=false){
		this.type = "SPiece";
		this.shapes = [
		[[0,1,1],
	     [1,1,0]],
	    [[1,0],
	     [1,1],
	     [0,1]]
		];

		this.offsetx = 14;
		this.offsety = 12;

		var opt = { 
			x: 4, 
			y: 0,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.S,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.LPiece = function(ctx, board,isSuperPiece=false){
		this.type = "LPiece";
		this.shapes = [
      [[0,0,0],
       [1,1,1],
       [1,0,0]],
      [[1,1,0],
       [0,1,0],
       [0,1,0]],
      [[0,0,1],
       [1,1,1],
       [0,0,0]],
      [[0,1,0],
       [0,1,0],
       [0,1,1]]
		];

		this.offsetx = 14;
		this.offsety = 11;

		var opt = { 
			x: 4, 
			y: -1,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.L,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.JPiece = function(ctx, board,isSuperPiece=false){
		this.type = "JPiece";
		this.shapes = [
      [[0,0,0],
       [1,1,1],
       [0,0,1]],
      [[0,1,0],
       [0,1,0],
       [1,1,0]],
      [[1,0,0],
       [1,1,1],
       [0,0,0]],
      [[0,1,1],
       [0,1,0],
       [0,1,0]]
		];

		this.offsetx = 14;
		this.offsety = 11;

		var opt = { 
			x: 4, 
			y: -1,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.J,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.TPiece = function(ctx, board,isSuperPiece=false){
		this.type = "TPiece";
		this.shapes = [
      [[0,0,0],
       [1,1,1],
       [0,1,0]],
      [[0,1,0],
       [1,1,0],
       [0,1,0]],
      [[0,1,0],
       [1,1,1],
       [0,0,0]],
      [[0,1,0],
       [0,1,1],
       [0,1,0]]		
		];

		this.offsetx = 14;
		this.offsety = 11;

		var opt = { 
			x: 4, 
			y: -1,
			ctx: ctx,
			board: board,
			color: isSuperPiece ?  Tetris.BLOCKCOLORS.SUPER : Tetris.BLOCKCOLORS.T,
			isSuper: isSuperPiece
		};
		Tetris.Piece.call(this, opt);
	}

	Tetris.util.inherits(Tetris.LinePiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.SquarePiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.ZPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.SPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.LPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.JPiece, Tetris.Piece);
	Tetris.util.inherits(Tetris.TPiece, Tetris.Piece);

})();