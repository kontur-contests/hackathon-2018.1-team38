'use strict';

class Transport {

  constructor(type, capacity, velocity){
  	this.id = 1;
    this.type = type;
    this.capacity = capacity;
    this.velocity = velocity;
    this.packages = [];
    this.route = null;
    this.direction = false;
    this.position = 0;
    this.currentCity = null;
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
