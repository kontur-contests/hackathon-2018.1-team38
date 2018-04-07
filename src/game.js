function Game() {
	var self = {};

	self.levels = [];
	self.run = run;
	self.setTextareaElement = setTextareaElement;
	self.setRunButton = setRunButton;
	self.textareaElement = null;
	self.runButton = null;

	return self;
	

	function run() {
		console.log("run");
	}


	function setTextareaElement(element) {
		self.textareaElement = $(element);
	}


	// entry point for start simulation
	function setRunButton(element) {
		$(element).bind("click", function() {
			if(self.textareaElement != null) {


				var someVar = "Text";

				eval(self.textareaElement.val());
			}

		});
	}
}