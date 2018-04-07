function Game() {
	var self = {};


	self.currentLevel = null;
	self.codeEditor = null;
	self.runButton = null;

	self.levelFactory = LevelFactory;

	self.run = run;
	self.setTextareaElement = setTextareaElement;
	self.setRunButton = setRunButton;
	self.init = init;




	return self;

	var start = 0;

	function init(levelName) {
		var level = self.levelFactory(levelName);

		self.currentLevel = level;

		//requestAnimationFrame(step);
	}

	function loadLevel(level) {

	}

	function run() {
		if (self.currentLevel == null) {
			return;
		}

		requestAnimationFrame(step);
	}

	function step(timestamp) {




		var progress = timestamp;

		self.currentLevel.simulate();

		console.log(timestamp);
		requestAnimationFrame(step);

	}




	function setTextareaElement(element) {
		self.codeEditor = ace.edit(element);
	}


	// entry point for start simulation
	function setRunButton(element) {
		$(element).bind("click", function () {
			if (self.codeEditor != null && self.currentLevel != null) {

				self.currentLevel.init(self.codeEditor.getValue());
				self.run();
			}
		});
	}

	function goTo(city) {
		var car = self.currentLevel.transports[0];
		car.route = getRouteToCity(city);
		currentCity = null;
	}

	function getRouteToCity(city) {
		//TODO: тут будет поиcк по графу пока просто заглушка
		return [self.currentLevel.roads[0], self.currentLevel.roads[1]];
	}
}