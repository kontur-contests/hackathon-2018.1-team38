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


		var map = {};
		map[moscow.name] = addEdge(moscow, [spb]);
		map[spb.name] = addEdge(spb, [moscow]);

		var graph = new Graph(map);

		return new Level(cities, roads, transports, 60, 10, graph);
	}

	function addEdge(mainCity, cities){
		var fromMainCity = {};
		for (var i = 0; i < cities.length; i++){
			fromMainCity[cities[i].name] = distanceBetween(mainCity, cities[i]);
		}
		return fromMainCity;
	}

	function distanceBetween(city1, city2){
		return Math.sqrt(Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2));
	}
}