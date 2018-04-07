function Game() {
	var self = {};

	
	self.currentLevel = null;
	self.codeEditor = null;
	self.runButton = null;

	self.canvasManager = null;
	self.levelFactory = LevelFactory;

	self.run = run;
	self.setTextareaElement = setTextareaElement;
	self.setRunButton = setRunButton;
	self.setCanvas = setCanvas;
	self.init = init;


	

	return self;

	
	var start = 0;

	function init(levelName) {
		var level = self.levelFactory(levelName);

		loadLevel(level);

		//requestAnimationFrame(step);
	}

	function loadLevel(level) {
		self.currentLevel = level;

		if(self.canvasManager != null) {
			self.canvasManager.loadLevel(level);
		}
	}

	function run() {
		if(self.currentLevel == null) {
			return;
		}

		requestAnimationFrame(step);
	}

	function step(timestamp) {




		var progress = timestamp ;


		self.currentLevel.simulate();
		
		if(self.canvasManager != null) {
			self.canvasManager.update();
		}
		  	console.log(timestamp);
		    requestAnimationFrame(step);

	}

	


	function setTextareaElement(element) {
		self.codeEditor = ace.edit(element);
	}


	// entry point for start simulation
	function setRunButton(element) {
		$(element).bind("click", function() {
			if(self.codeEditor != null && self.currentLevel != null) {

				self.currentLevel.init(self.codeEditor.getValue());
				self.run();
			}
		});
	}


	function setCanvas(element) {
		self.canvasManager = new CanvasManager(element, 400, 700);

		if(self.currentLevel != null) {
			self.canvasManager.loadLevel(self.currentLevel);
		}
	}
}