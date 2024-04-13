(function(){

	Tetris.Board = function(opt){

		this.ctx = opt.ctx;
		this.particles = opt.particles;
		this.game = opt.game;

		this.grid = new Array(Tetris.BOARD_HEIGHT);
		for(var row = 0; row < Tetris.BOARD_HEIGHT; row++) {
			this.grid[row] = new Array(Tetris.BOARD_WIDTH);
			for(var col = 0; col < Tetris.BOARD_WIDTH; col++) {
				this.grid[row][col] = new Tetris.Block({color: Tetris.EMPTY});
			}
		}

		this.initBorders();
		this.completedRows = [];
		this.completedColumns= [];
	};
	Tetris.Board.prototype.add = function(piece) {
		var curShape = piece.shapes[piece.current];
		var SuperCoordinates = [];
		
		//console.log(piece.type)
		for (var row = 0; row < curShape.length; row++){
			for (var col = 0; col < curShape[row].length; col++ ) {
				if (curShape[row][col]) {
					if ( (row + piece.y) < 0 ) { return false; }
					// X - ЭТО СТОЛБЕЦ, Y - СТРОКА  !РАЗРАБ ПИДАРАС!
					if (this.get(col + piece.x, row + piece.y).color == Tetris.EMPTY) {	
						this.set( col + piece.x, row + piece.y, piece.color);
						this.get( col + piece.x, row + piece.y).counter = Tetris.FLASH_DURATION;
						SuperCoordinates.push({x: col + piece.x,y: row + piece.y});
					} else {
						return false;
					}
				}
			}
		}

		var blocksToDestroy = [];
		if(piece.isSuper){
			if(piece.type == "LinePiece"){
				if(piece.current==0){
					// X - ЭТО СТОЛБЕЦ, Y - СТРОКА  !РАЗРАБ ПИДАРАС!
					// ОСМОТР ПО ГОРИЗОНТАЛИ ВЫЯВЛЕНИЕ БЛОКОВ ДЛЯ СТРОК
					for (var col = 1; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[0].y});
					}
				}
				else { 
					
					// ОСМОТР ПО ВЕРТИКАЛИ  ВЫЯВЛЕНИЕ БЛОКОВ ДЛЯ СТОЛБЦОВ
					for (var row = 0; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});
					}
				}
			}
			else if(piece.type == "SquarePiece"){
				for (var row = 0; row < Tetris.BOARD_HEIGHT - 1; row++){
					blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});
					blocksToDestroy.push({x: SuperCoordinates[1].x,y: row});
				}
				for (var col = 1; col < Tetris.BOARD_WIDTH - 1; col++){
					blocksToDestroy.push({x: col,y: SuperCoordinates[0].y});
					blocksToDestroy.push({x: col,y: SuperCoordinates[2].y});
				}
			}
			else if(piece.type == "ZPiece"){
				if(piece.current==0){
					for (var col = 1; col < SuperCoordinates[1].x + 1; col++){
							blocksToDestroy.push({x: col,y: SuperCoordinates[1].y});}
					for (var col = SuperCoordinates[2].x; col < Tetris.BOARD_WIDTH - 1; col++){
							blocksToDestroy.push({x: col,y: SuperCoordinates[2].y});}
					}
				else{
					for (var row = 0; row < SuperCoordinates[2].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[2].x,y: row});}
					for (var row = SuperCoordinates[1].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[1].x,y: row});}
				}
			}
			else if(piece.type == "SPiece"){
				if(piece.current==0){
					for (var col = SuperCoordinates[0].x; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[0].y});}
					for (var col = 1; col < SuperCoordinates[3].x+1; col++){
							blocksToDestroy.push({x: col,y: SuperCoordinates[3].y});}
					}
				else{
					for (var row = 0; row < SuperCoordinates[1].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[1].x,y: row});}
					for (var row = SuperCoordinates[2].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[2].x,y: row});}
				}
			}
			else if(piece.type == "LPiece"){
				if(piece.current==0){
					for (var row = SuperCoordinates[0].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});}
					for (var col = SuperCoordinates[0].x; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[0].y});}
				}
				else if(piece.current==1){
					for (var row = SuperCoordinates[1].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[1].x,y: row});}
					for (var col = 1; col < SuperCoordinates[0].x + 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[0].y});}
				}
				else if(piece.current==2){
					for (var row = 0; row < SuperCoordinates[0].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});}
					for (var col = 1; col < SuperCoordinates[3].x + 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[3].y});}
				}
				else if(piece.current==3){
					for (var row = 0; row < SuperCoordinates[2].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[2].x,y: row});}
					for (var col = SuperCoordinates[3].x; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[3].y});}
				}

			}
			else if(piece.type == "JPiece"){
				if(piece.current==0){
					for (var row = SuperCoordinates[2].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[2].x,y: row});}
					for (var col = 1; col < SuperCoordinates[2].x + 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[2].y});}
				}
				else if(piece.current==1){
					for (var row = 0; row < SuperCoordinates[3].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[3].x,y: row});}
					for (var col = 1; col < SuperCoordinates[2].x + 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[2].y});}
				}
				else if(piece.current==2){
					for (var row = 0; row < SuperCoordinates[0].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});}
					for (var col = SuperCoordinates[1].x; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[1].y});}
				}
				else if(piece.current==3){
					for (var row = SuperCoordinates[0].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});}
					for (var col = SuperCoordinates[1].x; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[1].y});}
				}
			}
			else if(piece.type == "TPiece"){
				if(piece.current==0){
					for (var row = SuperCoordinates[1].y; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[3].x,y: row});}
						//console.log(SuperCoordinates[3].x, row)
					for (var col = 1; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[0].y});}
				}
				else if(piece.current==1){
					for (var row = 0; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});
					}
					for (var col = 1; col < SuperCoordinates[1].x + 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[1].y});}
				}
				else if(piece.current==2){
					for (var row = 0; row < SuperCoordinates[0].y + 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});}
					for (var col = 1; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[1].y});}
				}
				else if(piece.current==3){
					for (var row = 0; row < Tetris.BOARD_HEIGHT - 1; row++){
						blocksToDestroy.push({x: SuperCoordinates[0].x,y: row});
					}
					for (var col = SuperCoordinates[2].x; col < Tetris.BOARD_WIDTH - 1; col++){
						blocksToDestroy.push({x: col,y: SuperCoordinates[2].y});}
				}
			}
		}
		if(blocksToDestroy.length){
			NotEmptyBlocks = 0
			this.particles.removeBlockEmitters();
			this.particles.add(piece);
			for(var block=0; block<blocksToDestroy.length; block++){
				if(this.get(blocksToDestroy[block].x,blocksToDestroy[block].y).color != Tetris.EMPTY) NotEmptyBlocks++;
				this.set(blocksToDestroy[block].x,blocksToDestroy[block].y,piece.color);
				this.get(blocksToDestroy[block].x,blocksToDestroy[block].y).counter = Tetris.FLASH_DURATION/4;
				this.get(blocksToDestroy[block].x,blocksToDestroy[block].y).draw(blocksToDestroy[block].x,blocksToDestroy[block].y,this.ctx);
				this.get(blocksToDestroy[block].x,blocksToDestroy[block].y).counter = Tetris.FLASH_DURATION;
				this.get(blocksToDestroy[block].x,blocksToDestroy[block].y).draw(blocksToDestroy[block].x,blocksToDestroy[block].y,this.ctx);
			}
			for(var block=0; block<blocksToDestroy.length; block++){
				this.set(blocksToDestroy[block].x,blocksToDestroy[block].y,Tetris.EMPTY);
				for (var y = blocksToDestroy[block].y; y >= 1; y--){
					this.set(blocksToDestroy[block].x,y, this.get(blocksToDestroy[block].x,y - 1).color);
				}
			}
			this.game.audio.lineDrop.play();
			if(Math.floor(NotEmptyBlocks/10)) this.game.audio.lineRemove.play();
			this.updateScore(Math.floor(NotEmptyBlocks/10))
		}
		
		return true;
	};

	Tetris.Board.prototype.update = function() {
		completedRows = []

		for (var row = 0; row < Tetris.BOARD_HEIGHT - 1; row++){
			var completeRow = true
			for (var col = 1; col < Tetris.BOARD_WIDTH - 1; col++){
				if (!this.get(col, row).color) {
					completeRow = false;
				}
			}
			if (completeRow) { completedRows.push(row) }
		}

		if (completedRows.length){
			this.animateCompletedRows(completedRows);
		}

	};

	Tetris.Board.prototype.draw = function() {
		if (!this.exploding() && this.completedRows.length) { 
			this.removeCompletedRows(); 
		}
		
		for(var y = 0; y < Tetris.BOARD_HEIGHT; y++){
			for(var x = 0; x < Tetris.BOARD_WIDTH; x++){
				this.get(x,y).draw(x,y, this.ctx);
			}
		}
	};

	Tetris.Board.prototype.removeCompletedRows = function(){
		for(i=0; i < this.completedRows.length; i++){
			this.removeRow(this.completedRows[i]); 	
		}

		this.particles.addExplosions(this.completedRows);
		this.particles.blockCount = Tetris.FLASH_DURATION * 2;
		this.game.audio.lineDrop.play(); 
		this.game.audio.lineRemove.play();
		if (this.completedRows.length == 4) { this.game.audio.tetris.play(); }		
		this.completedRows = [];
	};

	Tetris.Board.prototype.exploding = function(){
		for (var y = Tetris.BOARD_HEIGHT - 2; y >= 0; y--){
			for (var x = 1; x < Tetris.BOARD_WIDTH - 1; x++){
				if (this.get(x, y).explodeAnimation) { return true; }
			}
		}

		return false;
	};

	Tetris.Board.prototype.animateCompletedRows = function(completedRows) {
		this.particles.removeBlockEmitters();

		for(i=0; i < completedRows.length; i++){
			y = completedRows[i];

			for(x=0; x < Tetris.BOARD_WIDTH - 1; x++){
				this.get(x, y).explodeAnimation = true;
				this.get(x, y).counter = Tetris.FLASH_DURATION;
			}	
		}

		this.completedRows = this.completedRows.concat(completedRows);
		this.updateScore(completedRows.length);
	};

	Tetris.Board.prototype.updateScore = function(n){
		switch(n){
			case 1:
				this.game.score += 1;
				break;
			case 2:
				this.game.score += 3;
				break;
			case 3:
				this.game.score += 5;
				break;
			case 4:
				this.game.score += 8;
				break;
		}

		this.game.updateLevel(n);
	};


	Tetris.Board.prototype.removeRow = function(row) {
		for (var y = row; y >= 1; y--){
			for (var x = 1; x < Tetris.BOARD_WIDTH - 1; x++){
				this.set(x,y, this.get(x,y - 1).color);
			}
		}
	};

	Tetris.Board.prototype.initBorders = function(){
		for(var x = 0; x < Tetris.BOARD_WIDTH; x++ ){
			this.set(x, Tetris.BOARD_HEIGHT - 1, Tetris.BORDER_BLOCK);
		}

		for(var y = 0; y < Tetris.BOARD_HEIGHT; y++ ){
			this.set(0, y, Tetris.BORDER_BLOCK);
			this.set(Tetris.BOARD_WIDTH - 1, y, Tetris.BORDER_BLOCK);
		}
	};
	Tetris.Board.prototype.initBoard = function(){
		for(var row = 0; row < Tetris.BOARD_HEIGHT; row++) {
			for(var col = 0; col < Tetris.BOARD_WIDTH; col++) {
				this.grid[row][col].color = Tetris.EMPTY;
			}
		}

		this.initBorders();
	};

	Tetris.Board.prototype.clear = function(x,y){
		this.grid[y][x].color = Tetris.EMPTY;
	}

	Tetris.Board.prototype.get = function(x,y) {
		return this.grid[y][x];
	};

	Tetris.Board.prototype.set = function(x,y,c) {
		this.grid[y][x].color = c;
	};

})();