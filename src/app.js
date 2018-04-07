var game = new Game();


var city = new City();

onload = function() {
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
	


	game.setSuccessModal(document.getElementById('successModal'));



	//var currentLevel = window.localStorage.levelName || "Москва - Питер";
	// load level from cache
	game.init('invalid');

}