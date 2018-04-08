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
	

	game.setLessSpeed(document.getElementById('lessSpeed'));
	game.setMoreSpeed(document.getElementById('moreSpeed'));
	game.setSpeedIndicator(document.getElementById('speedIndicator'));

	
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
/* car={
    this.capacity; 		// вместимость
    this.velocity; 		// скорость
    this.packages;		// посылки на борту
    this.position;		// текущее расстояние считая от последнего города 
    this.currentCity;	// текущий город в котром находится автомобиль
}
*/

/* package={
	this.from;	// город отправления
	this.to;	// город назначения
	this.name;	// название содержимого посылки
}
*/
//car.packages[0]

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
car.on("idle", function(car) { 
    //вставьте свой код сюда
});

// Обработчик события 'посылки доставлены', возникает когда автомобиль доставил груз
car.on("reachedDestination", function(car) {
    //вставьте свой код сюда
});

// Доступные на уровне города
cities.forEach(function(city){
    /* city = {
        this.name = name; 	// название города
        this.packages = [];	// посылки в городе
    }
    */
    // true если в городе есть посылки на отправку
    // city.hasPackages()
    
    // Обработчик события 'посылки доставлены',  
	// возникает когда автомобиль достиг пункта назначения 
    city.on("newPackage", function(city) {
        //вставьте свой код сюда
    });
});
`;
