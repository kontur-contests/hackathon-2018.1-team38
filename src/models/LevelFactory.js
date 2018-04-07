function LevelFactory(levelName) {
	
	var truckVelocity = 10;
	
	var levels = {};
	levels["first"] = FirstLevel();
	
	return levels[levelName];


	function FirstLevel() {


		var cities = [];

		var moscow = new City("Москва", 1000, 100, 70);
		var spb = new City("Санкт-Петербург", 1000, 10, 20);

		var kazan = new City("Казань", 1000, 300, 100);
		

		cities.push(moscow);
		cities.push(spb);
		cities.push(kazan);

		var transports = [];

		var transport = new Transport("Car", 10, truckVelocity);
		//transport.currentCity = moscow;
		transport.route = [
			new Road(spb, moscow),
			new Road(moscow, kazan)
		];

		transport.position = 0;

		transports.push(transport);


		var roads = [];

		roads.push(new Road(moscow, spb));
		roads.push(new Road(moscow, kazan));


		return new Level(cities, roads, transports, 12, 10);
	}
	
}