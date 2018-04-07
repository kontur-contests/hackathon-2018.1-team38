function Game() {
	var self = {};

	self.levels = [];
	self.run = run;
	self.setTextareaElement = setTextareaElement;
	self.setRunButton = setRunButton;
	self.codeEditor = null;
	self.runButton = null;

	return self;
	

	function run() {
		console.log("run");
	}


	function setTextareaElement(element) {
		self.codeEditor = ace.edit(element);
	}


	// entry point for start simulation
	function setRunButton(element) {
		$(element).bind("click", function() {
			if(self.codeEditor != null) {


				var someVar = "Text";

				eval(self.codeEditor.getValue());
			}

		});
	}
}