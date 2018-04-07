function LevelFactory(levelName) {
	
	var truckVelocity = 30;
	
	var levels = {};
	levels["first"] = FirstLevel();
	
	return levels[levelName];


	function FirstLevel() {


		var cities = [];

		var moscow = new City("Москва", 1000, 100, 70, 0.7);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.2);

		//var kazan = new City("Казань", 1000, 300, 100, 0.6);

		cities.push(moscow);
		cities.push(spb);
		//cities.push(kazan);

		var transports = [];

	


		var roads = [];
		roads.push(new Road(moscow, spb));
		//roads.push(new Road(moscow, kazan));

		var map = {};
		map[moscow.name] = addEdge(moscow, [spb]);
		map[spb.name] = addEdge(spb, [moscow]);
	//	map[kazan.name] = addEdge(kazan, [moscow]);


		var graph = new Graph(map, cities);

		var level = new Level(cities, roads, transports, 1000, 100, graph);
		
		var transport = new Transport("Car", 10, truckVelocity, graph, level);
		transport.currentCity = spb;
	
		transport.position = 0;

		transports.push(transport);

		return level;
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