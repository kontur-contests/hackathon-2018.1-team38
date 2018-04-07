var game = new Game();

onload = function() {
	game.setTextareaElement(document.getElementById('code-editor'));
	game.setRunButton(document.getElementById('console-button'));
	



	game.run();

}