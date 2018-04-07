'use strict';

class Transport {

  constructor(type, capacity, velocity){
  	this.id = 1;
    this.type = type;
    this.capacity = capacity;
    this.velocity = velocity;
    this.packages = [];
    this.route = [];
    this.direction = false;
    this.position = 0;
    this.currentCity = null;
  }

  load(packCity){
 	if(packCity == null){
 		while(this.currentCity.packages.length > 0 || this.packages.length < capacity){
			this.packages.push(this.currentCity.packages.pop());
  		}
 	} else {
 	//	while(this.currentCity.packages.length > 0 || this.packages.length < capacity){
 			var pack = this.currentCity.packages.pop();
			packCity === pack.to ? this.packages.push(pack) : this.currentCity.packages.push(pack);
	//	}
 	}
  }

  unload(){
    this.packages = this.packages.filter(pack => pack.to === this.currentCity);
  }

  finishDelivery(){
  	if(this.handlers["reachedDestination"] !== undefined) {
  		this.handlers["reachedDestination"]();
  	}
  }

  idle(city){
  	if(this.handlers["idle"] !== undefined) {
  		this.handlers["idle"](city);
  	}
  }

  on(eventType, handler) {
  	this.handlers[eventType] = handler;
  }

  goTo(city) {
		this.route = getRouteToCity(city);
		this.currentCity = null;
  }

  getRouteToCity(city) {
		//TODO: тут будет поиcк по графу пока просто заглушка
		return [self.currentLevel.roads[0], self.currentLevel.roads[1]];
  }
}
