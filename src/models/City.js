'use strict';

class City {

  constructor(name, capacity, x, y, packsPerLoop){
    this.name = name;
    this.capacity = capacity;
    this.x = x;
    this.y = y;
    this.packages = [];
    this.packsPerLoop = packsPerLoop;


    this.handlers = {};
  }

  addPackage(arg) {
  	this.packages.push(arg);

  	if(this.handlers['newPackage'] == undefined) {
  		return;
  	}

  	this.handlers['newPackage']();
  }

  hasPackages(){
    return this.packages.length > 0;
  }

  on(eventType, handler) {
  	this.handlers[eventType] = handler;
  }

}