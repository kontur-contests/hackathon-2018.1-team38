function LevelFactory(levelName) {
	


	var truckVelocity = 40;
	
	var levels = {};
	levels["Москва - Питер"] = FirstLevel();
	levels["Новый свет"] = SecondLevel();


	if(!levels.hasOwnProperty(levelName)) {
		return null;
	}

	return levels[levelName];


function FirstLevel() {


		var cities = [];

		var moscow = new City("Москва", 1000, 100, 70, 0.7);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.2);


		cities.push(moscow);
		cities.push(spb);

		var transports = [];

	


		var roads = [];
		roads.push(new Road(moscow, spb));

		var map = {};
		map[moscow.name] = addEdge(moscow, [spb]);
		map[spb.name] = addEdge(spb, [moscow]);


		var graph = new Graph(map, cities);

		var level = new Level(cities, roads, transports, 10, 2, graph);
		
		var transport = new Transport("Car", 10, truckVelocity, graph, level);
		transport.currentCity = moscow;
	
		transport.position = 0;

		transports.push(transport);

		return level;
	}

	function SecondLevel() {


		var cities = [];

		var moscow = new City("Москва", 1000, 100, 70, 0.7);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.2);

		var kazan = new City("Казань", 1000, 300, 100, 0.6);
		var rostov = new City("Ростов", 1000, 100, 400, 0.2);

		cities.push(moscow);
		cities.push(spb);
		cities.push(kazan);
		cities.push(rostov);

		var transports = [];

	


		var roads = [];
		roads.push(new Road(moscow, spb));
	    roads.push(new Road(moscow, kazan));
	    roads.push(new Road(spb, rostov));
	    roads.push(new Road(rostov, kazan));

		var map = {};
		map[moscow.name] = addEdge(moscow, [spb, kazan]);
		map[spb.name] = addEdge(spb, [moscow, rostov]);
		map[kazan.name] = addEdge(kazan, [moscow, rostov]);
		map[rostov.name] = addEdge(rostov, [spb, kazan]);


		var graph = new Graph(map, cities);

		var level = new Level(cities, roads, transports, 100, 10, graph);
		
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