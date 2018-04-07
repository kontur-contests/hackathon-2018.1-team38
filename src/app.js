var game = new Game();


var city = new City();

onload = function() {
	game.setTextareaElement(document.getElementById('code-editor'));
	game.setRunButton(document.getElementById('console-button'));
	



	// load level from cache
	game.init("first");

}