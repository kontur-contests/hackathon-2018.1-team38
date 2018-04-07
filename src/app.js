var game = new Game();

onload = function() {
	game.setTextareaElement(document.getElementById('console-textarea'));
	game.setRunButton(document.getElementById('console-button'));
	



	game.run();

}