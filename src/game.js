function Game() {
	var self = {};

	
	self.currentLevel = null;
	self.currentLevelName = '';
	self.codeEditor = null;
	self.runButton = null;

	self.canvasManager = null;
	self.levelFactory = LevelFactory;

	self.run = run;
	self.setTextareaElement = setTextareaElement;
	self.setRunButton = setRunButton;
	self.setCanvas = setCanvas;
	self.reloadLevel = reloadLevel;
	self.init = init;
	self.running = false;


	

	return self;

	
	var start = 0;

	function init(levelName) {
		

		loadLevel(levelName);

		//requestAnimationFrame(step);
	}

	function loadLevel(levelName) {
		var level = self.levelFactory(levelName);

		self.currentLevelName = levelName;
		self.currentLevel = level;

		self.canvasManager.clearLevel();
		if(self.canvasManager != null) {
			self.canvasManager.loadLevel(level);
		}
	}

	function reloadLevel() {
		if(this.currentLevel != null) {
			loadLevel(this.currentLevelName);
		}
	}

var previousTimestamp = null;
	function run() {
		if(self.currentLevel == null) {
			return;
		}

		if(self.running) {
			previousTimestamp = null;
			requestAnimationFrame(step);
		}
	}

	
	function step(timestamp) {
		if(previousTimestamp == null) {
			previousTimestamp = timestamp;
		}



		var delta = (timestamp - previousTimestamp)/1000;


		self.currentLevel.simulate(delta);
		
		if(self.canvasManager != null) {
			self.canvasManager.update();
		}


		previousTimestamp = timestamp;
		  	
		    requestAnimationFrame(step);

	}

	


	function setTextareaElement(element) {
		self.codeEditor = ace.edit(element);
	}


	// entry point for start simulation
	function setRunButton(element) {
		$(element).bind("click", function() {
			if(self.codeEditor != null && self.currentLevel != null) {
				if(!self.running) {
					$(element).html("Restart");
				}

					self.reloadLevel();
					self.running = true;
					self.run();
				

			}
		});
	}


	function setCanvas(wrapper, canvasDom, canvas, timer, goal) {
		self.canvasManager = new CanvasManager(wrapper, canvasDom, canvas, timer, goal, 700, 500);

		if(self.currentLevel != null) {
			self.canvasManager.loadLevel(self.currentLevel);
		}
	}
}