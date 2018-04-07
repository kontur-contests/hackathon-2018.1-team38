'use strict';

class Transport {

  constructor(type, capacity, velocity){
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
 		var pack = this.currentCity.packages.pop();
		packCity === pack.to ? this.packages.push() : this.currentCity.packages.push();
 	}
  }

  unload(){
	this.packages = this.packages.filter(pack => pack.to === this.currentCity);
  }
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
}
