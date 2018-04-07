var game = new Game();

onload = function() {
	
	var logicScript = window.localStorage["logic"] || defaultCode;
	var editor = ace.edit(document.getElementById('code-editor'));
	editor.setValue(logicScript);

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
	game.setWinnerModal(document.getElementById('winnerModal'));


	var currentLevel = window.localStorage.levelName || "Москва - Питер";
	// load level from cache
	game.init(currentLevel);

	$('#reset-level').bind('click', function() {
		window.localStorage.removeItem('levelName');

		game.init('invalid');
	});


	$(window).on("beforeunload", function() { 

		var editor = ace.edit(document.getElementById('code-editor'));

		window.localStorage.setItem("logic", editor.getValue());
	});
}



var defaultCode = `
// Автомобиль для перевозки посылок
// car

// Загрузка посылок которые нужно доставить в город 'city', 
// если параметр не указан будут загружаться все возможные посылки
// car.load(city);  

// Выгрузка всех посылок предназначенных для текущего города
// car.unload();

// true если автомобиль находится в движении
// car.isMoving();

// Отправить автомобиль в город 'city', без заезда в другие города
// car.goTo(city);  

// Обработчик события 'простой', возникает когда автомобиль свободен и 
// не знает что ему дальше делать
car.on("idle", function() { 
    //вставьте свой код сюда
});

// Обработчик события 'посылки доставлены', возникает когда автомобиль доставил груз
car.on("reachedDestination", function() {
    //вставьте свой код сюда
});

// Доступные на уровне города
cities.forEach(function(city){
    
    // true если в городе есть посылки на отправку
    // city.hasPackages()
    
    // Обработчик события 'в городе появилась новая посылка'
    city.on("newPackage", function() {
        //вставьте свой код сюда
    });
});
`;
