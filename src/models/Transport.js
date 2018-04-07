'use strict';

class Transport {

  constructor(type, capacity, velocity){
    this.type = type;
    this.capacity = capacity;
    this.velocity = velocity;
    this.packages = [];
    this.route = null;
    this.direction = false;
    this.position = 0;
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
