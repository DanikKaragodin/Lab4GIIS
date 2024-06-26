(function(){

	Tetris.defaultHighScores = function() {
		var scores = []
		for (i = 10; i > 0; i--) {
			scores.push({
				name: 'BOB',
				score: i //* 10 + 9999
			})
		}

		return scores
	}

	Tetris.curHighScores = Tetris.defaultHighScores()

	Tetris.showHighScores = function(e){
		if (!$('body').hasClass('show-high-scores')){
			$('body').addClass('show-high-scores');
		}
	};

	Tetris.hideHighScores = function(e){
		$('body').removeClass('show-high-scores');
	};

	Tetris.populateHighScores = function() {
		var template = Handlebars.compile($('#hs-template').html())
		$('#hs-list').html("")
		Tetris.curHighScores.forEach(function(score) {
			$('#hs-list').append(template(score))
			//console.log(score)
		})

		/* save High score to your db. see example code below */
		// fetch(highScoresUrl)
		// 	.then(results => results.json())
		// 	.then(scores => {
		// 		Tetris.curHighScores = [];
		// 		$('#hs-list').html("");
		// 		scores.forEach(score => {
		// 			Tetris.curHighScores.push(q.score);
		// 			$('#hs-list').append(template(q))
		// 		})
		// 	})
	};

	Tetris.saveHighScore = function(e, hs){
		e.preventDefault();
		//console.log(e)
		// push highscore to your database
		Tetris.curHighScores.push({
			name: e.currentTarget[0].value,
			score: parseInt($('#points')[0].textContent,10)
		})
		Tetris.curHighScores.sort(function(a, b) {
			return b.score - a.score;
		});
		Tetris.closeHighScoreModal();
	}

	Tetris.openHighScoreModal = function(score){
		$('#points').text(score);
		$('body').addClass('modal-active');
	}

	Tetris.closeHighScoreModal = function(){
		Tetris.populateHighScores();
		$('body').removeClass('modal-active');
	}

	Tetris.minForHS = function(){
		return Tetris.curHighScores.reduce((min, cur) => cur.score < min ? cur.score : min, Tetris.curHighScores[0].score);
	}

})()
