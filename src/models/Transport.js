'use strict';

class Transport {

  constructor(type, capacity, velocity, graph, level){
  	this.id = 1;
    this.type = type;
    this.capacity = capacity;
    this.velocity = velocity;
    this.packages = [];
    this.route = [];
    this.direction = false;
    this.position = 0;
    this.currentCity = null;

    this.graph = graph;
    this.level = level;

    this.handlers = {};
  }

  load(packCity){
  	if(this.currentCity == null) {
  		return;
  	}


 	if(packCity == null){
 		while(this.currentCity.packages.length > 0 && this.packages.length < this.capacity){
			this.packages.push(this.currentCity.packages.pop());
  		}
 	} else {
 		 
 		 var cityPackages = [];

 		 while(this.currentCity.packages.length > 0 && this.packages.length <  this.capacity)
 		 {
		 	let pack = this.currentCity.packages.pop();

		 	packCity === pack.to ? this.packages.push(pack) : cityPackage.push(pack);
 		 }

 		 while(cityPackages.length > 0) {
 		 	this.currentCity.packages.push(cityPackages.pop());
 		 }
 		 
 	}
  }

  unload(){
	if(this.currentCity == null) {
  		return;
  	}

  	let unloadPackages = this.packages.filter(pack => pack.to === this.currentCity);
	this.level.currentGoal += unloadPackages.length;

	this.packages = this.packages.filter(pack => pack.to !== this.currentCity);
  }

  finishDelivery(){
  	var route = this.route.pop();
  	this.currentCity = route.to;
  	this.route = [];
  	this.position = 0;

  	if(this.handlers["reachedDestination"] !== undefined) {
  		this.handlers["reachedDestination"](this);
  	}
  }

  idle(city){
  	if(this.handlers["idle"] !== undefined) {
  		this.handlers["idle"](this);
  	}
  }

  on(eventType, handler) {
  	this.handlers[eventType] = handler;
  }

  goTo(city) {
  		if(this.currentCity == city || this.currentCity == null) {
  			return;
  		}



		this.route = this.getRouteToCity(city);
		this.currentCity = null;
  }

  getRouteToCity(city) {
  	var roads =  this.graph.findShortestPath(this.currentCity.name, city.name);


  	return roads;
  }

  isMoving(){
    return this.currentCity == null;
  }
}
