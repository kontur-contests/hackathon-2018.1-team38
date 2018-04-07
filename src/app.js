var game = new Game();


var city = new City();

onload = function() {
	

	var logicScript = window.localStorage["logic"] || '';
	var editor = ace.edit(document.getElementById('code-editor'));
	editor.setValue(logicScript);

	game.setTextareaElement(document.getElementById('code-editor'));
	game.setRunButton(document.getElementById('console-button'));

	game.setLevelName(document.getElementById('levelName'));

	game.setCanvas(document.getElementById('canvas-wrapper'),
		document.getElementById('canvas-dom'),
		document.getElementById('canvas'),
		document.getElementById('timer'),
		document.getElementById('goal'),
		document.getElementById('status'),
		document.getElementById('canvas-info'),
		document.getElementById('console-button')
		);
	

	game.setLessSpeed(document.getElementById('lessSpeed'));
	game.setMoreSpeed(document.getElementById('moreSpeed'));
	game.setSpeedIndicator(document.getElementById('speedIndicator'));

	
	game.setSuccessModal(document.getElementById('successModal'));
	game.setWinnerModal(document.getElementById('winnerModal'));


	var currentLevel = window.localStorage.levelName || "Москва - Питер";
	// load level from cache
	game.init(currentLevel);

	$('#reset-level').bind('click', function() {
		window.localStorage.removeItem('levelName');

		game.init('invalid');
	});


	$(window).on("beforeunload", function() { 

		var editor = ace.edit(document.getElementById('code-editor'));

		window.localStorage.setItem("logic", editor.getValue());
	});
}