function LevelFactory(levelName) {
	
	var truckVelocity = 2;
	
	var levels = {};
	levels["first"] = FirstLevel();
	
	return levels[levelName];


	function FirstLevel() {


		var cities = [];

		var moscow = new City("Москва", 1000, 100, 70);
		var spb = new City("Санкт-Петербург", 1000, 10, 20);
		

		cities.push(moscow);
		cities.push(spb);

		var transports = [];

		transports.push(new Transport("Car", 10, truckVelocity));


		var roads = [];

		roads.push(new Road(moscow, spb));


		return new Level(cities, roads, transports, 60, 10);
	}
	
}