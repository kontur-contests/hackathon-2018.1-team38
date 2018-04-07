function Game() {
	var self = {};


	self.levels = ['Москва - Питер', 'Новый свет'];

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
	self.setSuccessModal = setSuccessModal;
	self.setWinnerModal = setWinnerModal;
	self.setLevelName = setLevelName;
	self.reloadLevel = reloadLevel;
	self.init = init;
	self.running = false;
	self.successModal = null;
	self.winnerModal = null;
	self.levelNameLabel = null;



	return self;

	var start = 0;

	function init(levelName) {
		

		loadLevel(levelName);

		//requestAnimationFrame(step);
	}



	function setLevelName(element) {
		self.levelNameLabel = element;
	}

	function loadLevel(levelName) {
		var level = self.levelFactory(levelName);

		if(level == null) {
			level = self.levelFactory(self.levels[0]);
			levelName = self.levels[0];
		}

		self.currentLevelName = levelName;
		self.currentLevel = level;

		self.canvasManager.clearLevel();
		if(self.canvasManager != null) {
			self.canvasManager.loadLevel(level);
		}

		if(self.levelNameLabel != null) {
			window.localStorage.levelName = levelName;
			self.levelNameLabel.innerHTML = levelName;
		}
	}

	function reloadLevel() {
		if(this.currentLevel != null) {
			loadLevel(this.currentLevelName);
		}
	}

	var previousTimestamp = null;
	function run() {
		if (self.currentLevel == null) {
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


		var status = self.currentLevel.simulate(delta);



		self.canvasManager.displayStatus(status);

		if(self.canvasManager != null) {
			self.canvasManager.update();
		}


		previousTimestamp = timestamp;
		  	
	  	if(status == 'running') {
		    requestAnimationFrame(step);
		} else if(status == 'win') {
			handleWin();
		}
	}


	function handleWin() {
		var nextLevelIndex = self.levels.indexOf(self.currentLevelName);

		if(self.successModal != null && nextLevelIndex + 1 < self.levels.length) {
			self.successModal.modal('show');
		} 


		if(nextLevelIndex + 1== self.levels.length && self.winnerModal != null) {
			self.winnerModal.modal('show');
		}
	}


	function loadNextLevel() {
		var nextLevelIndex = self.levels.indexOf(self.currentLevelName);

		if(nextLevelIndex + 1 >= self.levels.length) {


			return;
		}

		self.running = false;
		previousTimestamp = null;
		loadLevel(self.levels[nextLevelIndex + 1]);
	}

	function setTextareaElement(element) {
		self.codeEditor = ace.edit(element);
	}


	// entry point for start simulation
	function setRunButton(element) {

		$(element).bind("click", function() {
			if(self.codeEditor != null && self.currentLevel != null) {


					self.reloadLevel();
					self.currentLevel.init(self.codeEditor.getValue());
					self.running = true;
					self.run();


			}
		});
	}

	
	function setSuccessModal(modal) {
		self.successModal = $(modal);

		self.successModal.find("#nextLevel").bind("click", function() {
			self.successModal.modal('hide');
			loadNextLevel();
		});
	}

	function setWinnerModal(modal) {
		self.winnerModal = $(modal);


	}


	function getRouteToCity(city) {
		//TODO: тут будет поиcк по графу пока просто заглушка
		return [self.currentLevel.roads[0], self.currentLevel.roads[1]];
  }


	function setCanvas(wrapper, canvasDom, canvas, timer, goal, status, info, runButton) {
		self.canvasManager = new CanvasManager(wrapper, canvasDom, canvas, timer, goal, status, info, runButton, 700, 500);

		if(self.currentLevel != null) {
			self.canvasManager.loadLevel(self.currentLevel);
		}
	}
}