function LevelFactory(levelName) {
	
	var truckVelocity = 40;
	
	var levels = {};
	levels["first"] = FirstLevel();
	levels["second"] = SecondLevel();
	levels["third"] = ThirdLevel();
	levels["fourth"] = FourthLevel();

	return levels[levelName];

	function FirstLevel(){
		var moscow = new City("Москва", 1000, 100, 120, 0.7);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.4);
		var cities = [];
		cities.push(moscow);
		cities.push(spb);

		var roads = [];
		roads.push(new Road(moscow, spb));

		var map = {};
		map[moscow.name] = addEdge(moscow, [spb]);
		map[spb.name] = addEdge(spb, [moscow]);
		var graph = new Graph(map, cities);

		var transports = [];

		var level = new Level(cities, roads, transports, 40, 10, graph);
		var transport = new Transport("Car", 5, truckVelocity, graph, level);
		transport.currentCity = spb;
		transport.position = 0;
		transports.push(transport);

		return level;
	}

	function SecondLevel() {
		var moscow = new City("Москва", 1000, 100, 120, 0.7);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.4);
		var kazan = new City("Казань", 1000, 320, 150, 0.5);
		var cities = [];
		cities.push(moscow);
		cities.push(spb);
		cities.push(kazan);

		var roads = [];
		roads.push(new Road(moscow, spb));
		roads.push(new Road(moscow, kazan));
		roads.push(new Road(spb, kazan));

		var map = {};
		map[moscow.name] = addEdge(moscow, [kazan, spb]);
		map[spb.name] = addEdge(spb, [moscow, kazan]);
		map[kazan.name] = addEdge(kazan, [moscow, spb]);
		var graph = new Graph(map, cities);

		var transports = [];
		var level = new Level(cities, roads, transports, 50, 12, graph);
		var transport = new Transport("Car", 7, truckVelocity, graph, level);
		transport.currentCity = moscow;
		transport.position = 0;
		transports.push(transport);
		return level;
	}

	function ThirdLevel(){
		var moscow = new City("Москва", 1000, 100, 120, 0.7);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.4);
		var kazan = new City("Казань", 1000, 320, 150, 0.5);
		var rostov = new City("Ростов", 1000, 80, 400, 0.2);
		var cities = [];
		cities.push(moscow);
		cities.push(spb);
		cities.push(kazan);
		cities.push(rostov);

		var roads = [];
		roads.push(new Road(moscow, spb));
	    roads.push(new Road(moscow, kazan));
	    roads.push(new Road(moscow, rostov));
	    roads.push(new Road(spb, kazan));
	    roads.push(new Road(rostov, kazan));

		var map = {};
		map[moscow.name] = addEdge(moscow, [spb, kazan, rostov]);
		map[spb.name] = addEdge(spb, [moscow, kazan]);
		map[kazan.name] = addEdge(kazan, [moscow, rostov, spb]);
		map[rostov.name] = addEdge(rostov, [moscow, kazan]);
		var graph = new Graph(map, cities);

		var transports = [];

		var level = new Level(cities, roads, transports, 60, 20, graph);
		var transport = new Transport("Car", 10, truckVelocity, graph, level);
		transport.currentCity = spb;
		transport.position = 0;
		transports.push(transport);

		return level;
	}

	function FourthLevel(){
		var moscow = new City("Москва", 1000, 100, 120, 0.6);
		var spb = new City("Санкт-Петербург", 1000, 10, 20, 0.4);
		var kazan = new City("Казань", 1000, 320, 150, 0.4);
		var rostov = new City("Ростов", 1000, 80, 400, 0.2);
		var irkutsk = new City("Иркутск", 1000, 500, 380, 0.2);
		var cities = [];
		cities.push(moscow);
		cities.push(spb);
		cities.push(kazan);
		cities.push(rostov);
		cities.push(irkutsk);

		var roads = [];
		roads.push(new Road(moscow, spb));
	    roads.push(new Road(moscow, kazan));
	    roads.push(new Road(moscow, rostov));
	    roads.push(new Road(spb, kazan));
		roads.push(new Road(kazan, rostov));
		roads.push(new Road(kazan, irkutsk));
		roads.push(new Road(rostov, irkutsk));

		var map = {};
		map[moscow.name] = addEdge(moscow, [spb, kazan, rostov]);
		map[spb.name] = addEdge(spb, [moscow, kazan]);
		map[kazan.name] = addEdge(kazan, [moscow, spb, rostov, irkutsk]);
		map[rostov.name] = addEdge(rostov, [moscow, kazan, irkutsk]);
		map[irkutsk.name] = addEdge(irkutsk, [kazan, rostov]);
		var graph = new Graph(map, cities);

		var transports = [];

		var level = new Level(cities, roads, transports, 100, 30, graph);
		var transport = new Transport("Car", 12, truckVelocity, graph, level);
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